const { MessageEmbed } = require("discord.js");
const moment = require('moment');
const { genEmbed } = require("../../../../Global/Init/Embed");
require('moment-duration-format');
require('moment-timezone');

module.exports = {
    Isim: "yetkipuan",
    Komut: ["altyetkipuan","yetkipuanekle"],
    Kullanim: "yetkipuan <@sehira/ID> <Puan>",
    Aciklama: "Belirlenen üyeyi terfi sistemine senkronize eder.",
    Kategori: "kurucu",
    Extend: false,
    
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
    if(!ayarlar.staff.includes(message.member.id) && !roller.kurucuRolleri.some(oku => message.member.roles.cache.has(oku))) return;
    let kullArray = message.content.split(" ");
    let kullArgs = kullArray.slice(0);
    let uye = message.mentions.members.first() || message.guild.members.cache.get(kullArgs[1]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === kullArgs.slice(1).join(" ") || x.user.username === kullArgs[1])
    if(!uye) return message.react(message.guild.emojiGöster(emojiler.Iptal))
    if(!uye.user.username.includes(ayarlar.tag)) return message.react(message.guild.emojiGöster(emojiler.Iptal))
    if(message.author.id === uye.id) return message.react(message.guild.emojiGöster(emojiler.Iptal))
    let yetkiKodu = parseInt(args[1]);
    if(isNaN(yetkiKodu)) return message.react(message.guild.emojiGöster(emojiler.Iptal))
    await client.Upstaffs.addPoint(uye.id, yetkiKodu, "Bonus")
    message.send.channel({embeds: [new genEmbed().setColor("DARK_GOLD").setDescription(`${message.guild.emojiGöster(emojiler.Icon)} ${uye} isimli kişiye vermek istediğiniz puanı belirtin. İşlemi iptal etmek için (**iptal**) yazabilirsiniz. (**Süre**: \`30 Saniye\`)`)],components: []})
    var isimfilter = m => m.author.id == message.member.id
    let col = msg.channel.createMessageCollector({filter: isimfilter, time: 30000, max: 1, errors: ["time"]})


    message.guild.kanalBul("terfi-log").send({embeds: [embed.setDescription(`${message.member} (\`${message.member.id}\`) isimli yönetici ${uye} (\`${uye.id}\`) isimli üyeye \`${yetkiKodu}\` yetki bonusu ekledi.`)]});
    message.react(message.guild.emojiGöster(emojiler.Onay))
  }
};