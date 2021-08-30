const path = require("path");
const fs = require("fs");
const {
  MessageType
} = require("@adiwajshing/baileys");
const faq = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../data/faq.json"))
);
msgl = "🤖🤖 *brazuka-BOT FAQs* 🤖🤖\n\n";
const faqs = (infor4, client, brazuka3) =>
  new Promise((resolve, reject) => {
    let infor5 = { ...infor4 };
    let brazuka = { ...brazuka3 };

    faq.forEach((element) => {
     
      msgl +=
        "🤔 *" +
        element.question +
        "*\n" +
        "😐 ```" +
        element.answer +
        "```\n\n\n";
    });
    client.sendMessage(infor5.from, msgl, MessageType.text, {
      quoted: brazuka,
    });
    resolve();
  });
module.exports.faqs = faqs;
