const nodemailer = require('nodemailer');
// import nodemailer from "nodemailer";
require('dotenv').config()

const sendEmail = (options:any) => {
    const transporter = nodemailer.createTransport({
        service: process.env.EMAIL_SERVICE,
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD,
        }
    })

    const mailOptions = {
        from: process.env.EMAIL_FROM,
        to:  options.to,
        subject: options.subject,
        html: options.text,
    }

    transporter.sendMail(mailOptions, (err:any,info:any) => {
        if (err) {
            console.log(err)
        } else {
            console.log(info)
        }
    })
}

module.exports = sendEmail