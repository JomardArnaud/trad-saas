import nodemailer from 'nodemailer'

export async function sendEmail (email, subject, text) {
  const transporter = nodemailer.createTransport({
    service: process.env.SERVICE,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD
    }
  })
  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: subject,
    text: text
  }

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error)
      return { status: 'error', message: error }
    } else {
      console.log('Email sent: ' + info.response)
      return { status: 'success', message: `Email sent: ${info.response}` }
    }
  })
}
