// src/components/dashboard/DeviceMonitor.jsx
import React from 'react';
import { Laptop, Smartphone, Wifi, Clock, Ban } from 'lucide-react';

const DeviceMonitor = () => {
  // Simulated device data
  const devices = [
    { 
      id: 1,
      name: "John's MacBook",
      type: "laptop",
      ip: "192.168.1.101",
      status: "active",
      connected: "2h 15m",
      usage: "1.2 GB"
    },
    { 
      id: 2,
      name: "Sarah's iPhone",
      type: "mobile",
      ip: "192.168.1.102",
      status: "active",
      connected: "45m",
      usage: "450 MB"
    }
  ];

  const getDeviceIcon = (type) => {
    switch (type) {
      case 'laptop':
        return <Laptop className="h-5 w-5" />;
      case 'mobile':
        return <Smartphone className="h-5 w-5" />;
      default:
        return <Wifi className="h-5 w-5" />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">Connected Devices</h2>
      </div>

      <div className="p-4">
        <div className="grid gap-4">
          {devices.map(device => (
            <div 
              key={device.id}
              className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex justify-between items-start">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                    {getDeviceIcon(device.type)}
                  </div>
                  <div>
                    <h3 className="font-medium">{device.name}</h3>
                    <p className="text-sm text-gray-500">{device.ip}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    className="p-1 hover:bg-gray-100 rounded"
                    title="Disconnect"
                  >
                    <Ban className="h-4 w-4 text-red-500" />
                  </button>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-600">
                    Connected: {device.connected}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Wifi className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-600">
                    Usage: {device.usage}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DeviceMonitor;