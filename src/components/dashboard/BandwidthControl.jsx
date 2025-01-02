// src/components/dashboard/BandwidthControl.jsx
import React, { useState } from 'react';
import { Gauge, Wifi, AlertTriangle } from 'lucide-react';

const BandwidthControl = () => {
  const [bandwidthLimits, setBandwidthLimits] = useState({
    downloadSpeed: 10, // Mbps
    uploadSpeed: 5,    // Mbps
    perUserLimit: 2,   // Mbps
    enabled: true
  });

  const [currentUsage, setCurrentUsage] = useState({
    totalDownload: 8.5,
    totalUpload: 3.2,
    numberOfUsers: 5
  });

  const calculateUsagePercentage = (current, limit) => {
    return (current / limit) * 100;
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-6">Bandwidth Control</h2>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Current Usage */}
        <div className="space-y-6">
          <h3 className="text-lg font-medium">Current Usage</h3>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>Download ({currentUsage.totalDownload} Mbps)</span>
                <span>{bandwidthLimits.downloadSpeed} Mbps</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-500 rounded-full"
                  style={{ 
                    width: `${calculateUsagePercentage(currentUsage.totalDownload, bandwidthLimits.downloadSpeed)}%` 
                  }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>Upload ({currentUsage.totalUpload} Mbps)</span>
                <span>{bandwidthLimits.uploadSpeed} Mbps</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-green-500 rounded-full"
                  style={{ 
                    width: `${calculateUsagePercentage(currentUsage.totalUpload, bandwidthLimits.uploadSpeed)}%` 
                  }}
                />
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2">
                <Wifi className="h-5 w-5 text-gray-500" />
                <span className="text-sm text-gray-600">Connected Users</span>
              </div>
              <span className="font-medium">{currentUsage.numberOfUsers}</span>
            </div>
          </div>
        </div>

        {/* Bandwidth Settings */}
        <div className="space-y-6">
          <h3 className="text-lg font-medium">Settings</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Download Limit (Mbps)</label>
              <input
                type="number"
                value={bandwidthLimits.downloadSpeed}
                onChange={(e) => setBandwidthLimits(prev => ({ ...prev, downloadSpeed: Number(e.target.value) }))}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Upload Limit (Mbps)</label>
              <input
                type="number"
                value={bandwidthLimits.uploadSpeed}
                onChange={(e) => setBandwidthLimits(prev => ({ ...prev, uploadSpeed: Number(e.target.value) }))}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Per User Limit (Mbps)</label>
              <input
                type="number"
                value={bandwidthLimits.perUserLimit}
                onChange={(e) => setBandwidthLimits(prev => ({ ...prev, perUserLimit: Number(e.target.value) }))}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="bandwidth-control"
                  type="checkbox"
                  checked={bandwidthLimits.enabled}
                  onChange={(e) => setBandwidthLimits(prev => ({ ...prev, enabled: e.target.checked }))}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="bandwidth-control" className="ml-2 block text-sm text-gray-700">
                  Enable Bandwidth Control
                </label>
              </div>

              <button
                onClick={() => {/* Add save handler */}}
                className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Save Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BandwidthControl;