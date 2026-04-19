const express = require("express");

const buyerOtpRoutes = require("./buyerOtpRoutes");

const router = express.Router();

router.get("/health", (req, res) => {
  res.json({
    success: true,
    message: "Backend is healthy",
  });
});

router.use("/buyers/otp", buyerOtpRoutes);

module.exports = router;
