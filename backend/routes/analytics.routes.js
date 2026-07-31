const express = require('express');

const { protect, requireRole } = require('../middleware/auth');
const ctrl = require('../controllers/analytics.controller');

const router = express.Router();

// Analytics is admin/staff only.
router.use(protect);
router.use(requireRole('staff', 'admin'));

router.get('/overview', ctrl.overview);
router.get('/leads-timeseries', ctrl.leadsTimeseries);

module.exports = router;
