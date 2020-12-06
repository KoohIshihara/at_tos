const nodemailer = require("nodemailer")

const gmailEmail = "appsocially.common@gmail.com"
const gmailPassword = "chatcenter"

// 送信に使用するメールサーバーの設定
const mailTransport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: gmailEmail,
    pass: gmailPassword
  }
})

const sendNotification = async (email, subject, text) => {
  console.log(`send ${text} \n`)
  // メール設定
  let adminMail = {
    from: gmailEmail,
    to: email,
    subject,
    text
  }

  // 管理者へのメール送信
  mailTransport.sendMail(adminMail, (err, info) => {
    if (err) {
      return console.error(`send failed. ${err}`)
    }
    return console.log("send success.")
  })
}

// sendNotification('ko.ishihara@chatcenter.io', 'title', 'body')

module.exports = sendNotification