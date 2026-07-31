process.env.NODE_ENV = 'test';

const test = require('node:test');
const assert = require('node:assert');
const request = require('supertest');

const createApp = require('../app');

const app = createApp();

// Analytics endpoints require an authenticated admin/staff.
test('GET /api/analytics/overview returns 401 without auth', async () => {
  const res = await request(app).get('/api/analytics/overview');
  assert.strictEqual(res.status, 401);
  assert.strictEqual(res.body.status, 'error');
});

test('GET /api/analytics/leads-timeseries returns 401 without auth', async () => {
  const res = await request(app).get('/api/analytics/leads-timeseries');
  assert.strictEqual(res.status, 401);
});

test('GET /api/analytics/overview with invalid token returns 401', async () => {
  const res = await request(app)
    .get('/api/analytics/overview')
    .set('Cookie', 'buzzap_token=not-a-real-jwt');
  assert.strictEqual(res.status, 401);
});
