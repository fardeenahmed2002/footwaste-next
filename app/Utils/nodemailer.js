import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for port 465, false for other ports
    auth: {
        user: `fardeenahamed2002@gmail.com`,
        pass: process.env.SMTP_PASSWORD,
    },
});

export default transporter
