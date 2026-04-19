const twilio = require("twilio");

const {
  twilioAccountSid,
  twilioAuthToken,
  twilioPhoneNumber,
  twilioCountryCode,
} = require("../config/env");

let twilioClient = null;

function mapTwilioSmsError(error) {
  const code = Number(error?.code);

  if (code === 21608) {
    return {
      statusCode: 400,
      message:
        "Phone OTP cannot be sent because this Twilio account is in trial mode and the destination number is not verified. Please upgrade your Twilio account.",
    };
  }

  if (code === 21408) {
    return {
      statusCode: 400,
      message:
        "Phone OTP cannot be sent because SMS permissions are not enabled for this destination country in Twilio Geo Permissions.",
    };
  }

  if (code === 21211) {
    return {
      statusCode: 400,
      message: "Please provide a valid phone number.",
    };
  }

  if (code === 21614) {
    return {
      statusCode: 400,
      message: "This phone number cannot receive SMS messages.",
    };
  }

  return {
    statusCode: 502,
    message: "Unable to send phone OTP right now. Please try again shortly.",
  };
}

function createTwilioClient() {
  if (!twilioAccountSid || !twilioAuthToken || !twilioPhoneNumber) {
    throw new Error(
      "Twilio is not configured. Set TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, and TWILIO_PHONE_NUMBER in backend .env"
    );
  }

  return twilio(twilioAccountSid, twilioAuthToken);
}

function getTwilioClient() {
  if (!twilioClient) {
    twilioClient = createTwilioClient();
  }

  return twilioClient;
}

function toE164LocalNumber(localNumber) {
  const digits = String(localNumber || "").replace(/\D/g, "");
  const normalizedCountryCode = twilioCountryCode.startsWith("+")
    ? twilioCountryCode
    : `+${twilioCountryCode}`;
  return `${normalizedCountryCode}${digits}`;
}

async function sendOtpSms({ localNumber, otp, expiryMinutes }) {
  const client = getTwilioClient();
  const to = toE164LocalNumber(localNumber);

  try {
    await client.messages.create({
      from: twilioPhoneNumber,
      to,
      body: `TRT OTP: ${otp}. Valid for ${expiryMinutes} minutes.`,
    });
  } catch (error) {
    const mapped = mapTwilioSmsError(error);
    const smsError = new Error(mapped.message);
    smsError.statusCode = mapped.statusCode;
    throw smsError;
  }
}

module.exports = {
  sendOtpSms,
};
