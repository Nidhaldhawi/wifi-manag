// src/hooks/useRouterData.js
import { useState, useEffect, useCallback } from 'react';
import routerService from '../services/api/routerService';

export const useRouterData = () => {
  const [devices, setDevices] = useState([]);
  const [bandwidth, setBandwidth] = useState({ download: 0, upload: 0 });
  const [routerStatus, setRouterStatus] = useState('offline');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all router data
  const fetchRouterData = useCallback(async () => {
    try {
      const [devicesData, bandwidthData, statusData] = await Promise.all([
        routerService.getConnectedDevices(),
        routerService.getBandwidthUsage(),
        routerService.getRouterStatus()
      ]);

      setDevices(devicesData);
      setBandwidth(bandwidthData);
      setRouterStatus(statusData.status);
      setError(null);
    } catch (err) {
      setError('Failed to fetch router data');
      console.error('Router data fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Disconnect a device
  const disconnectDevice = async (macAddress) => {
    try {
      await routerService.disconnectDevice(macAddress);
      // Refresh device list after disconnection
      const updatedDevices = await routerService.getConnectedDevices();
      setDevices(updatedDevices);
      return true;
    } catch (err) {
      setError('Failed to disconnect device');
      return false;
    }
  };

  // Set bandwidth limit for a device
  const setBandwidthLimit = async (macAddress, downloadLimit, uploadLimit) => {
    try {
      await routerService.setBandwidthLimit(macAddress, downloadLimit, uploadLimit);
      // Refresh device list after setting limit
      const updatedDevices = await routerService.getConnectedDevices();
      setDevices(updatedDevices);
      return true;
    } catch (err) {
      setError('Failed to set bandwidth limit');
      return false;
    }
  };

  // Initial data fetch and polling setup
  useEffect(() => {
    fetchRouterData();

    // Set up polling every 5 seconds
    const interval = setInterval(fetchRouterData, 5000);

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, [fetchRouterData]);

  return {
    devices,
    bandwidth,
    routerStatus,
    loading,
    error,
    disconnectDevice,
    setBandwidthLimit,
    refreshData: fetchRouterData
  };
};