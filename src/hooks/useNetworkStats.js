// src/hooks/useNetworkStats.js
import { useState, useEffect } from 'react';

export const useNetworkStats = () => {
  const [stats, setStats] = useState({
    bandwidthUsage: 0,
    activeConnections: 0,
    dataTransferred: 0,
    networkLoad: 0
  });

  useEffect(() => {
    const updateStats = () => {
      // Simulate real-time updates
      setStats(prev => ({
        bandwidthUsage: Math.random() * 100,
        activeConnections: Math.floor(Math.random() * 10),
        dataTransferred: Math.floor(Math.random() * 1000),
        networkLoad: Math.random() * 100
      }));
    };

    const interval = setInterval(updateStats, 5000);
    return () => clearInterval(interval);
  }, []);

  return stats;
};

// src/hooks/useConnections.js
import { useState, useEffect } from 'react';

export const useConnections = () => {
  const [connections, setConnections] = useState([]);

  useEffect(() => {
    const fetchConnections = () => {
      // Simulate fetching connections
      const mockConnections = [
        { 
          id: 1, 
          name: "John's Laptop", 
          device: "Laptop", 
          timeLeft: Math.floor(Math.random() * 60), 
          dataUsage: Math.floor(Math.random() * 500) + "MB",
          bandwidth: Math.floor(Math.random() * 10) + "Mbps",
          ip: "192.168.1.101"
        },
        // Add more mock connections
      ];
      setConnections(mockConnections);
    };

    const interval = setInterval(fetchConnections, 3000);
    return () => clearInterval(interval);
  }, []);

  return { connections, setConnections };
};