const express = require("express");

const {
  requestBuyerOtp,
  verifyBuyerOtp,
} = require("../controllers/buyerOtpController");

const router = express.Router();

router.post("/request", requestBuyerOtp);
router.post("/verify", verifyBuyerOtp);

module.exports = router;
