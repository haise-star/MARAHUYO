import { config } from 'dotenv';
// Load environment variables first
config();

import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto';
import UserProfile from './models/user_profiles.js';
import ServiceProfile from './models/services.js';
import User from './models/User.js'; 
import Booking from './models/bookings.js';
import Announcement from './models/announcements.js'; 
import Review from './models/reviews.js';
import Message from './models/messages.js';
import Notification from './models/notifications.js'; 
import Payment from './models/payments.js'; 
import Address from './models/addresses.js'; 
import { sendOTPEmail } from './config/emailConfig.js';

const app = express();
app.use(express.json());
app.use(cors());

// Serve static files
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, 'views')));

// Connect to MongoDB
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/mydatabase';
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB successfully');
}).catch(err => {
    console.error('Error connecting to MongoDB:', err);
});

mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to ' + mongoose.connection.db.databaseName);
});
mongoose.connection.on('error', (err) => {
  console.error('Mongoose connection error:', err);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Register endpoint - FIXED (NO USERNAME)
app.post('/api/register', async (req, res) => {
    try {
        const { name, email, password, username } = req.body;

        if (!name || !email || !password || !username) {
            return res.status(400).json({ success: false, message: 'All fields are required' });
        }

        // Validate if it's a Gmail address
        if (!email.toLowerCase().endsWith('@gmail.com')) {
            return res.status(400).json({ 
                success: false, 
                message: 'Please use a valid Gmail address'
            });
        }

        // Check if email exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'Email already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Generate OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpires = new Date(Date.now() + 300000); // 5 minutes

        // Save new user with OTP
        const newUser = new User({ 
            name, 
            username,
            email, 
            password: hashedPassword,
            otp,
            otpExpires
        });
        await newUser.save();

        // Send OTP verification email if it's a Gmail address
        if (email.toLowerCase().endsWith('@gmail.com')) {
            try {
                console.log('Attempting to send OTP email...');
                const { success, otp: sentOtp } = await sendOTPEmail(email);
                if (success) {
                    console.log('OTP email sent successfully');
                    // Update user's OTP in database
                    newUser.otp = sentOtp;
                    newUser.otpExpires = new Date(Date.now() + 300000); // 5 minutes
                    await newUser.save();
                } else {
                    console.log('Failed to send OTP email');
                }
            } catch (emailError) {
                console.error('Email error:', emailError);
                // Continue with registration even if email fails
            }
        } else {
            console.log('Non-Gmail address - skipping verification email');
        }

        res.status(201).json({ 
            success: true, 
            message: 'User registered successfully',
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error: ' + error.message });
    }
});

// Login endpoint - FIXED (USING EMAIL)
app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body; // CHANGED to email

        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'Email and password are required' });
        }

        // hanapin user by EMAIL
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: 'Invalid email or password' });
        }

        // i-compare yung password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: 'Invalid email or password' });
        }

        // Check if Gmail and if verification is required
        if (email.toLowerCase().endsWith('@gmail.com') && !user.emailVerified) {
            console.log('Gmail user not verified');
            // Allow login but remind about verification
            return res.json({
                success: true,
                message: 'Login successful. Please check your email for verification.',
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    verified: false
                }
            });
        }

        res.json({ 
            success: true, 
            message: 'Login successful',
            user: { 
                id: user._id, 
                name: user.name, 
                email: user.email 
            }
        });

    } catch (error) {
        console.error('Login error:', error.message);
        res.status(500).json({ success: false, message: 'Server error: ' + error.message });
    }
});

// Get all users (testing)
app.get('/api/users', async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.json({ success: true, users });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ success: false, message: 'Error fetching users' });
    }
});

// Serve the main page
// Email verification endpoint
// Verify OTP
app.post('/api/verify-otp', async (req, res) => {
    try {
        const { email, otp } = req.body;

        const user = await User.findOne({
            email,
            otp,
            otpExpires: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'Invalid or expired OTP'
            });
        }

        // Update user verification status
        user.verification_status = 'verified';
        user.verified_at = new Date();
        user.otp = undefined;
        user.otpExpires = undefined;
        await user.save();

        res.json({
            success: true,
            message: 'Email verified successfully'
        });
    } catch (error) {
        console.error('OTP verification error:', error);
        res.status(500).json({
            success: false,
            message: 'Error verifying OTP'
        });
    }
});

app.get('/api/verify-email/:token', async (req, res) => {
    try {
        const { token } = req.params;

        const user = await User.findOne({
            verificationToken: token,
            verificationTokenExpires: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'Invalid or expired verification token'
            });
        }

        // Update user verification status
        user.emailVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpires = undefined;
        user.verified_at = new Date();
        await user.save();

        res.send(`
            <h1>Email Verified Successfully!</h1>
            <p>You can now close this window and login to your account.</p>
        `);
    } catch (error) {
        console.error('Verification error:', error);
        res.status(500).json({
            success: false,
            message: 'Error verifying email'
        });
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});