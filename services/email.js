const Mailgen = require("mailgen");
require("dotenv").config();

class EmailService {
  constructor(env, sender) {
    this.sender = sender;
    switch (env) {
      case "development":
        this.link = "http://localhost:3000";
        break;
      case "production":
        this.link = "link for production";
        break;
      default:
        this.link = "http://localhost:3000";
        break;
    }
  }
  //создали генератор
  #createTemplateVerificationEmail(verifyToken, email) {
    const mailGenerator = new Mailgen({
      theme: "cerberus",
      product: {
        name: "Lova Company",
        link: this.link,
      },
    });

    //создаем то, что должно быть в тексте письма
    const emailSend = {
      body: {
        email,
        intro: "Welcome to Lova Company! We are very excited to have you on board.",
        action: {
          instructions: "To get started with Lova Company, please click here:",
          button: {
            color: "#22BC66", // Optional action button color
            text: "Confirm your account",
            link: `${this.link}/api/users/verify/${verifyToken}`,
          },
        },
        outro: "Need help, or have questions? Just reply to this email, we'd love to help.",
      },
    };
    //возвращаем сгенерированное письмо
    return mailGenerator.generate(emailSend);
  } 
  async sendVerifyEmail(verifyToken, email) {
    const emailHtml = this.#createTemplateVerificationEmail(verifyToken, email);
    const msg = {
      to: email,
      subject: "Verify your account",
      html: emailHtml,
    };
    const result = await this.sender.send(msg);
    console.log(result);
  }
}

module.exports = EmailService;
