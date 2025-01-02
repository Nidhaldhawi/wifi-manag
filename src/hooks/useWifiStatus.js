// src/hooks/useWifiStatus.js
import { useState, useEffect } from 'react';
import { wifiService } from '../services/api/wifiService';

export const useWifiStatus = () => {
  const [connectedUsers, setConnectedUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const users = await wifiService.getConnectedUsers();
      setConnectedUsers(users);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
    // Refresh data every minute
    const interval = setInterval(fetchUsers, 60000);
    return () => clearInterval(interval);
  }, []);

  return { connectedUsers, loading, error, refetch: fetchUsers };
};

// src/hooks/useTimeRemaining.js
import { useState, useEffect } from 'react';
import { calculateTimeRemaining } from '../utils/time';

export const useTimeRemaining = (startTime, limitMinutes) => {
  const [timeRemaining, setTimeRemaining] = useState(
    calculateTimeRemaining(startTime, limitMinutes)
  );

  useEffect(() => {
    const timer = setInterval(() => {
      const remaining = calculateTimeRemaining(startTime, limitMinutes);
      setTimeRemaining(remaining);

      // Clear interval when time is up
      if (remaining <= 0) {
        clearInterval(timer);
      }
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, [startTime, limitMinutes]);

  return timeRemaining;
};