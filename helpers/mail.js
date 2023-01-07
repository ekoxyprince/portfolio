const nodemailer = require("nodemailer");

module.exports = function sendMail (mailOptions,cb){
    let transport = nodemailer.createTransport({
        host: "mail.astrodev.com.ng",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL, // generated ethereal user
            pass: process.env.EMAIL_PASS, // generated ethereal password
        },
        tls: {
            rejectUnauthorized: false,
        }
    });
    let mail = transport.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error)
        } else {
            console.log("Message sent: %s", info.messageId);
            cb("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        }
    })
}