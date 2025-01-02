// src/pages/Dashboard.jsx
import React, { useState } from 'react';
import { useRouterData } from '../hooks/useRouterData';
import { Clock, Users, Wifi, Activity, RefreshCw, AlertCircle, Settings } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
  const {
    devices,
    bandwidth,
    routerStatus,
    loading,
    error,
    disconnectDevice,
    setBandwidthLimit,
    refreshData
  } = useRouterData();

  const [selectedDevice, setSelectedDevice] = useState(null);

  // Handle device disconnect
  const handleDisconnect = async (macAddress) => {
    if (window.confirm('Are you sure you want to disconnect this device?')) {
      const success = await disconnectDevice(macAddress);
      if (success) {
        alert('Device disconnected successfully');
      }
    }
  };

  // Handle bandwidth limit setting
  const handleSetBandwidthLimit = async (macAddress) => {
    const downloadLimit = prompt('Enter download limit (in Mbps):', '10');
    const uploadLimit = prompt('Enter upload limit (in Mbps):', '5');
    
    if (downloadLimit && uploadLimit) {
      const success = await setBandwidthLimit(
        macAddress,
        parseInt(downloadLimit),
        parseInt(uploadLimit)
      );
      if (success) {
        alert('Bandwidth limit set successfully');
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <RefreshCw className="h-8 w-8 text-blue-500 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen text-red-500">
        <AlertCircle className="h-8 w-8 mr-2" />
        <span>{error}</span>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header with Status */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Network Dashboard</h1>
        <div className="flex items-center gap-4">
          <button
            onClick={refreshData}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <RefreshCw className="h-5 w-5 text-gray-600" />
          </button>
          <span className={`px-3 py-1 rounded-full text-sm flex items-center gap-2 ${
            routerStatus === 'online' 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            <Wifi className="h-4 w-4" />
            {routerStatus === 'online' ? 'Connected' : 'Offline'}
          </span>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded">
              <Clock className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Download</p>
              <p className="text-xl font-bold">{bandwidth.download} Mbps</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded">
              <Activity className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Upload</p>
              <p className="text-xl font-bold">{bandwidth.upload} Mbps</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Connected</p>
              <p className="text-xl font-bold">{devices.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-100 rounded">
              <Settings className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Network Load</p>
              <p className="text-xl font-bold">
                {Math.round((bandwidth.download + bandwidth.upload) / 2)}%
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Connected Devices */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold">Connected Devices</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Device Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">MAC Address</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">IP Address</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Bandwidth Usage</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {devices.map(device => (
                <tr key={device.mac} className="hover:bg-gray-50">
                  <td className="px-6 py-4">{device.name || 'Unknown Device'}</td>
                  <td className="px-6 py-4 font-mono text-sm">{device.mac}</td>
                  <td className="px-6 py-4">{device.ip}</td>
                  <td className="px-6 py-4">
                    {device.bandwidth?.download || '0'} / {device.bandwidth?.upload || '0'} Mbps
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleSetBandwidthLimit(device.mac)}
                        className="text-blue-600 hover:text-blue-800 text-sm"
                      >
                        Set Limit
                      </button>
                      <button
                        onClick={() => handleDisconnect(device.mac)}
                        className="text-red-600 hover:text-red-800 text-sm"
                      >
                        Disconnect
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;