import React from 'react';
import { useSettings } from '../context/SettingsContext';

const Settings = () => {
  const { settings, updateSettings } = useSettings();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Settings</h1>
      <div className="max-w-md space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Max Connection Time (minutes)
          </label>
          <input
            type="number"
            value={settings.maxConnectionTime}
            onChange={(e) => updateSettings({ maxConnectionTime: parseInt(e.target.value) })}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Max Devices Per User
          </label>
          <input
            type="number"
            value={settings.maxDevicesPerUser}
            onChange={(e) => updateSettings({ maxDevicesPerUser: parseInt(e.target.value) })}
            className="w-full p-2 border rounded"
          />
        </div>
      </div>
    </div>
  );
};

export default Settings;