// src/utils/time.js
export const formatTimeRemaining = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}:${mins.toString().padStart(2, '0')}`;
  };
  
  export const calculateTimeRemaining = (startTime, limitMinutes) => {
    const elapsedMinutes = Math.floor((Date.now() - new Date(startTime)) / 60000);
    return Math.max(0, limitMinutes - elapsedMinutes);
  };
  
  export const formatDateTime = (date) => {
    return new Date(date).toLocaleString();
  };
  
  // src/utils/network.js
  export const validateMacAddress = (mac) => {
    const macRegex = /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/;
    return macRegex.test(mac);
  };
  
  export const formatBytes = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };