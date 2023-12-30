const nodemailer = require("nodemailer")

const sendEmail = async (email, code) => {
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


        await transporter.sendMail({
            from: 'fdevproject26@gmail.com',
            to: email,
            subject: 'Email Verification',

            // This would be the text of email body
            text: `Hello this is your code ${code}`
        });
        console.log("email sent successfully");
    } catch (error) {
        console.log("email not sent");
        console.log(error);
    }
};

module.exports = sendEmail;