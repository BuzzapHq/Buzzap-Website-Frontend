// One-off script to create (or update) the single admin account.
// Usage: npm run seed
// Reads ADMIN_EMAIL / ADMIN_PASSWORD / ADMIN_NAME from .env.
const config = require('../config/env');
const connectDB = require('../config/db');
const mongoose = require('mongoose');
const User = require('../models/User');
const logger = require('../utils/logger');

async function seedAdmin() {
  if (!config.ADMIN_EMAIL || !config.ADMIN_PASSWORD) {
    logger.error('ADMIN_EMAIL and ADMIN_PASSWORD must be set in .env to seed an admin.');
    process.exit(1);
  }

  await connectDB();

  const email = config.ADMIN_EMAIL.toLowerCase();
  let user = await User.findOne({ email }).select('+password');

  if (user) {
    // Update existing: ensure role is admin and reset the password.
    user.role = 'admin';
    user.isActive = true;
    user.password = config.ADMIN_PASSWORD; // pre-save hook hashes it
    if (config.ADMIN_NAME) user.name = config.ADMIN_NAME;
    await user.save();
    logger.info(`Admin account updated: ${email}`);
  } else {
    user = await User.create({
      name: config.ADMIN_NAME || 'Admin',
      email,
      password: config.ADMIN_PASSWORD,
      role: 'admin',
    });
    logger.info(`Admin account created: ${email}`);
  }

  await mongoose.connection.close();
  process.exit(0);
}

seedAdmin().catch(async (err) => {
  logger.error(`Seed failed: ${err.message}`);
  try {
    await mongoose.connection.close();
  } catch {
    /* ignore */
  }
  process.exit(1);
});
