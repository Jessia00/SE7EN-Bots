const { Client, Message, MessageEmbed} = require("discord.js");
const { genEmbed } = require('../../../../Global/Init/Embed')

module.exports = {
    Isim: "embedyazma",
    Komut: ["embedyaz"],
    Kullanim: "",
    Aciklama: "",
    Kategori: "-",
    
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
    let yazı = args.slice(0).join(' ');
    if(!yazı) return message.channel.send(`Hata: \`Lütfen İçerik Belirleyin!\``);
    message.channel.send({embeds: [embed.setDescription(`${yazı}`)]})
    message.delete() 
  }
};