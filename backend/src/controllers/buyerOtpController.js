const { issueOtp, verifyOtp } = require("../services/otpService");
const { sendOtpEmail } = require("../services/emailService");
const { sendOtpSms } = require("../services/smsService");
const { otpMockMode, nodeEnv } = require("../config/env");

function createHttpError(statusCode, message) {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
}

function normalizeContact(channel, contact) {
  if (typeof contact !== "string") {
    return "";
  }

  if (channel === "email") {
    return contact.trim().toLowerCase();
  }

  return contact.replace(/\D/g, "");
}

function validateContact(channel, contact) {
  if (channel === "email") {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact);
  }

  return /^3\d{9}$/.test(contact);
}

async function requestBuyerOtp(req, res, next) {
  try {
    const { channel, contact, subscribeNewsletter } = req.body || {};

    if (channel !== "email" && channel !== "phone") {
      throw createHttpError(400, "Channel must be either email or phone.");
    }

    const normalizedContact = normalizeContact(channel, contact);
    if (!validateContact(channel, normalizedContact)) {
      throw createHttpError(400, `Please provide a valid ${channel}.`);
    }

    const otpDetails = await issueOtp({
      channel,
      contact: normalizedContact,
      subscribeNewsletter,
    });

    if (channel === "email") {
      await sendOtpEmail({
        to: normalizedContact,
        otp: otpDetails.otp,
        expiryMinutes: otpDetails.expiryMinutes,
      });
    } else {
      try {
        await sendOtpSms({
          localNumber: normalizedContact,
          otp: otpDetails.otp,
          expiryMinutes: otpDetails.expiryMinutes,
        });
      } catch (smsError) {
        if (!otpMockMode || nodeEnv === "production") {
          throw smsError;
        }
      }
    }

    const isPhoneMocked =
      channel === "phone" && otpMockMode && nodeEnv !== "production";

    const responseData = {
      channel,
      contact: normalizedContact,
      expiresAt: otpDetails.expiresAt,
    };

    if (isPhoneMocked) {
      responseData.devOtp = otpDetails.otp;
    }

    res.status(200).json({
      success: true,
      message:
        isPhoneMocked
          ? `SMS provider blocked this number in trial mode. Development OTP is ${otpDetails.otp}`
          : channel === "email"
          ? "OTP has been sent to your email address."
          : "OTP has been sent to your phone number.",
      data: responseData,
    });
  } catch (error) {
    next(error);
  }
}

async function verifyBuyerOtp(req, res, next) {
  try {
    const { channel, contact, otp } = req.body || {};

    if (channel !== "email" && channel !== "phone") {
      throw createHttpError(400, "Channel must be either email or phone.");
    }

    const normalizedContact = normalizeContact(channel, contact);
    if (!validateContact(channel, normalizedContact)) {
      throw createHttpError(400, `Please provide a valid ${channel}.`);
    }

    if (typeof otp !== "string" || !/^\d{4,8}$/.test(otp.trim())) {
      throw createHttpError(400, "Please provide a valid OTP.");
    }

    const result = await verifyOtp({
      channel,
      contact: normalizedContact,
      otp: otp.trim(),
    });

    if (!result.success) {
      throw createHttpError(400, result.message);
    }

    res.status(200).json({
      success: true,
      message: result.message,
      data: {
        channel,
        contact: normalizedContact,
      },
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  requestBuyerOtp,
  verifyBuyerOtp,
};
