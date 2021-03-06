const fs = require("fs");
const path = require("path");
const data = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../data/help.json"))
);
const { MessageType } = require("@adiwajshing/baileys");
const { text } = MessageType;

const help = (infor4, client, brazuka3,syntax) =>
  new Promise((resolve, reject) => {
    let infor5 = { ...infor4 };
    let brazuka = { ...brazuka3 };
    arg = infor5.arg;
    from = infor5.from;
    prefix = infor5.groupdata.prefix;
    useprefix = infor5.groupdata.useprefix;
    var msg;
    c = prefix == undefined ? "```Not needed in inbox```" : useprefix ? prefix : "```Disabled```";
    if (prefix == undefined || !useprefix) prefix = "š";

    if (arg.length == 1) {
      cas = infor5.number === process.env.OWNER_NUMBER ?
        "š§ *Owner only* :\n```rst : Reset daily session,\ndul : Change daily user limit,\ndgl : Change daily group limit,\nmgs : Minimum group size,\nsql : Database query,\nmdr : Add bot moderators,\nrtrt : Restart the bot,\nstp : Shutdown the bot```\n\n"
        : "";

      const grpcmds = infor5.groupdata == 0 ? "" :"š *Group Admin* :\n```groupinfo, promote, demote, kick, grouplink, botleave, setprefix, useprefix, autosticker, nsfw, close, open, tagall, ban, unban, banlist, filterabuse, botaccess```\n\n";
      msg =
        "š¤š¤š¤  *brazuka š¤ BOT*  š¤š¤š¤\n\nš” *Prefix:*  " +
        c +
        "\n\n" +
        "š *General* :\n ```help, faq, limit, delete, sourcecode, invite```\n\n" +
        grpcmds +
        "š± *Media* :\n```sticker, rs, ytv, shorturl, testnsfw, run, crypto, market, pin, rashmika```\n\n" +
        cas +
        "š *For detailed info :*\n" +
        prefix +
        "```help <command>```\n\n" +
        "š *Example* :\n" +
        prefix + "help crypto\n" +
        prefix + "help shorturl\n" +
        prefix + "help sticker\n" +
        prefix + "help autosticker\n" +
        prefix + "help run\n" +
        "\nš *Bot Updates* :" +
        "\nā¼ļø _NSFW detection added_" +
        "\nā¼ļø _groupinfo added_";

      client.sendMessage(from, msg, text, {
        quoted: brazuka,
      });
      resolve();
    } else {

      try {
        msg =
          syntax == undefined ? "š *Description* :\n" +
          data[arg[1]].desc : "ā¼ļø *Error* :\n```syntax error in the given command.```";
        msg += "\n\n" +
          "š *Usage* :\n" +
          prefix + "```" +
          data[arg[1]].usage +
          "```" +
          "\n\n" +
          "š *Example* :\n";
          data[arg[1]].eg.forEach(currentItem => {
            msg += "```" + prefix + currentItem + "```" + "\n";
          });
        client.sendMessage(from, msg, text, {
          quoted: brazuka,
          detectLinks: false

        });
        resolve();
      } catch (e) {
        client.sendMessage(
          from,
          "š¤ ```No such command:``` " + arg[1],
          text,
          {
            quoted: brazuka,
          }
        );
        resolve();
      }
    }
  });
module.exports.help = help;