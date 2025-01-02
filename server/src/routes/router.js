// server/src/routes/router.js
const express = require('express');
const router = express.Router();
const routerController = require('../controllers/routerController');
const authMiddleware = require('../middleware/auth');

// Protected routes
router.use(authMiddleware);

// Get connected devices
router.get('/devices', routerController.getConnectedDevices.bind(routerController));

// Get bandwidth usage
router.get('/bandwidth', routerController.getBandwidthUsage.bind(routerController));

// Get router status
router.get('/status', routerController.getRouterStatus.bind(routerController));

// Block/unblock device
router.post('/block', routerController.blockDevice.bind(routerController));

// Get network statistics
router.get('/stats', routerController.getNetworkStats.bind(routerController));

module.exports = router;