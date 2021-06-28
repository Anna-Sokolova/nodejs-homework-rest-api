const sgMail = require("@sendgrid/mail");
require("dotenv").config();

class CreateSenderSendGrid {
  async send(msg) {
    sgMail.setApiKey(process.env.SEND_GRID_API_KEY);
    return await sgMail.send({ ...msg, from: "Lova Company <sokolovaskorik@gmail.com>" });
  }
}

module.exports = CreateSenderSendGrid;
