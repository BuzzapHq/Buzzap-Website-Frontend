const jwt = require('jsonwebtoken');
const config = require('../config/env');

const COOKIE_NAME = 'buzzap_token';
const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: config.NODE_ENV === 'production',
  sameSite: 'strict',
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in ms
};

function signToken(payload) {
  return jwt.sign(payload, config.JWT_SECRET, {
    expiresIn: config.JWT_EXPIRES_IN || '7d',
  });
}

function verifyToken(token) {
  return jwt.verify(token, config.JWT_SECRET);
}

function setAuthCookie(res, token) {
  res.cookie(COOKIE_NAME, token, COOKIE_OPTIONS);
}

function clearAuthCookie(res) {
  res.clearCookie(COOKIE_NAME, { ...COOKIE_OPTIONS, maxAge: 0 });
}

function getTokenFromRequest(req) {
  return req.cookies?.[COOKIE_NAME] || null;
}

module.exports = { signToken, verifyToken, setAuthCookie, clearAuthCookie, getTokenFromRequest };
