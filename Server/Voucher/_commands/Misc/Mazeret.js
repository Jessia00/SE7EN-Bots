const { Client, Message, MessageEmbed, MessageActionRow, MessageButton} = require("discord.js");
const { genEmbed } = require("../../../../Global/Init/Embed");
module.exports = {
    Isim: "mazeret",
    Komut: ["mazeretbildir"],
    Kullanim: "mazeret <sebep>",
    Aciklama: "Toplantı için Mazeret belirtirsiniz.",
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
    let uye = message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.member
    let platform = { web: `\`İnternet Tarayıcısı\` ${message.guild.emojiGöster(emojiler.web)}`, desktop: `\`PC (App)\` ${message.guild.emojiGöster(emojiler.bilgisayar)}`, mobile: `\`Mobil\` ${message.guild.emojiGöster(emojiler.telefon)}` }
    let bilgi;
    let şüphe;
    if(uye.presence && uye.presence.status !== 'offline') { bilgi = `\`•\` Bağlandığı Cihaz: ${platform[Object.keys(uye.presence.clientStatus)[0]]}` } else { bilgi = `Bağlandığı Cihaz: **Çevrimdışı** ${message.guild.emojiGöster(emojiler.offline)}`}
    if(!roller.altYönetimRolleri.some(oku => message.member.roles.cache.has(oku)) && !roller.üstYönetimRolleri.some(oku => message.member.roles.cache.has(oku)) && !roller.yönetimRolleri.some(oku => message.member.roles.cache.has(oku)) && !roller.Yetkiler.some(oku => message.member.roles.cache.has(oku)) ) return message.channel.send(`Hata: **${ayarlar.serverName}** sunucusun da yetkili olmadığın için bu komutu kullanamazsın.`).then(x => setTimeout(() => {
        x.delete()
    }, 5000))
    let açıklama = args.splice(0).join(" ");
    if(!açıklama) return message.channel.send(`Hata: \`Lütfen yetkili Mazeret için açıklamanızı yazın.\``);
    message.channel.send(`${message.guild.emojiGöster(emojiler.Onay)} Mazeretiniz üst yetkililere iletildi en kısa zamanda sonuçlanacaktır.`).then(x => setTimeout(() => {
        x.delete()
    }, 5000))
    message.guild.kanalBul("mazeretler").send({ content: `<@&${roller.kurucuRolleri}>`,  embeds: [embed.setDescription(`${message.author} kişisinin mazeret detayı`).addField(`__**Kullanıcı Bilgisi**__`, `ID: \`${message.author.id}\`
Oluşturulma Tarihi: \`${tarihsel(message.member.createdAt)}\`
Katılım Tarihi: \`${tarihsel(message.member.joinedAt)}\`
${bilgi}
Mazeret Tarihi: \`${tarihsel(Date.now())}\`
`).addField(`__**Kullanıcı Açıklaması**__`, `\`${açıklama}\``)]})
    message.react(emojiler.Onay)



  } 
};