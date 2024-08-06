const nodemailer = require("nodemailer");

exports.sendEmail = async(options)=>{
    console.log(options.email);
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "gauravsharma16072001@gmail.com",
          pass: "pywgftwxkwbvbnns"
        }
      });
    const mailOptions = {
        from:"gauravsharma16072001@gmail.com",
        to:options.email,
        subject:options.subject,
        text:options.message
    }
    await transporter.sendMail(mailOptions)
}