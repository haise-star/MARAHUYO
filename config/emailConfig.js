import nodemailer from 'nodemailer';

// Function to generate OTP
export const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

// Create a transporter using Gmail
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: "haisetoji@gmail.com", // your Gmail
        pass: "qxlkaaqxmklihtai" // your app password
    }
});

// Function to send OTP email
export const sendOTPEmail = async (userEmail) => {
    const otp = generateOTP();
    
    const mailOptions = {
        from: '"Email Verification" <lopezraymark8@gmail.com>',
        to: userEmail,
        subject: 'Your OTP Verification Code',
        html: `
            <h1>Email Verification</h1>
            <p>Your OTP verification code is:</p>
            <h2 style="font-size: 36px; padding: 10px; background-color: #f0f0f0; text-align: center;">${otp}</h2>
            <p>This code will expire in 5 minutes.</p>
            <p>If you didn't request this code, please ignore this email.</p>
        `
    };

    try {
        console.log('Attempting to send email to:', userEmail);
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully. Response:', info.response);
        return { success: true, otp };
    } catch (error) {
        console.error('Detailed error sending email:', error);
        return { success: false, error: error.message };
    }
};

// Function to send verification email with token
export const sendVerificationEmail = async (userEmail, verificationToken) => {
    const mailOptions = {
        from: '"Email Verification" <lopezraymark8@gmail.com>',
        to: userEmail,
        subject: 'Email Verification',
        html: `
            <h1>Verify Your Email</h1>
            <p>Please click the link below to verify your email address:</p>
            <a href="http://localhost:3000/api/verify-email/${verificationToken}">
                Verify Email
            </a>
            <p>This link will expire in 1 hour.</p>
        `
    };

    try {
        console.log('Attempting to send email to:', userEmail);
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully. Response:', info.response);
        return true;
    } catch (error) {
        console.error('Detailed error sending email:', error);
        return false;
    }
};
