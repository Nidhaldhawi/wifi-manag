/ server/src/controllers/wifiController.js
import { Session } from '../models/Session';
import { RouterService } from '../services/routerService';

const routerService = new RouterService();

export const wifiController = {
  // Get all connected users
  async getConnectedUsers(req, res) {
    try {
      const sessions = await Session.find({ status: 'active' });
      res.json(sessions);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch connected users' });
    }
  },

  // Disconnect a user
  async disconnectUser(req, res) {
    try {
      const { macAddress } = req.body;
      await routerService.disconnectDevice(macAddress);
      await Session.findOneAndUpdate(
        { macAddress },
        { status: 'disconnected' }
      );
      res.json({ message: 'User disconnected successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to disconnect user' });
    }
  },

  // Update user time limit
  async updateTimeLimit(req, res) {
    try {
      const { macAddress, timeLimit } = req.body;
      const session = await Session.findOneAndUpdate(
        { macAddress },
        { timeLimit },
        { new: true }
      );
      res.json(session);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update time limit' });
    }
  }
};

// server/src/controllers/authController.js
import { User } from '../models/User';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export const authController = {
  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const token = jwt.sign(
        { userId: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
      );

      res.json({ token, user: { email: user.email, role: user.role } });
    } catch (error) {
      res.status(500).json({ error: 'Login failed' });
    }
  },

  async register(req, res) {
    try {
      const { email, password, role } = req.body;
      const user = new User({ email, password, role });
      await user.save();
      res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Registration failed' });
    }
  }
};