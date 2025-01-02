// src/components/dashboard/BandwidthMonitor.jsx
import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { Activity, ArrowDown, ArrowUp } from 'lucide-react';

const BandwidthMonitor = () => {
  // Simulated bandwidth data
  const bandwidthData = [
    { time: '00:00', download: 5.2, upload: 2.1 },
    { time: '00:05', download: 6.8, upload: 2.4 },
    { time: '00:10', download: 4.5, upload: 1.8 },
    { time: '00:15', download: 7.2, upload: 2.9 },
    { time: '00:20', download: 5.9, upload: 2.2 }
  ];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold">Bandwidth Usage</h2>
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <ArrowDown className="h-4 w-4 text-blue-500" />
            <span className="text-sm text-gray-600">Download</span>
          </div>
          <div className="flex items-center gap-2">
            <ArrowUp className="h-4 w-4 text-green-500" />
            <span className="text-sm text-gray-600">Upload</span>
          </div>
        </div>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={bandwidthData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Line 
              type="monotone" 
              dataKey="download" 
              stroke="#3B82F6" 
              strokeWidth={2} 
            />
            <Line 
              type="monotone" 
              dataKey="upload" 
              stroke="#10B981" 
              strokeWidth={2} 
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="p-4 bg-blue-50 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <ArrowDown className="h-5 w-5 text-blue-500" />
            <span className="text-sm font-medium text-blue-900">Download Speed</span>
          </div>
          <p className="text-2xl font-bold text-blue-700">5.8 Mbps</p>
        </div>

        <div className="p-4 bg-green-50 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <ArrowUp className="h-5 w-5 text-green-500" />
            <span className="text-sm font-medium text-green-900">Upload Speed</span>
          </div>
          <p className="text-2xl font-bold text-green-700">2.3 Mbps</p>
        </div>
      </div>
    </div>
  );
};

export default BandwidthMonitor;