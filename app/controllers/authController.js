import bcrypt from 'bcryptjs'
import crypto from 'crypto'
import { format } from 'date-fns'
import jwt from "jsonwebtoken"
import { NextResponse } from "next/server.js"
import { Usermodel } from '../Models/User.js'
import transporter from "../Utils/nodemailer.js"

export const signup = async (formData) => {
    const {
        name,
        email,
        password,
        contactNumber,
        address,
        role,
        image = "",
        userType,
        donationCapacity,
        license,
        collectorType,
        noOfTeamMember,
        ngoRegistrationNumber,
        yourCollectingArea,
        cityCorp,
        area,
    } = formData;

    try {
        // Validate basic required fields
        if (!name || !email || !password || !role || !contactNumber) {
            return NextResponse.json({
                message: `Did not get data properly`,
                success: false,
            });
        }

        // Check existing user
        const existingUser = await Usermodel.findOne({ email });
        const existingContactNumber = await Usermodel.findOne({ contactNumber });
        if (existingUser) {
            return NextResponse.json({
                message: `User already exists`,
                success: false,
            });
        }
        if (existingContactNumber) {
            return NextResponse.json({
                message: `Contact number already exists`,
                success: false,
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        let user;

        // Donor signup
        if (role === "user") {
            if (!image) {
                return NextResponse.json({
                    message: "Upload your image",
                    success: false,
                });
            }
            user = new Usermodel({
                name,
                email,
                password: hashedPassword,
                contactNumber,
                address,
                isUser: true,
                role: "user",
                image,
                userType,
                donationCapacity,
                license,
                cityCorp,
                area,
            });
        }

        // Collector signup
        else if (role === "collector") {
            user = new Usermodel({
                name,
                email,
                password: hashedPassword,
                contactNumber,
                address,
                isCollector: true,
                role: "collector",
                image,
                collectorType,
                noOfTeamMember: Number(noOfTeamMember) || 0,
                ngoRegistrationNumber: ngoRegistrationNumber || "",
                yourCollectingArea: yourCollectingArea || "",
                cityCorp,
                area,
            });
        }

        // Invalid role
        else {
            return NextResponse.json({
                message: `${role} role does not exist`,
                success: false,
            });
        }

        // Save user
        await user.save();


        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: "Welcome to Website",
            text: `Welcome to our site! You have registered with ${email}.`,
        };
        await transporter.sendMail(mailOptions);


        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: `7d`,
        });

        const response = NextResponse.json({
            message: `Signup successful`,
            success: true,
            user,
            token,
        });

        // Set token cookie
        response.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "lax" : "strict",
            maxAge: 7 * 24 * 60 * 60,
            path: "/",
        });

        return response;
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message });
    }
};


export const login = async (req) => {
    const { email, password } = await req.json()
    try {
        if (!email || !password) {
            return NextResponse.json({
                message: `missing data`,
                success: false
            })
        }
        const user = await Usermodel.findOne({ email })

        if (!user) {
            return NextResponse.json({
                message: `user not found`,
                success: false
            })
        }
        const matchedPassword = await bcrypt.compare(password, user.password)
        if (!matchedPassword) {
            return NextResponse.json({
                message: `invalied password`,
                success: false
            })
        }
        if (user.isBanned) {
            return NextResponse.json({
                message: `account suspended`,
                success: false
            })
        }
        const token = jwt.sign(
            {
                id: user._id,
                role: user.role,
                isVerified: user.isVerified
            },
            process.env.JWT_SECRET,
            { expiresIn: `7d` }
        )
        const response = NextResponse.json({
            message: `Login successful`,
            success: true,
            user,
            token,
        })
        response.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60,
            path: "/",
        })
        return response;
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: error.message,
        }, { status: 400 });
    }

}

export const logout = async () => {
    try {
        const response = NextResponse.json({
            success: true,
            message: "Logout successful",
        })
        response.cookies.set("token", "", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
            expires: new Date(0),
            path: "/",
        })

        return response;
    } catch (error) {
        console.log(error.message)
    }
}

export const isLoggedIn = async (req) => {
    try {
        return NextResponse.json({
            success: true,
            message: `account authticated`
        })
    } catch (error) {
        console.log(error.message)
    }
}

