const nodemailer = require("nodemailer")
const jwt = require('jsonwebtoken')

const {ACCESS_TOKEN_VERIFICATION} = process.env

const sendEmail = async (email) => {
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            service: 'gmail',
            port: 465,
            secure: true,
            auth: {
                user: 'fdevproject26@gmail.com',
                pass: 'pimm fsdz pleb fyoz',
            },
        });

        const token = jwt.sign({
                data: 'Token Data'
            }, ACCESS_TOKEN_VERIFICATION, {expiresIn: '10m'}
        );

        await transporter.sendMail({
            from: 'fdevproject26@gmail.com',
            to: email,
            subject: 'Email Verification',

            // This would be the text of email body
            text: `Hi! There, You have recently visited  
           our website and entered your email. 
           Please follow the given link to verify your email 
           http://localhost:3000/api/verify/${token}  
           Thanks`
        });
        console.log("email sent successfully");
    } catch (error) {
        console.log("email not sent");
        console.log(error);
    }
};

module.exports = sendEmail;