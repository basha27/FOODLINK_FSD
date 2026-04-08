import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import crypto from 'crypto';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const app = express();

// CORS: allow Vercel frontend + localhost dev
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:4173',
  process.env.FRONTEND_URL  // Set this in Render env vars to your Vercel URL
].filter(Boolean);

app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    if (allowedOrigins.some(allowed => origin.startsWith(allowed)) || origin.endsWith('.vercel.app')) {
      return callback(null, true);
    }
    return callback(null, true); // permissive for now; tighten later
  },
  credentials: true
}));
app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.json({ message: '🍽️ Food Link API is running', status: 'ok' });
});

// In-Memory DB for OTPs and Registered Users
const otpStorage = new Map();
const registeredUsers = new Map();
// Config Nodemailer
// It will fail if EMAIL_USER is not a valid Gmail address corresponding to the App Password
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER || 'sameerbashask2007@gmail.com',
    pass: (process.env.EMAIL_APP_PASSWORD || 'gyei zioo avyt cxjt').replace(/\s+/g, '')
  }
});

app.post('/api/auth/send-otp', async (req, res) => {
  const { email, role, password } = req.body;
  if (!email) return res.status(400).json({ error: 'Email is required' });

  // If user exists, check password, otherwise allow seamlessly
  if (registeredUsers.has(email)) {
    if (registeredUsers.get(email).password !== password) {
      return res.status(400).json({ error: 'Invalid password.' });
    }
  }

  // Generate 6-digit OTP
  const otp = crypto.randomInt(100000, 999999).toString();

  // Store it (expires in 5 minutes)
  const expiresAt = Date.now() + 1000 * 60 * 5;
  otpStorage.set(email, { otp, expiresAt, role, password });

  try {
    const mailOptions = {
      from: `"Food Link Enterprise" <${process.env.EMAIL_USER || 'sameerbashask2007@gmail.com'}>`,
      to: email,
      subject: `Your Food Link Portal OTP - ${role}`,
      html: `
        <div style="font-family: sans-serif; max-width: 500px; margin: 0 auto; border: 1px solid #eee; padding: 20px; border-radius: 10px;">
           <h2 style="color: #10b981; margin-bottom: 5px;">Food Link Portal</h2>
           <p style="color: #555; font-size: 14px;">Secure verification step for ${email}</p>
           <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
           <p style="font-size: 16px;">Here is your secure One-Time Password:</p>
           <h1 style="font-size: 32px; letter-spacing: 5px; color: #111; background: #f9f9f9; padding: 10px; text-align: center; border-radius: 5px;">${otp}</h1>
           <p style="color: #888; font-size: 12px; margin-top: 20px;">This code expires in 5 minutes. Do not share it with anyone.</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log(`[AUTH] OTP sent to ${email}`);
    res.json({ success: true, message: 'OTP sent to your email.' });

  } catch (error) {
    console.error('Email send error:', error);
    res.status(500).json({ error: 'Failed to send Auth email. Please check Node credentials.' });
  }
});

app.post('/api/auth/verify-otp', (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp) return res.status(400).json({ error: 'Email and OTP required' });

  const record = otpStorage.get(email);
  if (!record) return res.status(400).json({ error: 'No OTP requested or OTP expired' });

  if (Date.now() > record.expiresAt) {
    otpStorage.delete(email);
    return res.status(400).json({ error: 'OTP has expired' });
  }

  if (record.otp === otp) {
    otpStorage.delete(email); // consume OTP
    
    // Auto-register dynamically
    if (!registeredUsers.has(email)) {
      registeredUsers.set(email, { 
        name: 'Authorized User', 
        email: email, 
        role: record.role, 
        password: record.password 
      });
    }

    const activeUser = registeredUsers.get(email);

    // Generate token
    const token = Buffer.from(email + Date.now()).toString('base64');
    return res.json({
      success: true,
      token,
      user: { email, role: activeUser.role, name: activeUser.name }
    });
  }

  return res.status(400).json({ error: 'Invalid OTP' });
});

// Health check endpoint for Render
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`========================================`);
  console.log(`✅ Food Link Backend listening on port ${PORT}`);
  console.log(`✉️ Email Service Active via Nodemailer`);
  console.log(`========================================`);
});
