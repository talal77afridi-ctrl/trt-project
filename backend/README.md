# TRT Backend

Standalone Node.js + Express + MongoDB backend for this project.

## Setup

1. Install dependencies:
    - npm install
2. Make sure local MongoDB is running.
3. Run development server:
    - npm run dev

## Base Routes

- GET / -> welcome message
- GET /api/health -> health check

## Admin Auth APIs

- POST /api/admin/register
   - body: { "name": "Admin Name", "email": "admin@example.com", "password": "123456" }
- POST /api/admin/login
   - body: { "email": "admin@example.com", "password": "123456" }
- GET /api/admin/me
   - header: Authorization: Bearer <token>

## Buyer Auth APIs

- POST /api/buyers/register
   - body: { "fullName": "Buyer Name", "email": "buyer@example.com", "password": "123456", "phone": "03001234567" }
- POST /api/buyers/login
   - body: { "email": "buyer@example.com", "password": "123456" }
- GET /api/buyers/me
   - header: Authorization: Bearer <token>

## Buyer OTP APIs

- POST /api/buyers/otp/request
   - body: { "channel": "email" | "phone", "contact": "buyer@example.com" | "3xxxxxxxxx", "subscribeNewsletter": true }
- POST /api/buyers/otp/verify
   - body: { "channel": "email" | "phone", "contact": "buyer@example.com" | "3xxxxxxxxx", "otp": "123456" }

Note:
- OTP is sent only through configured providers.
- Configure SMTP (for email) and Twilio (for SMS) in `.env` before using OTP endpoints.