export const sentVerifyOTPtoMail = async (userid) => {
    try {
        const user = await Usermodel.findById(userid)
        if (user.isVerified) {
            return NextResponse.json({
                success: false,
                message: 'user is already verified'
            })
        }
        const otp = String(Math.floor(100000 + Math.random() * 900000))
        user.verificationOtp = otp
        user.verificationOtpExpireAt = Date.now() + 1 * 60 * 60 * 1000
        const currentTime = format(new Date(), "yyyy-MM-dd HH:mm:ss");
        const expiryTime = format(new Date(user.verificationOtpExpireAt), "yyyy-MM-dd HH:mm:ss");
        await user.save()
        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: `account varification otp`,
            text: `Your OTP is ${otp}. It is valid from ${currentTime} to ${expiryTime}.`
        }
        await transporter.sendMail(mailOptions)
        return NextResponse.json({
            success: true,
            message: `verification message sent on ${user.email}`
        })
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message });
    }
}


export const receiveOTPfromUser = async (userid, req) => {
    try {
        const { otp } = await req.json()
        if (!otp || !userid) {
            return NextResponse.json({
                success: false,
                message: `invalied data`
            })
        }
        const user = await Usermodel.findById(userid)
        if (!user) {
            return NextResponse.json({
                success: false,
                message: `no user found`
            })
        }
        if (user.verificationOtp === `` || `${user.verificationOtp}` !== `${otp}`) {
            return NextResponse.json({
                success: false,
                message: `invalied otp ${otp} please re-check your otp`
            })
        }
        if (user.verificationOtpExpireAt < Date.now()) {
            return NextResponse.json({
                success: false,
                message: `otp expired`
            })
        }
        user.isVerified = true
        user.verificationOtp = ``
        user.verificationOtpExpireAt = 0

        await user.save()
        return NextResponse.json({
            success: true,
            message: `email verified succesfully`
        })
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: 'error to sent otp'
        })
    }
}


export const generateResetToken = async (email) => {
    try {
        const user = await Usermodel.findOne({ email })
        if (!user) {
            return NextResponse.json({
                success: false,
                message: `no user found`
            })
        }
        const token = crypto.randomBytes(32).toString('hex')
        user.resetToken = token
        user.resetTokenExpireAt = Date.now() + 5 * 60 * 1000
        await user.save()
        const baseUrl =
            process.env.NODE_ENV === "development"
                ? "http://localhost:3000"
                : "https://foodwaste-ten.vercel.app"

        const resetUrl = `${baseUrl}/reset-password/${token}`

        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: "Reset your password (expires in 5 minutes)",
            text: `You requested a password reset for ${email}.
                        This link will expire in 5 minutes.
                        Reset link: ${resetUrl}
                        If you didn't request this, you can ignore this email.`,

            html: `<div style="font-family:Arial,Helvetica,sans-serif;max-width:560px;margin:0 auto;padding:24px;background:#0E1724;color:#ffffff;">
                            <h2 style="margin:0 0 12px;font-size:22px;color:#ffffff;">Password reset requested</h2>
                            <p style="margin:0 0 12px;line-height:1.6;color:#cccccc;">
                            Hi, <strong>${email}</strong><br/>
                            Your request to reset the password will <strong>expire in 5 minutes</strong>.
                            </p>

                            <p style="margin:0 0 18px;line-height:1.6;color:#cccccc;">
                            Click the button below to reset your password:
                            </p>

                            <p style="text-align:center;margin:0 0 22px;">
                            <a href="${resetUrl}" 
                                style="display:inline-block;padding:12px 18px;text-decoration:none;border-radius:12px;background:#BB71FF;color:#ffffff;font-weight:600;">
                                Reset Password
                            </a>
                            </p>

                            <p style="margin:0 0 12px;line-height:1.6;color:#cccccc;">
                            Or copy & paste this link in your browser:<br/>
                            <a href="${resetUrl}" style="color:#BB71FF;word-break:break-all;">${resetUrl}</a>
                            </p>

                            <hr style="border:none;height:1px;background:#2a324a;margin:22px 0;" />

                            <p style="margin:0;line-height:1.6;color:#8f9bb3;font-size:13px;">
                            If you didn’t request this, please ignore this email. 
                            For your security, this link works only once and expires in 5 minutes.
                            </p>
                        </div>
                        `,
        }

        await transporter.sendMail(mailOptions)
        return NextResponse.json({
            success: true,
            message: `a confirmation email has been sent to ${email}. follow the instruction to reset your password `
        })
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: `server error`
        })
    }
}

export const updatePassword = async (token, password) => {
    try {
        const user = await Usermodel.findOne({ resetToken: token, resetTokenExpireAt: { $gt: Date.now() } })
        if (!user) {
            return NextResponse.json({
                success: false,
                message: `no token found or it has expired`
            })
        }
        
        user.password = await bcrypt.hash(password, 10)
        user.resetToken = ""
        user.resetTokenExpireAt = 0
        await user.save()
        return NextResponse.json({
            success: true,
            message: 'password reset successfully'
        })
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: `server error`
        })
    }
}