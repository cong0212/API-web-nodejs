require('dotenv').config();
const nodemailer = require("nodemailer");

let sendEmail = async (dataSend) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            // TODO: replace `user` and `pass` values from <https://forwardemail.net>
            user: process.env.EMAIL_APP,
            pass: process.env.EMAIL_APP_PASSWORD,
        },
    });

    // async..await is not allowed in global scope, must use a wrapper

    // send mail with defined transport object
    const info = await transporter.sendMail({
        from: '"Cong dep trai 👻" <foo@example.com>', // sender address
        to: dataSend.reciverEmail, // list of receivers
        subject: "Information booking", // Subject line
        html: getBodyHTMLEmail(dataSend), // html body
    });
}

let getBodyHTMLEmail = (dataSend) => {
    let result = ''
    result = `
    <h3>Hello ${dataSend.patientName}</h3>
    <p>Information booking: </p>
    <div>Time: ${dataSend.time}</div>
    <div>Doctor: ${dataSend.doctorName}</div>
    <div>Click confirm</div>
    <a href="${dataSend.redirectLink}">Click me</a>
    
    <div>Thanks you!</div>
    `

    return result
}

let getBodyHLTMLRemedy = (dataSend) => {
    let result = ''
    result = `
    <h3>Hello ${dataSend.patientName}</h3>
    <p>You have successfully scheduled your appointment</p>
    <p>Prescription information is sent in the attached file</p>
    
    <div>Thanks you!</div>
    `

    return result

}

let sendAttachment = async (dataSend) => {
    return new Promise(async (resolve, reject) => {
        try {
            const transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 465,
                secure: true,
                auth: {
                    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
                    user: process.env.EMAIL_APP,
                    pass: process.env.EMAIL_APP_PASSWORD,
                },
            });

            // async..await is not allowed in global scope, must use a wrapper

            // send mail with defined transport object
            const info = await transporter.sendMail({
                from: '"Cong dep trai 👻" <foo@example.com>', // sender address
                to: dataSend.email, // list of receivers
                subject: "Result booking", // Subject line
                html: getBodyHLTMLRemedy(dataSend), // html body
                attachments: [
                    {
                        filename: `remedy-${dataSend.patientID}-${new Date().getTime()}.png`,
                        content: dataSend.imgBase64.split("base64,")[1],
                        encoding: 'base64'
                    }
                ]
            });

            resolve(true)
        } catch (e) {
            reject(e)
        }
    })
}


module.exports = {
    sendEmail, sendAttachment
}