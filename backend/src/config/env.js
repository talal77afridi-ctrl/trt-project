const dotenv = require("dotenv");

dotenv.config();

function toNumber(value, fallback) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

module.exports = {
  port: toNumber(process.env.PORT, 5000),
  nodeEnv: process.env.NODE_ENV || "development",
  mongoUri: process.env.MONGODB_URI || "mongodb://localhost:27017/trt",
  jwtSecret: process.env.JWT_SECRET || "change-this-secret",
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "7d",
  smtpHost: process.env.SMTP_HOST || "",
  smtpPort: toNumber(process.env.SMTP_PORT, 587),
  smtpSecure: process.env.SMTP_SECURE === "true",
  smtpUser: process.env.SMTP_USER || "",
  smtpPass: process.env.SMTP_PASS || "",
  smtpFrom: process.env.SMTP_FROM || "",
  twilioAccountSid: process.env.TWILIO_ACCOUNT_SID || "",
  twilioAuthToken: process.env.TWILIO_AUTH_TOKEN || "",
  twilioPhoneNumber: process.env.TWILIO_PHONE_NUMBER || "",
  twilioCountryCode: process.env.TWILIO_COUNTRY_CODE || "+92",
  otpMockMode: process.env.OTP_MOCK_MODE === "true",
  otpLength: toNumber(process.env.OTP_LENGTH, 6),
  otpExpiryMinutes: toNumber(process.env.OTP_EXPIRY_MINUTES, 10),
  otpMaxAttempts: toNumber(process.env.OTP_MAX_ATTEMPTS, 5),
  otpHashSecret: process.env.OTP_HASH_SECRET || process.env.JWT_SECRET || "change-this-secret",
};
