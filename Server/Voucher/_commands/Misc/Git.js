const { Client, Message, MessageEmbed, MessageActionRow, MessageButton} = require("discord.js");
const { genEmbed } = require("../../../../Global/Init/Embed");
module.exports = {
    Isim: "git",
    Komut: ["git", "izinligit"],
    Kullanim: "izinligit @sehira/ID",
    Aciklama: "Belirlenen üyeye izin ile yanına gider.",
    Kategori: "diğer",
    Extend: true,
    
   /**
   * @param {Client} client 
   */
  onLoad: function (client) {

  },

   /**
   * @param {Client} client 
   * @param {Message} message 
   * @param {Array<String>} args 
   */

  onRequest: async function (client, message, args) {
    let embed = new genEmbed()
    let uye = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if (!message.member.voice.channel) return message.reply(`${cevaplar.prefix} Bir ses kanalında olman lazım.`).then(x => { setTimeout(() => {x.delete() }, 7500)});
    if (!uye) return message.reply(`${cevaplar.prefix} Bir üye belirtmelisin.`).then(x => { setTimeout(() => { x.delete() }, 7500)});
    if (message.member.id === uye.id) return message.reply(`${cevaplar.prefix} Kendinin yanına da gitmezsin!`).then(x => { setTimeout(() => { x.delete() }, 7500)});
    if (message.member.voice.channel === uye.voice.channel) return message.reply(`${cevaplar.prefix} Belirttiğin üyeyle aynı kanaldasın!`).then(x => { setTimeout(() => { x.delete() }, 7500)});
    // if (!member.voice.channel) return message.reply(`${cevaplar.prefix} Belirtilen üye herhangi bir ses kanalında değil!`).then(x => { setTimeout(() => { x.delete() }, 7500)});
    if (uye.user.bot) return message.reply(cevaplar.bot).then(x => { setTimeout(() => {x.delete() }, 7500)});
    if (message.member.permissions.has('ADMINISTRATOR') || roller.kurucuRolleri.some(x => message.member.roles.cache.has(x))) {
        message.react(message.guild.emojiGöster(emojiler.Onay)).catch(err => {})
        await message.member.voice.setChannel(uye.voice.channel.id).catch(err => {})
        return message.channel.send({embeds: [embed.setDescription(`${message.guild.emojiGöster(emojiler.Onay)} ${message.member} isimli yetkili ${uye} (\`${uye.voice.channel.name}\`) isimli üyenin odasına gitti!`)]}).then(x => setTimeout(() => {
            x.delete()
        }, 7500))
    }
    let Row = new MessageActionRow().addComponents(
        new MessageButton()
        .setCustomId("kabulet")
        .setLabel("Kabul Et")
        .setEmoji(message.guild.emojiGöster(emojiler.Onay))
        .setStyle("SECONDARY"),
        new MessageButton()
        .setCustomId("reddet")
        .setLabel("Reddet")
        .setEmoji(message.guild.emojiGöster(emojiler.Iptal))
        .setStyle("DANGER")
    )   
    
    let msg = await message.channel.send({ content: `${uye}`, embeds: [embed.setDescription(`${uye}, ${message.author} adlı üye \`${uye.voice.channel.name}\` adlı odanıza gelmek istiyor.\nKabul ediyor musun?`).setFooter("30 saniye içinde onaylanmazsa otomatik olarak iptal edilecektir.")], components: [Row], ephemeral: true })
        const filter = i => i.member.id === uye.id;
        const collector = msg.createMessageComponentCollector({ filter,  errors: ["time"], time: 30000 })

collector.on('collect', async i => {
    if (i.customId === 'kabulet') {
        msg.delete().catch(err => {})
        await uye.voice.setChannel(message.member.voice.channel.id);
            message.channel.send({ content: `${message.guild.emojiGöster(emojiler.Onay)} ${message.author}, ${uye} isimli üye senin odana gelme isteğini kabul etti.` })
            .then(x => setTimeout(() => {
                x.delete()
            }, 7500))
            message.react(message.guild.emojiGöster(emojiler.Onay));
        }  
        if (i.customId === 'reddet') {
            msg.delete().catch(err => {})
            message.channel.send({ content: `${message.guild.emojiGöster(emojiler.Iptal)} ${message.author}, ${uye} isimli üye senin odana gelme isteğini onaylamadı.` }).then(x => setTimeout(() => {
                x.delete()
            }, 7500))
            message.react(message.guild.emojiGöster(emojiler.Iptal));
        }
    });
    collector.on("end", async (collected, reason) => {
        if (reason === "time") {
            if (msg) msg.delete().catch(err => { });
            message.reply({ content: `${uye}, 30 saniye boyunca cevap vermediği için işlem iptal edildi.`}).then(x => setTimeout(() => {
                x.delete()
            }, 7500))
        }
    });

    }
};