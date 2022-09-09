const { Client, Message, MessageButton, MessageActionRow } = require("discord.js");
const Unleash = require('../../../../Global/Databases/Schemas/Plugins/Guıild.Remove.Staffs');
const Users = require('../../../../Global/Databases/Schemas/Client.Users');
const { genEmbed } = require("../../../../Global/Init/Embed");
module.exports = {
    Isim: "yetkibaşlat",
    Komut: ["ytbaşlat","ybaşlat","yetkiliyap","yetkili"],
    Kullanim: "yetkibaşlat <@sehira/ID>",
    Aciklama: "Belirlenen üyeyi yetkiye davet etmek için istek gönderirsin.",
    Kategori: "yönetim",
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
    if(!roller.üstYönetimRolleri.some(oku => message.member.roles.cache.has(oku)) && !roller.kurucuRolleri.some(oku => message.member.roles.cache.has(oku)) && !roller.altYönetimRolleri.some(oku => message.member.roles.cache.has(oku)) && !roller.yönetimRolleri.some(oku => message.member.roles.cache.has(oku)) && !message.member.permissions.has('ADMINISTRATOR')) return message.channel.send(cevaplar.noyt);
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
    let uye = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if(!uye) return message.reply(cevaplar.üye + ` \`${sistem.botSettings.Prefixs[0]}${module.exports.Isim} <@sehira/ID>\``);
    if(message.author.id === uye.id) return message.react(message.guild.emojiGöster(emojiler.Iptal)),message.reply(cevaplar.kendi).then(x => {
      setTimeout(() => {
        x.delete()
      }, 7500);
    });
    if(!uye.user.username.includes(ayarlar.tag)) return message.react(message.guild.emojiGöster(emojiler.Iptal)),message.reply(`${cevaplar.prefix} ${uye} isimli üyenin isminde \`${ayarlar.tag}\` sembolü bulunamadığından iptal edildi.`).then(x => {
      setTimeout(() => {
        x.delete()
      }, 7500);
    });
    if(roller.kayıtsızRolleri.some(x => uye.roles.cache.has(x))) return message.react(message.guild.emojiGöster(emojiler.Iptal)),message.react(message.guild.emojiGöster(emojiler.Iptal));
    if(Date.now()-uye.user.createdTimestamp < 1000*60*60*24*7 && !ayarlar.staff.includes(message.member.id)) return message.react(message.guild.emojiGöster(emojiler.Iptal)),message.reply(cevaplar.yenihesap).then(x => {
      setTimeout(() => {
        x.delete()
      }, 7500);
    });
    let yetkiSalma = await Unleash.findOne({_id: uye.id})
    if(yetkiSalma) {
      if(yetkiSalma.unleashPoint && yetkiSalma.unleashPoint == 1) {
        embed.setFooter(`${uye.user.tag} üyesi daha önce yetki salmış birdaha salarsa yetkili olamayacak.`)
      } else {
        embed.setFooter(`${uye.user.tag} üyesinin yetki salma hakkı ${yetkiSalma.unleashPoint ? yetkiSalma.unleashPoint : 0} adet bulunuyor.`)
      }
      if(yetkiSalma.unleashPoint >= 2 && !ayarlar.staff.includes(message.member.id)) {
        return message.channel.send({embeds: [new genEmbed().setFooter(`${yetkiSalma.unleashPoint} yetki salma hakkı bulunmakta.`).setDescription(`${message.guild.emojiGöster(emojiler.Iptal)} ${uye} isimli üyesi birden fazla kez yetki saldığından dolayı işlem yapılamıyor.`)]}).then(x => {
          setTimeout(() => {
            x.delete()
          }, 12500);
          message.react(message.guild.emojiGöster(emojiler.Iptal))
        })
      }
    }
    let kontrol = await Users.findOne({_id: uye.id})
    if(kontrol && kontrol.Staff) return message.channel.send(`${cevaplar.prefix} ${uye} isimli üye zaten yetkili olarak belirlenmiş.`);
    if(message.member.permissions.has('ADMINISTRATOR') || roller.kurucuRolleri.some(oku => message.member.roles.cache.has(oku)) || roller.üstYönetimRolleri.some(oku => message.member.roles.cache.has(oku))) {
        message.react(message.guild.emojiGöster(emojiler.Onay))
        await Users.updateOne({ _id: uye.id }, { $set: { "Staff": true, "StaffGiveAdmin": message.member.id } }, { upsert: true }).exec();
        await Users.updateOne({ _id: message.member.id }, { $push: { "Staffs": { id: uye.id, Date: Date.now() } } }, { upsert: true }).exec();
        message.channel.send({embeds: [embed.setDescription(`${message.guild.emojiGöster(emojiler.Onay)} Başarıyla ${uye.toString()} üyesi ${message.author} tarafından \`${tarihsel(Date.now())}\` tarihinde başarıyla yetkili olarak başlatıldı!`)], components: []});
        client.Upstaffs.addPoint(message.member.id,_statSystem.points.staff, "Yetkili")
        let yetkiliLog = message.guild.kanalBul("yetki-ver-log")
        if(yetkiliLog) yetkiliLog.send({embeds: [embed.setDescription(`${uye} isimli üye \`${tarihsel(Date.now())}\` tarihinde ${message.author} tarafından yetkili olarak başlatıldı.`)]})      
        return uye.roles.add(roller.başlangıçYetki).then(x => {
          uye.roles.add(roller.altilkyetki)
	  client.Upstaffs.addPoint(uye.id,"1", "Bonus")
        });
      }
    embed.setDescription(`${message.member.toString()} isimli yetkili seni yetkili yapmak istiyor. Kabul ediyor musun?`);
    const msg = await message.channel.send({content: uye.toString(), embeds: [embed], components: [Row]});
    var filter = (i) => i.user.id == uye.id
    let collector = msg.createMessageComponentCollector({filter: filter, time: 30000})
    collector.on("collect", async (i) => {
      if (i.customId == "kabulet") {
        await i.deferUpdate().catch(err => {})
        msg.delete().catch(err => {})
          await Users.updateOne({ _id: uye.id }, { $set: { "Staff": true, "StaffGiveAdmin": message.member.id } }, { upsert: true }).exec();
          await Users.updateOne({ _id: message.member.id }, { $push: { "Staffs": { id: uye.id, Date: Date.now() } } }, { upsert: true }).exec();
          let sehira =  message.channel.send({embeds: [embed.setDescription(`${message.guild.emojiGöster(emojiler.Onay)} Başarıyla ${uye.toString()} üyesi ${message.author} tarafından \`${tarihsel(Date.now())}\` tarihinde başarıyla yetkili olarak başlatıldı!`)], components: []});
          let yetkiliLog = message.guild.kanalBul("yetki-ver-log")
          if(yetkiliLog) yetkiliLog.send({embeds: [embed.setDescription(`${uye} isimli üye \`${tarihsel(Date.now())}\` tarihinde ${message.author} tarafından yetkili olarak başlatıldı.`)]})      
          client.Upstaffs.addPoint(message.member.id,_statSystem.points.staff, "Yetkili")
          let verilcekRol = [roller.başlangıçYetki, roller.altilkyetki]
          uye.roles.add(verilcekRol).then(x => {
		client.Upstaffs.addPoint(uye.id,"1", "Bonus")
	  })
        } if(i.customId == "reddet") {
          await i.deferUpdate().catch(err => {})
          msg.delete().catch(err => {})
          message.channel.send({content: message.member.toString(), components: [],embeds: [embed.setDescription(`${message.guild.emojiGöster(emojiler.Iptal)} ${uye.toString()} üyesi, yetkili olma teklifini reddetti!`)]});
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