// server/src/controllers/routerController.js
const { exec } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);

class RouterController {
  // Get connected devices using arp-scan
  async getConnectedDevices(req, res) {
    try {
      // Using arp-scan to get devices (requires sudo privileges)
      const { stdout: arpOutput } = await execPromise('sudo arp-scan --localnet');
      
      // Parse the arp-scan output
      const devices = arpOutput
        .split('\n')
        .filter(line => line.match(/([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})/))
        .map(line => {
          const [ip, mac, vendor] = line.split('\t');
          return {
            ip,
            mac,
            vendor: vendor || 'Unknown',
            name: `Device (${vendor || 'Unknown'})`
          };
        });

      res.json(devices);
    } catch (error) {
      console.error('Error getting connected devices:', error);
      res.status(500).json({ error: 'Failed to get connected devices' });
    }
  }

  // Get bandwidth usage using ifconfig/ip
  async getBandwidthUsage(req, res) {
    try {
      // Get network interface statistics
      const { stdout: ifOutput } = await execPromise('ifconfig wlan0');
      // Or for newer systems: await execPromise('ip -s link show wlan0');
      
      // Parse the output to get RX/TX bytes
      const rxBytes = parseInt(ifOutput.match(/RX bytes:(\d+)/)?.[1] || 0);
      const txBytes = parseInt(ifOutput.match(/TX bytes:(\d+)/)?.[1] || 0);

      res.json({
        download: (rxBytes / 1024 / 1024).toFixed(2), // Convert to MB
        upload: (txBytes / 1024 / 1024).toFixed(2)    // Convert to MB
      });
    } catch (error) {
      console.error('Error getting bandwidth usage:', error);
      res.status(500).json({ error: 'Failed to get bandwidth usage' });
    }
  }

  // Get network status using iwconfig/iw
  async getRouterStatus(req, res) {
    try {
      const { stdout: iwOutput } = await execPromise('iwconfig wlan0');
      // Or for newer systems: await execPromise('iw dev wlan0 info');
      
      const essid = iwOutput.match(/ESSID:"([^"]+)"/)?.[1];
      const quality = iwOutput.match(/Link Quality=(\d+\/\d+)/)?.[1];
      const frequency = iwOutput.match(/Frequency:(\d+\.\d+) GHz/)?.[1];

      res.json({
        status: essid ? 'online' : 'offline',
        essid: essid || 'Not connected',
        signalQuality: quality || 'N/A',
        frequency: frequency ? `${frequency} GHz` : 'N/A'
      });
    } catch (error) {
      console.error('Error getting router status:', error);
      res.status(500).json({ error: 'Failed to get router status' });
    }
  }

  // Block/unblock device using iptables
  async blockDevice(req, res) {
    const { macAddress, action } = req.body;
    try {
      if (action === 'block') {
        await execPromise(`sudo iptables -A INPUT -m mac --mac-source ${macAddress} -j DROP`);
        await execPromise(`sudo iptables -A FORWARD -m mac --mac-source ${macAddress} -j DROP`);
      } else {
        await execPromise(`sudo iptables -D INPUT -m mac --mac-source ${macAddress} -j DROP`);
        await execPromise(`sudo iptables -D FORWARD -m mac --mac-source ${macAddress} -j DROP`);
      }
      
      res.json({ message: `Device ${action}ed successfully` });
    } catch (error) {
      console.error(`Error ${action}ing device:`, error);
      res.status(500).json({ error: `Failed to ${action} device` });
    }
  }

  // Get network statistics
  async getNetworkStats(req, res) {
    try {
      const { stdout: netstat } = await execPromise('netstat -i');
      const stats = netstat
        .split('\n')
        .filter(line => line.includes('wlan0'))
        .map(line => {
          const parts = line.split(/\s+/);
          return {
            interface: parts[0],
            rxPackets: parseInt(parts[3]),
            txPackets: parseInt(parts[7]),
            errors: parseInt(parts[4]) + parseInt(parts[8])
          };
        })[0];

      res.json(stats);
    } catch (error) {
      console.error('Error getting network statistics:', error);
      res.status(500).json({ error: 'Failed to get network statistics' });
    }
  }
}

module.exports = new RouterController();