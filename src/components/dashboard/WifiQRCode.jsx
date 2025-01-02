// src/components/dashboard/WifiQRCode.jsx
import React, { useState } from 'react';
import QRCode from 'qrcode.react';
import { Settings, Copy, Check } from 'lucide-react';

const WifiQRCode = () => {
  const [wifiSettings, setWifiSettings] = useState({
    ssid: 'CoffeeShopWiFi',
    password: '',
    encryption: 'WPA',
    isHidden: false
  });
  const [copied, setCopied] = useState(false);

  // Generate WiFi configuration string
  const generateWifiString = () => {
    const { ssid, password, encryption, isHidden } = wifiSettings;
    return `WIFI:S:${ssid};T:${encryption};P:${password};H:${isHidden};`;
  };

  // Handle copy password
  const handleCopyPassword = () => {
    navigator.clipboard.writeText(wifiSettings.password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">WiFi Connection</h2>
        <button
          onClick={() => {/* Add settings handler */}}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <Settings className="h-5 w-5 text-gray-500" />
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* QR Code */}
        <div className="flex flex-col items-center space-y-4">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <QRCode 
              value={generateWifiString()}
              size={200}
              level="H"
            />
          </div>
          <p className="text-sm text-gray-600">Scan to connect automatically</p>
        </div>

        {/* WiFi Details */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Network Name</label>
            <input
              type="text"
              value={wifiSettings.ssid}
              onChange={(e) => setWifiSettings(prev => ({ ...prev, ssid: e.target.value }))}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <div className="mt-1 flex">
              <input
                type="text"
                value={wifiSettings.password}
                onChange={(e) => setWifiSettings(prev => ({ ...prev, password: e.target.value }))}
                className="block w-full px-3 py-2 border border-gray-300 rounded-l-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                onClick={handleCopyPassword}
                className="px-3 py-2 border border-l-0 border-gray-300 rounded-r-md bg-gray-50 hover:bg-gray-100"
              >
                {copied ? (
                  <Check className="h-5 w-5 text-green-500" />
                ) : (
                  <Copy className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Security</label>
            <select
              value={wifiSettings.encryption}
              onChange={(e) => setWifiSettings(prev => ({ ...prev, encryption: e.target.value }))}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="WPA">WPA/WPA2</option>
              <option value="WEP">WEP</option>
              <option value="nopass">No Password</option>
            </select>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="hidden-network"
              checked={wifiSettings.isHidden}
              onChange={(e) => setWifiSettings(prev => ({ ...prev, isHidden: e.target.checked }))}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="hidden-network" className="ml-2 block text-sm text-gray-700">
              Hidden Network
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WifiQRCode;