const { Client, Message, MessageButton, MessageActionRow, MessageSelectMenu } = require("discord.js");
const Users = require('../../../../Global/Databases/Schemas/Client.Users');
const Coins = require('../../../../Global/Databases/Schemas/Coins');
const moment = require("moment");
const { genEmbed } = require("../../../../Global/Init/Embed");
require("moment-duration-format");
module.exports = {
    Isim: "profil",
    Komut: ["me", "info"],
    Kullanim: "profil <@sehira/ID>",
    Aciklama: "Belirlenen kişinin veya kullanan kişinin sunucu içerisindeki detaylarını ve discord içerisindeki bilgilerini aktarır.",
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
  let kullanici = message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.member;
  if(!kullanici) return message.channel.send(cevaplar.üyeyok);;
  let uye = message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.member
  if(!uye) return message.channel.send(cevaplar.üyeyok);
  if(kullanici.bot) return message.channel.send(`${cevaplar.prefix} \`Kullanıcı BOT\` belirtilen kullanıcı bot olduğu için işlem iptal edildi.`);
  // Coin komutu başlangıç
  
  // Coin komutu son
  uye = message.guild.members.cache.get(kullanici.id)
  kullanici = message.guild.members.cache.get(uye.id)
  let yetkiliKullanim = await Users.findOne({ _id: uye.id })
  let cezapuanoku = await message.guild.members.cache.get(uye.id).cezaPuan() 
  let platform = { web: `\`İnternet Tarayıcısı\` ${message.guild.emojiGöster(emojiler.web)}`, desktop: `\`PC (App)\` ${message.guild.emojiGöster(emojiler.bilgisayar)}`, mobile: `\`Mobil\` ${message.guild.emojiGöster(emojiler.telefon)}` }
  let bilgi;
  let uyesesdurum;
  let yetkiliDurum;
  let menü = new MessageActionRow().addComponents(
    new MessageSelectMenu()
    .setCustomId("menü")
    .setPlaceholder(`${uye.user.tag}'nin detaylarını görüntüle`)
    .addOptions( 
      { label: "İstatistikler", description: "", value: "stat", emoji: { "name": "chatMute", "id": "962112364944191499" }},
      { label: "Ekonomi Bilgi", description: "", value: "ekonomi", emoji: { "name": "chatMute", "id": "962112364944191499" }},
      { label: "Cezalar", description: "", value: "sicil", emoji: { "name": "chatMute", "id": "962112364944191499" }},
      { label: "İptal", description: "", value: "iptal", emoji: { "name": "chatMute", "id": "947548354756370472" }},

    )
  )
  if(uye.presence && uye.presence.status !== 'offline') { bilgi = `\`•\` Bağlandığı Cihaz: ${platform[Object.keys(uye.presence.clientStatus)[0]]}` } else { bilgi = `Bağlandığı Cihaz: **Çevrimdışı** ${message.guild.emojiGöster(emojiler.offline)}`}

const embed = new genEmbed().setAuthor(kullanici.user.tag, kullanici.user.avatarURL({dynamic: true, size: 2048})).setThumbnail(kullanici.user.avatarURL({dynamic: true, size: 2048}))
.addField(`${message.guild.emojiGöster(emojiler.Terfi.icon)} Kullanıcı Bilgisi`,
  `\`•\` ID: \`${kullanici.id}\`
  \`•\` Profil: ${kullanici}
  \`•\` Oluşturulma Tarihi: ${global.timeTag(Date.parse(kullanici.user.createdAt))}
  ${bilgi}
  \`•\` Ceza Puanı: \`${cezapuanoku}\`
  \`•\` Katılma Tarihi: ${global.timeTag(Date.parse(uye.joinedAt))}
  \`•\` Katılım Sırası: \`${(message.guild.members.cache.filter(a => a.joinedTimestamp <=uye.joinedTimestamp).size).toLocaleString()}/${(message.guild.memberCount).toLocaleString()}\`
  \`•\` Rolleri (\`${uye.roles.cache.size - 1 >= 0 ? uye.roles.cache.size - 1 : 0}\`): ${uye.roles.cache.filter(x => x.name !== "@everyone").map(x => x).join(', ')}
  ${yetkiliKullanim ? yetkiliKullanim.Registrant ? `\`•\` Kayıt Eden Yetkili: ${message.guild.members.cache.get(yetkiliKullanim.Registrant) ? message.guild.members.cache.get(yetkiliKullanim.Registrant)  : `<@${yetkiliKullanim.Registrant}>`} `:"" :""}`)
    if(await uye.voice.channel) {
      uyesesdurum = `\`•\` Bulunduğu Kanal: ${uye.voice.channel}`
      uyesesdurum += `\n\`•\` Mikrofon Durumu: \`${uye.voice.selfMute ? '❌' : '✅'}\``
      uyesesdurum += `\n\`•\` Kulaklık Durumu: \`${uye.voice.selfDeaf ? '❌' : '✅'}\``
      if(uye.voice.selfVideo) uyesesdurum += `\n\`•\` Kamera Durumu: \`✅\``
      if(uye.voice.streaming) uyesesdurum += `\n\`•\` Yayın Durumu: \`✅\``
      embed.addField(`${message.guild.emojiGöster(emojiler.Terfi.icon)} __**Sesli Kanal Bilgisi**__`, uyesesdurum);
    }
  if(roller.Yetkiler.some(x => uye.roles.cache.has(x)) || roller.kurucuRolleri.some(oku => uye.roles.cache.has(oku)) || uye.permissions.has('ADMINISTRATOR')) {
    if(yetkiliKullanim && yetkiliKullanim.Uses) {
      let uyari = yetkiliKullanim.Uses.Warns || 0
      let chatMute = yetkiliKullanim.Uses.Mutes || 0
      let sesMute = yetkiliKullanim.Uses.VoiceMute || 0
      let Kick = yetkiliKullanim.Uses.Kick || 0
      let ban = yetkiliKullanim.Uses.Ban || 0
      let jail = yetkiliKullanim.Uses.Jail || 0
      let forceban = yetkiliKullanim.Uses.Forceban || 0
      let toplam = uyari+chatMute+sesMute+Kick+ban+jail;
      yetkiliDurum = `toplam \`${toplam}\` yetki komutu kullanmış.\n(**${uyari}** uyarma, **${chatMute}** chat mute, **${sesMute}** ses mute, **${jail}** jail)\n(**${Kick}** atma, **${ban}** yasaklama, **${forceban}** kalkmaz yasaklama)`;
      embed.addField(`${message.guild.emojiGöster(emojiler.Terfi.icon)} **Yetki Kullanım Bilgisi**`, yetkiliDurum);
    }
  }
 
  let msg = await message.channel.send({embeds: [embed], components: [menü]});
  const filter = i => i.user.id == message.member.id 
  const collector = msg.createMessageComponentCollector({ filter, time: 30000 });

  collector.on('collect', async i => {
    if (i.values[0] === `stat`) {
      msg.delete().catch(err => {})
       let kom = client.commands.find(x => x.Isim == "stat")
                    kom.onRequest(client, message, args)
                    i.deferUpdate()
    }
  })

    collector.on('collect', async i => {
      if (i.values[0] === `ekonomi`) {
        msg.delete().catch(err => {})
         let kom = client.commands.find(x => x.Isim == "coin")
                      kom.onRequest(client, message, args)
                      i.deferUpdate()
      }
    })

    collector.on('collect', async i => {
      if (i.values[0] === `sicil`) {
          msg.delete().catch(err => {})
         let kom = client.commands.find(x => x.Isim == "cezalar")
                      kom.onRequest(client, message, args)
                      i.deferUpdate()
      }
    })

    collector.on('collect', async i => {
      if (i.values[0] === `iptal`) {
          msg.delete().catch(err => {})
      }
    })


    collector.on('end', async (i) => {
        await msg.edit({components: []}) 
    })

    }
  };