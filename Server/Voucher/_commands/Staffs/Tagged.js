const { Client, Message, MessageButton, MessageActionRow } = require("discord.js");

const Users = require('../../../../Global/Databases/Schemas/Client.Users');
const { genEmbed } = require("../../../../Global/Init/Embed");
module.exports = {
    Isim: "taglı",
    Komut: ["tagaldır","tagli","tag"],
    Kullanim: "tag <@sehira/ID>",
    Aciklama: "Belirlenen üyeyi komutu kullanan üyenin taglısı olarak belirler.",
    Kategori: "stat",
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
    if(!roller.teyitciRolleri.some(oku => message.member.roles.cache.has(oku)) && !roller.Yetkiler.some(oku => message.member.roles.cache.has(oku)) && !roller.üstYönetimRolleri.some(oku => message.member.roles.cache.has(oku)) && !roller.kurucuRolleri.some(oku => message.member.roles.cache.has(oku)) && !roller.altYönetimRolleri.some(oku => message.member.roles.cache.has(oku)) && !roller.Yetkiler.some(oku => message.member.roles.cache.has(oku)) && !roller.yönetimRolleri.some(oku => message.member.roles.cache.has(oku)) && !message.member.permissions.has('ADMINISTRATOR')) return;
    let uye = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if(!uye) return;
    if(message.author.id === uye.id) return;
    if(!uye.user.username.includes(ayarlar.tag)) return;
    if(Date.now()-uye.user.createdTimestamp < 1000*60*60*24*7) return message.reply(cevaplar.yenihesap).then(x => {
      setTimeout(() => {
        x.delete()
      }, 7500);
    });
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
    let kontrol = await Users.findOne({_id: uye.id})
    if(kontrol && kontrol.Tagged) return message.channel.send(`${cevaplar.prefix} ${uye} isimli üye zaten bir başkası tarafından taglı olarak belirlenmiş.`);
    let msg = await message.channel.send({content: uye.toString(), embeds: [embed.setDescription(`${message.member.toString()} isimli yetkili seni taglı olarak belirlemek istiyor. Kabul ediyor musun?`)], components: [Row]})
    var filter = (i) => i.user.id == uye.id
    let collector = msg.createMessageComponentCollector({filter: filter, time: 30000})
    collector.on('collect', async (i) => {
      if(i.customId == "kabulet") {
          await i.deferUpdate().catch(err => {})
          msg.delete().catch(err => {})
          message.react(message.guild.emojiGöster(emojiler.Onay))
          await Users.updateOne({ _id: uye.id }, { $set: { "Tagged": true, "TaggedGiveAdmin": message.member.id } }, { upsert: true }).exec();
          await Users.updateOne({ _id: message.member.id }, { $push: { "Taggeds": { id: uye.id, Date: Date.now() } } }, { upsert: true }).exec();
          message.channel.send({embeds: [embed.setDescription(`${message.guild.emojiGöster(emojiler.Onay)} ${uye.toString()} üyesi ${message.author} tarafından \`${tarihsel(Date.now())}\` tarihinde başarıyla taglı olarak belirledi!`)], components: []});
          let taglıLog = message.guild.kanalBul("taglı-log")
          if(taglıLog) taglıLog.send({embeds: [embed.setDescription(`${uye} isimli üye \`${tarihsel(Date.now())}\` tarihinde ${message.author} tarafından taglı olarak belirlendi.`)]})      
          client.Upstaffs.addPoint(message.member.id,_statSystem.points.tagged, "Taglı")
        } if(i.customId == "reddet") {
          await i.deferUpdate().catch(err => {})
          msg.delete().catch(err => {})
          message.channel.send({content: message.member.toString(), components: [],embeds: [embed.setDescription(`${message.guild.emojiGöster(emojiler.Iptal)} ${uye.toString()} üyesi, taglı belirleme teklifini reddetti!`)]});
          message.react(message.guild.emojiGöster(emojiler.Iptal))
      }    
 });
 collector.on('end', async (i) => {
  i.delete()
  let RowTwo = new MessageActionRow().addComponents(
      new MessageButton()
      .setCustomId("kabulet")
      .setLabel("Zaman Aşımı!")
      .setEmoji(message.guild.emojiGöster(emojiler.Iptal))
      .setStyle("SECONDARY")
      .setDisabled(true),
  )  
      if (msg) embed.setColor("RED"),msg.reactions.removeAll(),message.react(message.guild.emojiGöster(emojiler.Iptal))
      if (msg) msg.edit({content: message.member.toString(), embeds: [embed.setDescription(`${uye.toString()}, 30 saniye boyunca cevap vermediği için işlem iptal edildi.`)], components: [RowTwo] });
      if (msg) {
        setTimeout(() => {
          msg.delete().catch()
        }, 10000);
      }
});

    }
};