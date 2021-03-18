const nodemailer = require("nodemailer");
var smtpTransport = require('nodemailer-smtp-transport');

let sendVerificationCodeMail = async (code , email) => {

    let transporter = nodemailer.createTransport(smtpTransport ({
        pool : true ,
        host : process.env.mail_host,
        service : process.env.mail_host ,
        port: process.env.mail_port ,
        secure: true, // true for 465, false for other ports
        auth: {
            user: process.env.mail_user , // generated ethereal user
            pass: process.env.mail_password // generated ethereal password
        },
        tls :{
            rejectUnauthorized :false
        }
    }));
    let info = await transporter.sendMail({

        from: ` "Pantry APP" ${process.env.mail_user} `, // sender address
        to: email , // list of receivers
        subject: "Pantry Account Verification", // Subject line
        text: "", // plain text body
        html: `<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>

    <div style="text-align: center;font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica,
    Arial, sans-serif;margin: 30px 0px">
    <img style="margin-bottom:30px;" src="https://live.yourpantryapp.com/uploads/pantry-logo.png"/>
    <p style="margin:0;font-size:14px;font-weight: 400;margin-bottom: 20px;">To verify your account, enter the code below in Pantry</p>
    <p style="margin:0;font-size: 32px;font-weight: 600;letter-spacing: 0.38px;margin-bottom: 20px;">${code}</p>
    <p style="margin:0;font-size:14px;font-weight: 400;margin-bottom:0;">This code expires in 48 hours. If you did not request </p>
    <p style="margin:0;font-size:14px;font-weight: 400;margin-bottom: 25px;">this code, you can ignore this message. </p>
    <p style="margin:0;font-size:14px;"> &copy; Pantry LLC</p>
 </div>
 

</body>
</html> `
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    return true ;

};


module.exports = {

    sendVerificationCodeMail
};
