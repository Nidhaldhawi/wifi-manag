// src/pages/Dashboard.jsx
import React from 'react';
import { useSettings } from '../context/SettingsContext';

const Dashboard = () => {
  const { settings } = useSettings();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-white rounded-lg shadow">
          <h3 className="font-semibold">Max Connection Time</h3>
          <p>{settings.maxConnectionTime} minutes</p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow">
          <h3 className="font-semibold">Max Devices Per User</h3>
          <p>{settings.maxDevicesPerUser}</p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow">
          <h3 className="font-semibold">Network Status</h3>
          <p>{settings.networkStatus}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

// src/pages/Login.jsx
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ email });
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <h2 className="text-center text-3xl font-bold">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

// src/pages/Settings.jsx
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

// src/pages/Users.jsx
import React from 'react';

const Users = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Users</h1>
      <div className="bg-white rounded-lg shadow">
        <div className="p-4">
          <p>User management coming soon...</p>
        </div>
      </div>
    </div>
  );
};

export default Users;