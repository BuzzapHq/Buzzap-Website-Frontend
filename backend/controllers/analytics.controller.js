const Lead = require('../models/Lead');
const Project = require('../models/Project');
const asyncHandler = require('../utils/asyncHandler');

// Build a { key: count } map from an aggregation over a status/source-like field.
function toCountMap(rows) {
  return rows.reduce((acc, r) => {
    acc[r._id || 'unknown'] = r.count;
    return acc;
  }, {});
}

// GET /api/analytics/overview  (admin/staff)
// Returns headline KPIs plus breakdowns for leads and projects.
const overview = asyncHandler(async (req, res) => {
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);

  const [
    totalLeads,
    newLeadsToday,
    leadsByStatus,
    leadsBySource,
    wonLeads,
    totalProjects,
    projectsByStatus,
    activeProjects,
    completedProjects,
  ] = await Promise.all([
    Lead.countDocuments(),
    Lead.countDocuments({ createdAt: { $gte: startOfToday } }),
    Lead.aggregate([{ $group: { _id: '$status', count: { $sum: 1 } } }]),
    Lead.aggregate([{ $group: { _id: '$source', count: { $sum: 1 } } }]),
    Lead.countDocuments({ status: 'won' }),
    Project.countDocuments(),
    Project.aggregate([{ $group: { _id: '$status', count: { $sum: 1 } } }]),
    Project.countDocuments({ status: { $in: ['planning', 'in-progress', 'review'] } }),
    Project.countDocuments({ status: 'completed' }),
  ]);

  const conversionRate = totalLeads > 0 ? Number(((wonLeads / totalLeads) * 100).toFixed(1)) : 0;

  res.status(200).json({
    status: 'success',
    kpis: {
      totalLeads,
      newLeadsToday,
      wonLeads,
      conversionRate, // percentage of leads marked "won"
      totalProjects,
      activeProjects,
      completedProjects,
    },
    leads: {
      byStatus: toCountMap(leadsByStatus),
      bySource: toCountMap(leadsBySource),
    },
    projects: {
      byStatus: toCountMap(projectsByStatus),
    },
  });
});

// GET /api/analytics/leads-timeseries?days=30  (admin/staff)
// Daily lead counts for the last N days (default 30), for charting.
const leadsTimeseries = asyncHandler(async (req, res) => {
  const days = Math.min(Math.max(parseInt(req.query.days, 10) || 30, 1), 365);
  const since = new Date();
  since.setHours(0, 0, 0, 0);
  since.setDate(since.getDate() - (days - 1));

  const rows = await Lead.aggregate([
    { $match: { createdAt: { $gte: since } } },
    {
      $group: {
        _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
        count: { $sum: 1 },
      },
    },
    { $sort: { _id: 1 } },
  ]);

  const counts = toCountMap(rows);

  // Fill gaps so every day in the range has a value (0 when no leads).
  const series = [];
  for (let i = 0; i < days; i += 1) {
    const d = new Date(since);
    d.setDate(since.getDate() + i);
    const key = d.toISOString().slice(0, 10);
    series.push({ date: key, count: counts[key] || 0 });
  }

  res.status(200).json({ status: 'success', days, series });
});

module.exports = { overview, leadsTimeseries };
