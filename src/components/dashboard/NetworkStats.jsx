// src/components/dashboard/NetworkStats.jsx
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Activity, Wifi, Database, Gauge } from 'lucide-react';

const NetworkStats = ({ stats }) => {
  // Mock data for the chart
  const chartData = Array.from({ length: 24 }, (_, i) => ({
    time: `${i}:00`,
    usage: Math.floor(Math.random() * 100)
  }));

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold mb-6">Network Statistics</h2>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Activity className="h-5 w-5 text-blue-500" />
            <span className="text-sm text-gray-600">Bandwidth</span>
          </div>
          <div className="text-xl font-bold">{stats.bandwidthUsage.toFixed(1)} Mbps</div>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Wifi className="h-5 w-5 text-green-500" />
            <span className="text-sm text-gray-600">Active Users</span>
          </div>
          <div className="text-xl font-bold">{stats.activeConnections}</div>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Database className="h-5 w-5 text-purple-500" />
            <span className="text-sm text-gray-600">Data Transfer</span>
          </div>
          <div className="text-xl font-bold">{stats.dataTransferred} MB</div>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Gauge className="h-5 w-5 text-orange-500" />
            <span className="text-sm text-gray-600">Network Load</span>
          </div>
          <div className="text-xl font-bold">{stats.networkLoad.toFixed(1)}%</div>
        </div>
      </div>

      {/* Usage Chart */}
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Line 
              type="monotone" 
              dataKey="usage" 
              stroke="#3B82F6" 
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default NetworkStats;