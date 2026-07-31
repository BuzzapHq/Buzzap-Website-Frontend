const Notification = require('../models/Notification');
const logger = require('./logger');

/**
 * Create a notification. Best-effort: callers should not let a failure here
 * break the primary action (use .catch(() => {})).
 * Pass `user` to target one admin/staff, or omit for a broadcast (user: null).
 * @returns {Promise<object|null>}
 */
async function notify({ user = null, type = 'generic', title, message, link } = {}) {
  try {
    return await Notification.create({ user, type, title, message, link });
  } catch (err) {
    logger.error(`notify() failed: ${err.message}`);
    return null;
  }
}

module.exports = { notify };
