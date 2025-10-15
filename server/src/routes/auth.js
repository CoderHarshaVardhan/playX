import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import User from "../models/User.js";

import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

router.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existing = await User.findOne({ email });
        if (existing) return res.status(400).json({ msg: "Email already registered" });

        const hash = await bcrypt.hash(password, 10);
        const user = new User({ name, email, password: hash });
        await user.save();

        // Create verification token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

        const url = `${process.env.CLIENT_URL}/verify/${token}`;

        // Send email
        await transporter.sendMail({
            from: `"playX" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "🎯 Verify Your playX Pro Account",
            html: `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verify Your Email</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f3f4f6; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
    <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f3f4f6;">
        <tr>
            <td align="center" style="padding: 40px 20px;">
                <table role="presentation" style="max-width: 600px; width: 100%; border-collapse: collapse; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                    
                    <!-- Header with Gradient -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #2563eb 0%, #9333ea 100%); padding: 40px 30px; text-align: center;">
         <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
            <div className="flex items-center justify-center mb-2">
              <img 
  src="https://res.cloudinary.com/drfqmhi2a/image/upload/v1759885135/playX-logo_t8v0b7.png"
  alt="PlayX Logo" 
  width="100" 
  style="display:block; margin:0 auto;"
/>

            </div>
            <p className="text-center text-blue-100 text-sm mt-1">
              Book grounds & find players nearby
            </p>
          </div>
                            <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700; letter-spacing: -0.5px;">
                                Welcome to GameMatch Pro!
                            </h1>
                            <p style="margin: 10px 0 0; color: rgba(255, 255, 255, 0.9); font-size: 16px;">
                                You're one step away from joining the game
                            </p>
                        </td>
                    </tr>
                    
                    <!-- Body Content -->
                    <tr>
                        <td style="padding: 40px 30px;">
                            <p style="margin: 0 0 10px; color: #1f2937; font-size: 18px; font-weight: 600;">
                                Hi ${name},
                            </p>
                            <p style="margin: 10px 0 20px; color: #4b5563; font-size: 16px; line-height: 1.6;">
                                Thank you for signing up! We're excited to have you join our community of sports enthusiasts. Click the button below to verify your email address and start booking grounds and finding players near you.
                            </p>
                            
                            <!-- Verification Button -->
                            <table role="presentation" style="width: 100%; border-collapse: collapse; margin: 30px 0;">
                                <tr>
                                    <td align="center">
                                        <a href="${url}" style="display: inline-block; background: linear-gradient(135deg, #2563eb 0%, #9333ea 100%); color: #ffffff; text-decoration: none; padding: 16px 40px; border-radius: 8px; font-weight: 600; font-size: 16px; box-shadow: 0 4px 6px rgba(37, 99, 235, 0.3);">
                                            Verify Email Address
                                        </a>
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- Alternative Link -->
                            <div style="margin: 30px 0; padding: 20px; background-color: #f9fafb; border-radius: 8px; border-left: 4px solid #2563eb;">
                                <p style="margin: 0 0 10px; color: #4b5563; font-size: 14px; font-weight: 600;">
                                    Button not working?
                                </p>
                                <p style="margin: 0; color: #6b7280; font-size: 13px; line-height: 1.5; word-break: break-all;">
                                    Copy and paste this link into your browser:<br>
                                    <a href="${url}" style="color: #2563eb; text-decoration: none;">${url}</a>
                                </p>
                            </div>
                            
                            <!-- Features Section -->
                            <div style="margin: 30px 0; padding: 20px 0; border-top: 1px solid #e5e7eb; border-bottom: 1px solid #e5e7eb;">
                                <p style="margin: 0 0 15px; color: #1f2937; font-size: 16px; font-weight: 600;">
                                    What you can do with PlayX Pro:
                                </p>
                                <table role="presentation" style="width: 100%; border-collapse: collapse;">
                                    <tr>
                                        <td style="padding: 8px 0; vertical-align: top;">
                                            <span style="display: inline-block; width: 24px; height: 24px; background-color: #dbeafe; border-radius: 50%; text-align: center; line-height: 24px; margin-right: 10px;">⚽</span>
                                            <span style="color: #4b5563; font-size: 14px;">Find and join local sports matches</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 8px 0; vertical-align: top;">
                                            <span style="display: inline-block; width: 24px; height: 24px; background-color: #dbeafe; border-radius: 50%; text-align: center; line-height: 24px; margin-right: 10px;">📍</span>
                                            <span style="color: #4b5563; font-size: 14px;">Book sports grounds near you</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 8px 0; vertical-align: top;">
                                            <span style="display: inline-block; width: 24px; height: 24px; background-color: #dbeafe; border-radius: 50%; text-align: center; line-height: 24px; margin-right: 10px;">👥</span>
                                            <span style="color: #4b5563; font-size: 14px;">Connect with fellow sports enthusiasts</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 8px 0; vertical-align: top;">
                                            <span style="display: inline-block; width: 24px; height: 24px; background-color: #dbeafe; border-radius: 50%; text-align: center; line-height: 24px; margin-right: 10px;">⭐</span>
                                            <span style="color: #4b5563; font-size: 14px;">Rate and review grounds and players</span>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                            
                            <!-- Security Notice -->
                            <div style="margin: 20px 0; padding: 15px; background-color: #fef3c7; border-radius: 8px; border-left: 4px solid #f59e0b;">
                                <p style="margin: 0; color: #92400e; font-size: 13px; line-height: 1.5;">
                                    <strong>🔒 Security Note:</strong> This verification link will expire in 24 hours. If you didn't create an account with GameMatch Pro, please ignore this email.
                                </p>
                            </div>
                            
                            <p style="margin: 30px 0 0; color: #4b5563; font-size: 15px; line-height: 1.6;">
                                Best regards,<br>
                                <strong style="color: #1f2937;">The PlayX Pro Team</strong>
                            </p>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="background-color: #f9fafb; padding: 30px; text-align: center; border-top: 1px solid #e5e7eb;">
                            <p style="margin: 0 0 10px; color: #6b7280; font-size: 12px;">
                                Need help? Contact us at <a href="mailto:support@playxpro.com" style="color: #2563eb; text-decoration: none;">support@playxpro.com</a>
                            </p>
                            <p style="margin: 10px 0; color: #9ca3af; font-size: 11px;">
                                © ${new Date().getFullYear()} PlayX Pro. All rights reserved.
                            </p>
                            <p style="margin: 10px 0 0; color: #9ca3af; font-size: 11px;">
                                123 Sports Avenue, Hyderabad, Telangana, India
                            </p>
                        </td>
                    </tr>
                    
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
    `,
        });

        res.status(201).json({ msg: "User registered. Check your email for verification link." });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Server error" });
    }
});

router.get("/verify/:token", async (req, res) => {
    try {
        const { token } = req.params;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        await User.findByIdAndUpdate(decoded.id, { isVerified: true });
        res.json({ msg: "Email verified successfully!" });
    } catch (err) {
        res.status(400).json({ msg: "Invalid or expired token" });
    }
});

// Login
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: "Invalid email or password" });

        if (!user.isVerified) return res.status(401).json({ msg: "Please verify your email first" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "Invalid email or password" });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
        res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Server error" });
    }
});

export default router;
