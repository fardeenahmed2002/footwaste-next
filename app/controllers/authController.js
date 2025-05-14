import { NextResponse } from "next/server.js"
import { Usermodel } from "../Models/User.js"
import bcrypt from 'bcryptjs'
import transporter from "../Utils/nodemailer.js"
import jwt from "jsonwebtoken"
export const signup = async (formData) => {
    const { name, email, password, contactNumber, address, noOfTeamMember, role, yourCollectingArea, ngoRegistrationNumber, collectorType, image = '', donorof, certificateimage = '' } = formData
    try {
        if (!name || !email || !password || !role || !contactNumber) {
            return NextResponse.json({
                message: `did not get data properly`,
                success: false
            })
        }
        const existinguser = await Usermodel.findOne({ email })
        const existingContactNumber = await Usermodel.findOne({ contactNumber })
        if (existinguser) {
            return NextResponse.json({
                message: `user already exist`,
                success: false
            })
        }
        if (existingContactNumber) {
            return NextResponse.json({
                message: `contact number already exist`,
                success: false
            })
        }
        const hashedpassword = await bcrypt.hash(password, 10)
        let user
        if (role === `user`) {
            if (!image) {
                return NextResponse.json({
                    message: 'upload your image',
                    success: false
                })
            }
            user = new Usermodel({
                name,
                email,
                password: hashedpassword,
                contactNumber,
                address,
                isUser: true,
                role: `user`,
                image
            })
        }
        else if (role === `donor`) {
            if (!donorof || !image) {
                return NextResponse.json({
                    message: `did not get data properly`,
                    success: false
                })
            }
            user = new Usermodel({
                name,
                email,
                password: hashedpassword,
                contactNumber,
                address,
                isDonor: true,
                role: `donor`,
                image,
                donorof
            })
        }
        else if (role === `collector`) {
            if (!certificateimage) {
                return NextResponse.json({
                    success: false,
                    message: 'your institutions certificate is missing'
                })
            }
            user = new Usermodel({
                name,
                email,
                password: hashedpassword,
                contactNumber,
                address,
                isCollector: true,
                role: `collector`,
                image,
                certificateimage,
                noOfTeamMember,
                yourCollectingArea,
                ngoRegistrationNumber,
                collectorType
            })
        }
        else {
            return NextResponse.json({
                message: `${role} role does not exist`,
                success: false
            })
        }
        await user.save()
        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: "Welcome to Website",
            text: `Welcome to our site! You have registered with ${email}.`
        };
        await transporter.sendMail(mailOptions);

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: `7d` })

        const response = NextResponse.json({
            message: `Login successful`,
            success: true,
            user,
            token
        });

        response.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
            maxAge: 7 * 24 * 60 * 60,
            path: "/",
        });

        return response;
    }
    catch (error) {
        return NextResponse.json({ success: false, message: error.message });
    }
}




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
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: `7d` })
        const response = NextResponse.json({
            message: `Login successful`,
            success: true,
            user,
            token
        })
        response.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
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
};

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