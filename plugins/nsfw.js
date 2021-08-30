const fs = require("fs");
const {
    MessageType
} = require("@adiwajshing/baileys");
const {
    text,
   
} = MessageType;
const {
    ai
} = require("./deepai");
const nsfw = (infor4, client, brazuka3) =>

    new Promise(async (resolve, reject) => {
        let infor5 = { ...infor4};
        let brazuka = {...brazuka3};
        const content = JSON.stringify(brazuka.message);
        const type = Object.keys(brazuka.message)[0];
        const isMedia = type === "imageMessage" || type === "videoMessage";
        const isQuotedImage =
            type === "extendedTextMessage" && content.includes("imageMessage");
        const isQuotedVideo =
            type === "extendedTextMessage" && content.includes("videoMessage");
     const getRandom = (ext) => {
            return `${Math.floor(Math.random() * 10000)}${ext}`;
        };
        if ((isMedia && !brazuka.message.videoMessage) || isQuotedImage) {
            const encmedia = isQuotedImage ?
                JSON.parse(JSON.stringify(brazuka).replace("quotedM", "m")).message
                    .extendedTextMessage.contextInfo :
                brazuka;
            const media = await client.downloadAndSaveMediaMessage(encmedia);
            ran = getRandom(".webp");
            ai(media).then((result) => {
                let zz = result.output.detections.length !== 0 ? "\n👙 *Detections* :\n" : " "
                let nsfw = "🔞 *Probability* :  ```" + (result.output.nsfw_score * 100).toFixed(1) + "%```\n" + zz;
                result.output.detections.forEach(function (element) {
                    nsfw = nsfw+ "\nName : " + element.name + "\n" +
                        "Confidence : " + (element.confidence * 100).toFixed(0) + " %\n";
                })

                client.sendMessage(infor5.from, nsfw, text, {
                    quoted: brazuka
                });
                resolve();
                fs.unlinkSync(media);

            }).catch((err) => {
                console.log(err);
                client.sendMessage(infor5.from, "🤖 ```Error```", text, {
                    quoted: brazuka
                });
            });



        }
        else if ((isMedia && brazuka.message.videoMessage) || isQuotedVideo) {
            client.sendMessage(infor5.from, "🤖 ```Cannot test on video currently.```", text, {
                quoted: brazuka
            });
        }
        else {
            client.sendMessage(infor5.from, "🤖 ```Tag the image or send it with the command.```", text, {
                quoted: brazuka
            });
        }


    })



module.exports.nsfw = nsfw;