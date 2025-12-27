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
        console.log(name, email, password);
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
            from: `"PlayX Pro" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "🎯 Verify Your PlayX Pro Account - Get Started Today!",
            html: `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Verify Your PlayX Pro Email</title>
    <!--[if mso]>
    <style type="text/css">
        body, table, td {font-family: Arial, Helvetica, sans-serif !important;}
    </style>
    <![endif]-->
</head>
<body style="margin: 0; padding: 0; background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%); font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;">
    
    <!-- Preheader Text (Hidden but shows in email preview) -->
    <div style="display: none; max-height: 0px; overflow: hidden;">
        Welcome to PlayX Pro! Click to verify your email and start booking grounds 🎾⚽🏀
    </div>
    
    <!-- Main Container -->
    <table role="presentation" style="width: 100%; border-collapse: collapse; background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%); padding: 40px 0;">
        <tr>
            <td align="center" style="padding: 20px;">
                
                <!-- Email Content Wrapper -->
                <table role="presentation" style="max-width: 600px; width: 100%; border-collapse: collapse; background-color: #1e293b; border-radius: 24px; overflow: hidden; box-shadow: 0 0 40px rgba(34, 211, 238, 0.3), 0 20px 60px rgba(0, 0, 0, 0.5); border: 2px solid rgba(34, 211, 238, 0.3);">
                    
                    <!-- Animated Header with Logo -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #0ea5e9 0%, #3b82f6 100%); padding: 50px 40px; text-align: center; position: relative;">
                            
                            <!-- Logo Container -->
                            <div style="text-align: center; margin-bottom: 20px;">
                                <div style="background: rgba(255, 255, 255, 0.15); backdrop-filter: blur(10px); border-radius: 20px; padding: 15px 30px; display: inline-block; border: 2px solid rgba(255, 255, 255, 0.2);">
                                    <img src="https://res.cloudinary.com/drfqmhi2a/image/upload/v1759885135/playX-logo_t8v0b7.png" 
                                         alt="PlayX Pro Logo" 
                                         width="80" 
                                         height="80"
                                         style="display: block; margin: 0 auto; border: 0; max-width: 100%; height: auto; vertical-align: middle;" />
                                </div>
                            </div>
                            
                            <!-- Welcome Message -->
                            <h1 style="margin: 20px 0 0; color: #ffffff; font-size: 32px; font-weight: 700; letter-spacing: -0.5px; line-height: 1.2; text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);">
                                🎉 Welcome to PlayX Pro!
                            </h1>
                            <p style="margin: 15px 0 0; color: rgba(255, 255, 255, 0.95); font-size: 17px; font-weight: 500; line-height: 1.5;">
                                You're one click away from booking grounds<br>and finding players nearby
                            </p>
                        </td>
                    </tr>
                    
                    <!-- Main Body Content -->
                    <tr>
                        <td style="padding: 50px 40px;">
                            
                            <!-- Personalized Greeting -->
                            <div style="text-align: center; margin-bottom: 30px;">
                                <div style="display: inline-block; background: linear-gradient(135deg, #22d3ee 0%, #3b82f6 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; color: #22d3ee; font-size: 24px; font-weight: 700;">
                                    Hi ${name}! 👋
                                </div>
                            </div>
                            
                            <p style="margin: 0 0 20px; color: #e5e7eb; font-size: 16px; line-height: 1.8; text-align: center;">
                                Thanks for joining <strong>PlayX Pro</strong> – your ultimate sports companion! We're thrilled to have you in our community of passionate sports enthusiasts.
                            </p>
                            
                            <p style="margin: 20px 0 30px; color: #d1d5db; font-size: 15px; line-height: 1.7; text-align: center;">
                                To get started and unlock all features, please verify your email address by clicking the button below:
                            </p>
                            
                            <!-- Verification Button with Gradient -->
                            <table role="presentation" style="width: 100%; border-collapse: collapse; margin: 40px 0;">
                                <tr>
                                    <td align="center">
                                        <!--[if mso]>
                                        <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${url}" style="height:60px;v-text-anchor:middle;width:280px;" arcsize="10%" stroke="f" fillcolor="#667eea">
                                        <w:anchorlock/>
                                        <center>
                                        <![endif]-->
                                        <a href="${url}" 
                                           style="display: inline-block; background: linear-gradient(135deg, #22d3ee 0%, #3b82f6 100%); color: #ffffff; text-decoration: none; padding: 18px 50px; border-radius: 12px; font-weight: 700; font-size: 17px; box-shadow: 0 10px 30px rgba(34, 211, 238, 0.5), 0 0 20px rgba(34, 211, 238, 0.3); text-align: center;">
                                            ✅ Verify My Email Address
                                        </a>
                                        <!--[if mso]>
                                        </center>
                                        </v:roundrect>
                                        <![endif]-->
                                    </td>
                                </tr>
                            </table>
                            
                            <p style="margin: 30px 0 0; color: #9ca3af; font-size: 13px; text-align: center; line-height: 1.6;">
                                This button will take you to our secure verification page.<br>
                                <strong style="color: #d1d5db;">The link expires in 24 hours.</strong>
                            </p>
                            
                            <!-- Divider -->
                            <div style="margin: 40px 0; height: 1px; background: linear-gradient(to right, transparent, rgba(34, 211, 238, 0.3), transparent);"></div>
                            
                            <!-- Alternative Link Section -->
                            <div style="margin: 30px 0; padding: 25px; background: linear-gradient(135deg, rgba(34, 211, 238, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%); border-radius: 16px; border-left: 5px solid #22d3ee;">
                                <p style="margin: 0 0 12px; color: #e5e7eb; font-size: 14px; font-weight: 700;">
                                    🔗 Button not working?
                                </p>
                                <p style="margin: 0 0 8px; color: #d1d5db; font-size: 13px; line-height: 1.6;">
                                    Copy and paste this link into your browser:
                                </p>
                                <p style="margin: 0; color: #22d3ee; font-size: 12px; line-height: 1.6; word-break: break-all; font-family: 'Courier New', monospace; background: rgba(15, 23, 42, 0.5); padding: 12px; border-radius: 8px; border: 1px solid rgba(34, 211, 238, 0.3);">
                                    <a href="${url}" style="color: #22d3ee; text-decoration: none;">${url}</a>
                                </p>
                            </div>
                            
                            <!-- Divider -->
                            <div style="margin: 40px 0; height: 1px; background: linear-gradient(to right, transparent, rgba(34, 211, 238, 0.3), transparent);"></div>
                            
                            <!-- Features Section with Icons -->
                            <div style="margin: 40px 0;">
                                <h2 style="margin: 0 0 25px; color: #e5e7eb; font-size: 20px; font-weight: 700; text-align: center;">
                                    🌟 What You Can Do with PlayX Pro
                                </h2>
                                
                                <table role="presentation" style="width: 100%; border-collapse: collapse;">
                                    <!-- Feature 1 -->
                                    <tr>
                                        <td style="padding: 15px 0; vertical-align: middle; width: 60px;">
                                            <div style="width: 50px; height: 50px; background: linear-gradient(135deg, #22d3ee 0%, #3b82f6 100%); border-radius: 12px; text-align: center; line-height: 50px; font-size: 26px; box-shadow: 0 4px 15px rgba(34, 211, 238, 0.4); display: block;">
                                                ⚽
                                            </div>
                                        </td>
                                        <td style="padding: 15px 0 15px 15px; vertical-align: middle;">
                                            <p style="margin: 0 0 4px; color: #e5e7eb; font-size: 15px; font-weight: 600; line-height: 1.4;">
                                                Find & Join Local Matches
                                            </p>
                                            <p style="margin: 0; color: #9ca3af; font-size: 13px; line-height: 1.5;">
                                                Discover pickup games and sports events near you
                                            </p>
                                        </td>
                                    </tr>
                                    
                                    <!-- Feature 2 -->
                                    <tr>
                                        <td style="padding: 15px 0; vertical-align: middle; width: 60px;">
                                            <div style="width: 50px; height: 50px; background: linear-gradient(135deg, #ec4899 0%, #f43f5e 100%); border-radius: 12px; text-align: center; line-height: 50px; font-size: 26px; box-shadow: 0 4px 15px rgba(236, 72, 153, 0.4); display: block;">
                                                📍
                                            </div>
                                        </td>
                                        <td style="padding: 15px 0 15px 15px; vertical-align: middle;">
                                            <p style="margin: 0 0 4px; color: #e5e7eb; font-size: 15px; font-weight: 600; line-height: 1.4;">
                                                Book Sports Grounds
                                            </p>
                                            <p style="margin: 0; color: #9ca3af; font-size: 13px; line-height: 1.5;">
                                                Reserve your favorite courts and fields instantly
                                            </p>
                                        </td>
                                    </tr>
                                    
                                    <!-- Feature 3 -->
                                    <tr>
                                        <td style="padding: 15px 0; vertical-align: middle; width: 60px;">
                                            <div style="width: 50px; height: 50px; background: linear-gradient(135deg, #06b6d4 0%, #0ea5e9 100%); border-radius: 12px; text-align: center; line-height: 50px; font-size: 26px; box-shadow: 0 4px 15px rgba(6, 182, 212, 0.4); display: block;">
                                                👥
                                            </div>
                                        </td>
                                        <td style="padding: 15px 0 15px 15px; vertical-align: middle;">
                                            <p style="margin: 0 0 4px; color: #e5e7eb; font-size: 15px; font-weight: 600; line-height: 1.4;">
                                                Connect with Players
                                            </p>
                                            <p style="margin: 0; color: #9ca3af; font-size: 13px; line-height: 1.5;">
                                                Build your network of fellow sports enthusiasts
                                            </p>
                                        </td>
                                    </tr>
                                    
                                    <!-- Feature 4 -->
                                    <tr>
                                        <td style="padding: 15px 0; vertical-align: middle; width: 60px;">
                                            <div style="width: 50px; height: 50px; background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%); border-radius: 12px; text-align: center; line-height: 50px; font-size: 26px; box-shadow: 0 4px 15px rgba(251, 191, 36, 0.4); display: block;">
                                                ⭐
                                            </div>
                                        </td>
                                        <td style="padding: 15px 0 15px 15px; vertical-align: middle;">
                                            <p style="margin: 0 0 4px; color: #e5e7eb; font-size: 15px; font-weight: 600; line-height: 1.4;">
                                                Rate & Review
                                            </p>
                                            <p style="margin: 0; color: #9ca3af; font-size: 13px; line-height: 1.5;">
                                                Share feedback on grounds and player experiences
                                            </p>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                            
                            <!-- Divider -->
                            <div style="margin: 40px 0; height: 1px; background: linear-gradient(to right, transparent, rgba(34, 211, 238, 0.3), transparent);"></div>
                            
                            <!-- Security Notice -->
                            <div style="margin: 30px 0; padding: 20px; background: linear-gradient(135deg, rgba(251, 191, 36, 0.15) 0%, rgba(245, 158, 11, 0.15) 100%); border-radius: 16px; border-left: 5px solid #fbbf24;">
                                <table role="presentation" style="width: 100%; border-collapse: collapse;">
                                    <tr>
                                        <td style="width: 40px; vertical-align: middle; padding-right: 12px; text-align: center;">
                                            <div style="font-size: 26px; line-height: 1;">🔒</div>
                                        </td>
                                        <td style="vertical-align: middle;">
                                            <p style="margin: 0; color: #fde68a; font-size: 13px; line-height: 1.7;">
                                                <strong style="color: #fbbf24;">Security Note:</strong> This verification link will expire in <strong>24 hours</strong>. If you didn't create an account with PlayX Pro, you can safely ignore this email. Your security is our priority!
                                            </p>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                            
                            <!-- Closing Message -->
                            <p style="margin: 40px 0 10px; color: #d1d5db; font-size: 15px; line-height: 1.7; text-align: center;">
                                Ready to play? Let's get started! 🎾
                            </p>
                            
                            <p style="margin: 20px 0 0; color: #d1d5db; font-size: 15px; line-height: 1.6; text-align: center;">
                                Best regards,<br>
                                <strong style="background: linear-gradient(135deg, #22d3ee 0%, #3b82f6 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; color: #22d3ee; font-size: 16px;">The PlayX Pro Team</strong>
                            </p>
                        </td>
                    </tr>
                    
                    <!-- Footer with Social Links -->
                    <tr>
                        <td style="background: linear-gradient(135deg, rgba(15, 23, 42, 0.8) 0%, rgba(30, 41, 59, 0.8) 100%); padding: 40px 30px; text-align: center; border-top: 1px solid rgba(34, 211, 238, 0.3);">
                            
                            <!-- Social Media Icons -->
                            <table role="presentation" style="border-collapse: collapse; margin: 0 auto 25px;">
                                <tr>
                                    <td style="padding: 0 10px;">
                                        <a href="#" style="text-decoration: none; display: block;">
                                            <div style="width: 44px; height: 44px; background: linear-gradient(135deg, #22d3ee 0%, #3b82f6 100%); border-radius: 50%; text-align: center; line-height: 44px; color: #ffffff; font-size: 20px; display: block; box-shadow: 0 4px 15px rgba(34, 211, 238, 0.3);">
                                                📘
                                            </div>
                                        </a>
                                    </td>
                                    <td style="padding: 0 10px;">
                                        <a href="#" style="text-decoration: none; display: block;">
                                            <div style="width: 44px; height: 44px; background: linear-gradient(135deg, #06b6d4 0%, #0ea5e9 100%); border-radius: 50%; text-align: center; line-height: 44px; color: #ffffff; font-size: 20px; display: block; box-shadow: 0 4px 15px rgba(6, 182, 212, 0.3);">
                                                🐦
                                            </div>
                                        </a>
                                    </td>
                                    <td style="padding: 0 10px;">
                                        <a href="#" style="text-decoration: none; display: block;">
                                            <div style="width: 44px; height: 44px; background: linear-gradient(135deg, #ec4899 0%, #f43f5e 100%); border-radius: 50%; text-align: center; line-height: 44px; color: #ffffff; font-size: 20px; display: block; box-shadow: 0 4px 15px rgba(236, 72, 153, 0.3);">
                                                📷
                                            </div>
                                        </a>
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- Support Link -->
                            <p style="margin: 0 0 15px; color: #d1d5db; font-size: 14px; font-weight: 600;">
                                Need Help?
                            </p>
                            <p style="margin: 0 0 20px;">
                                <a href="mailto:support@playxpro.com" style="color: #22d3ee; text-decoration: none; font-size: 14px; font-weight: 600;">
                                    📧 support@playxpro.com
                                </a>
                            </p>
                            
                            <!-- Divider -->
                            <div style="margin: 25px auto; height: 1px; width: 100px; background: linear-gradient(to right, transparent, rgba(34, 211, 238, 0.3), transparent);"></div>
                            
                            <!-- Copyright -->
                            <p style="margin: 15px 0 5px; color: #9ca3af; font-size: 12px;">
                                © ${new Date().getFullYear()} PlayX Pro. All rights reserved.
                            </p>
                            <p style="margin: 5px 0 15px; color: #9ca3af; font-size: 11px; line-height: 1.5;">
                                123 Sports Avenue, Hitech City, Hyderabad, Telangana 500081, India
                            </p>
                            
                            <!-- Unsubscribe Link -->
                            <p style="margin: 15px 0 0; color: #9ca3af; font-size: 11px;">
                                <a href="#" style="color: #9ca3af; text-decoration: underline;">Unsubscribe</a> | 
                                <a href="#" style="color: #9ca3af; text-decoration: underline;">Privacy Policy</a> | 
                                <a href="#" style="color: #9ca3af; text-decoration: underline;">Terms of Service</a>
                            </p>
                        </td>
                    </tr>
                    
                </table>
                
                <!-- Extra Spacing -->
                <div style="height: 20px;"></div>
                
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
        console.log("token", token);

    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Server error" });
    }
});

export default router;
