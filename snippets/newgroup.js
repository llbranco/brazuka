const {
  MessageType
} = require("@adiwajshing/baileys");
const {
  text
} = MessageType;
const getGroupAdmins = (participants) => {
  admins = [];
  for (let i of participants) {
    i.isAdmin ? admins.push(i.jid) : "";
  }
  return admins;
};
const newgroup = (from,client,random) =>
  new Promise(async (resolve, reject) => {
    const groupMetadata = await client.groupMetadata(from);
    const groupMembers = groupMetadata.participants;
    const groupAdmins = getGroupAdmins(groupMembers);
    var newmsg =
      "??????  *brazuka ?? BOT*  ??????\n\n" +
      "?š¨ *Prefix assigned is* " +
      random +
      "\n\n?š¨ *The bot will only listen to commands starting with* " + random +"\n\n"+
      "?š¨ ```Type``` "+"```"+random+"```"+"```help to see the list of commands bot can follow.```\n\n"+
      "?? *Example:* \n"+
      "?? ```" + random + "```" + "```help```\n" +
      "?Ž¡ ```" + random + "```" + "```sticker crop```\n" +
      "?Žª ```" + random + "```" + "```rs```\n" +     
      "?Ž¢ ```" + random + "```" + "```crypto btc```\n" +      
      "?Ž« ```" + random + "```" + "```limit```\n"       
    // + "?? ```" + random + "```" + "```market details tcs```\n\n"; +"?‘® ```Admins:```\n"  
      index = 0;
      for (let admin of groupAdmins) {
        index += 1;
        newmsg += `\n@${admin.split("@")[0]}`;
      }
  
    client.sendMessage(from, newmsg, text, {
      contextInfo: {
        mentionedJid: admins,
      },
    });
    resolve()
  });
module.exports.newgroup=newgroup;