// src/components/dashboard/ConnectionManagement.jsx
import React, { useState } from 'react';
import { 
  Laptop, 
  Clock, 
  AlertTriangle, 
  XCircle, 
  Plus, 
  ChevronDown,
  MoreVertical 
} from 'lucide-react';

const ConnectionManagement = ({ connections, onDisconnect, onExtendTime, onBlockDevice }) => {
  const [selectedConnections, setSelectedConnections] = useState(new Set());

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedConnections(new Set(connections.map(c => c.id)));
    } else {
      setSelectedConnections(new Set());
    }
  };

  const handleSelect = (id) => {
    const newSelected = new Set(selectedConnections);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedConnections(newSelected);
  };

  const getStatusColor = (timeLeft) => {
    if (timeLeft <= 5) return 'bg-red-100 text-red-800';
    if (timeLeft <= 15) return 'bg-yellow-100 text-yellow-800';
    return 'bg-green-100 text-green-800';
  };

  return (
    <div className="bg-white rounded-lg shadow">
      {/* Header */}
      <div className="p-4 border-b flex justify-between items-center">
        <h2 className="text-lg font-semibold">Active Connections</h2>
        <div className="flex items-center gap-2">
          <button 
            className="px-3 py-1.5 text-sm bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100"
            onClick={() => {/* Add refresh handler */}}
          >
            Refresh
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                <input 
                  type="checkbox" 
                  onChange={handleSelectAll}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Device
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                IP Address
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Time Left
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Bandwidth
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {connections.map((connection) => (
              <tr key={connection.id}>
                <td className="px-6 py-4">
                  <input 
                    type="checkbox"
                    checked={selectedConnections.has(connection.id)}
                    onChange={() => handleSelect(connection.id)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <Laptop className="h-4 w-4 text-gray-500" />
                    <span>{connection.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {connection.ip}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(connection.timeLeft)}`}>
                      {connection.timeLeft} min
                    </span>
                    {connection.timeLeft <= 15 && (
                      <AlertTriangle className="h-4 w-4 text-yellow-500" />
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {connection.bandwidth}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onExtendTime(connection.id)}
                      className="p-1 text-blue-600 hover:text-blue-800"
                      title="Extend Time"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => onDisconnect(connection.id)}
                      className="p-1 text-red-600 hover:text-red-800"
                      title="Disconnect"
                    >
                      <XCircle className="h-4 w-4" />
                    </button>
                    <div className="relative">
                      <button className="p-1 text-gray-400 hover:text-gray-600">
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ConnectionManagement;