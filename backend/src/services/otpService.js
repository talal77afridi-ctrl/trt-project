const crypto = require("crypto");

const OtpCode = require("../models/OtpCode");
const {
  otpLength,
  otpExpiryMinutes,
  otpMaxAttempts,
  otpHashSecret,
} = require("../config/env");

function hashOtp(contact, otp) {
  return crypto
    .createHmac("sha256", otpHashSecret)
    .update(`${contact}:${otp}`)
    .digest("hex");
}

function generateNumericOtp(length) {
  let otp = "";
  for (let index = 0; index < length; index += 1) {
    otp += crypto.randomInt(0, 10).toString();
  }
  return otp;
}

async function issueOtp({ channel, contact, subscribeNewsletter }) {
  const otp = generateNumericOtp(Math.max(4, otpLength));
  const expiresAt = new Date(Date.now() + otpExpiryMinutes * 60 * 1000);

  await OtpCode.updateMany(
    { channel, contact, consumed: false },
    { $set: { consumed: true } }
  );

  await OtpCode.create({
    channel,
    contact,
    otpHash: hashOtp(contact, otp),
    subscribeNewsletter: Boolean(subscribeNewsletter),
    expiresAt,
  });

  return {
    otp,
    expiresAt,
    expiryMinutes: otpExpiryMinutes,
  };
}

async function verifyOtp({ channel, contact, otp }) {
  const now = new Date();
  const record = await OtpCode.findOne({
    channel,
    contact,
    consumed: false,
  }).sort({ createdAt: -1 });

  if (!record || record.expiresAt <= now) {
    return {
      success: false,
      code: "OTP_EXPIRED",
      message: "OTP has expired. Please request a new code.",
    };
  }

  if (record.attempts >= otpMaxAttempts) {
    record.consumed = true;
    await record.save();

    return {
      success: false,
      code: "MAX_ATTEMPTS_REACHED",
      message: "Too many incorrect attempts. Please request a new OTP.",
    };
  }

  const isMatch = record.otpHash === hashOtp(contact, otp);

  if (!isMatch) {
    record.attempts += 1;

    if (record.attempts >= otpMaxAttempts) {
      record.consumed = true;
    }

    await record.save();

    return {
      success: false,
      code: "INVALID_OTP",
      message: "The OTP you entered is incorrect.",
    };
  }

  record.consumed = true;
  record.verifiedAt = now;
  await record.save();

  return {
    success: true,
    code: "VERIFIED",
    message: "OTP verified successfully.",
  };
}

module.exports = {
  issueOtp,
  verifyOtp,
};
