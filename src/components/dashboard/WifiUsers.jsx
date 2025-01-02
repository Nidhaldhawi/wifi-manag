// src/components/dashboard/WifiUsers.jsx
import React from 'react';
import { Clock, Wifi, AlertTriangle } from 'lucide-react';
import { useWifiStatus } from '../../hooks/useWifiStatus';
import { useTimeRemaining } from '../../hooks/useTimeRemaining';
import { formatTimeRemaining, formatDateTime } from '../../utils/time';
import { formatBytes } from '../../utils/network';
import { wifiService } from '../../services/api/wifiService';

const WifiUsers = () => {
  const { connectedUsers, loading, error, refetch } = useWifiStatus();

  const handleDisconnect = async (macAddress) => {
    try {
      await wifiService.disconnectUser(macAddress);
      refetch();
    } catch (err) {
      console.error('Failed to disconnect user:', err);
    }
  };

  const handleExtendTime = async (macAddress) => {
    try {
      const additionalTime = 30; // 30 minutes
      await wifiService.updateTimeLimit(macAddress, additionalTime);
      refetch();
    } catch (err) {
      console.error('Failed to extend time:', err);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Connected Users</h2>
          <button
            onClick={refetch}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Refresh
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Device</th>
                <th className="text-left py-2">MAC Address</th>
                <th className="text-left py-2">Connect Time</th>
                <th className="text-left py-2">Time Remaining</th>
                <th className="text-left py-2">Data Usage</th>
                <th className="text-left py-2">Status</th>
                <th className="text-left py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {connectedUsers.map((user) => {
                const timeRemaining = useTimeRemaining(user.connectTime, user.timeLimit);

                return (
                  <tr key={user.macAddress} className="border-b">
                    <td className="py-2">{user.deviceName}</td>
                    <td className="py-2 font-mono">{user.macAddress}</td>
                    <td className="py-2">{formatDateTime(user.connectTime)}</td>
                    <td className="py-2">
                      <div className="flex items-center gap-2">
                        {formatTimeRemaining(timeRemaining)}
                        {timeRemaining < 15 && (
                          <AlertTriangle className="h-4 w-4 text-yellow-500" />
                        )}
                      </div>
                    </td>
                    <td className="py-2">{formatBytes(user.dataUsage)}</td>
                    <td className="py-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          user.status === 'active'
                            ? 'bg-green-100 text-green-800'
                            : user.status === 'expired'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td className="py-2">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleDisconnect(user.macAddress)}
                          className="px-3 py-1 text-red-600 hover:text-red-800 border border-red-600 rounded hover:bg-red-50"
                        >
                          Disconnect
                        </button>
                        <button
                          onClick={() => handleExtendTime(user.macAddress)}
                          className="px-3 py-1 text-blue-600 hover:text-blue-800 border border-blue-600 rounded hover:bg-blue-50"
                        >
                          Extend Time
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default WifiUsers;