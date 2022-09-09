const { Client, Message, MessageActionRow, MessageButton, MessageSelectMenu} = require("discord.js");
const { genEmbed } = require('../../../../Global/Init/Embed');
const GUILD_SETTINGS = require('../../../../Global/Databases/Schemas/Global.Guild.Settings');
const Punitives = require('../../../../Global/Databases/Schemas/Global.Punitives');
const Invite = require('../../../../Global/Databases/Schemas/Global.Guild.Invites');
const Stats = require('../../../../Global/Databases/Schemas/Plugins/Client.Users.Stats')
const Users = require('../../../../Global/Databases/Schemas/Client.Users')
const moment = require('moment');
require("moment-duration-format");
require("moment-timezone");
const table = require('table');
let özellikler = [
    { name: "oğlak", type: "burç" },
    { name: "kova", type: "burç"},
    { name: "balık", type: "burç"},
    { name: "koç", type: "burç"},
    { name: "boğa", type: "burç"},
    { name: "ikizler", type: "burç"},
    { name: "yengeç", type: "burç"},
    { name: "aslan", type: "burç"},
    { name: "başak", type: "burç"},
    { name: "terazi", type: "burç"},
    { name: "akrep", type: "burç"},
    { name: "yay", type: "burç"},

    { name: "pubg", type: "oyun"},
    { name: "fortnite", type: "oyun"},
    { name: "valorant", type: "oyun"},
    { name: "csgo", type: "oyun"},
    { name: "lol", type: "oyun"},
    { name: "minecraft", type: "oyun"},
    { name: "mobilelegends", type: "oyun"},
    { name: "wildrift", type: "oyun"},
    { name: "fivem", type: "oyun"},
    { name: "gta5", type: "oyun"},

    { name: "lovers", type: "ilişki"},
    { name: "alone", type: "ilişki"},

    {name: "pembe", type: "renkler"},
    {name: "mavi", type: "renkler"},
    {name: "turuncu", type: "renkler"},
    {name: "kırmızı", type: "renkler"},
    {name: "mor", type: "renkler"},









    {name: "chatSorumlusu", type: "diğer"},
    {name: "oyunSorumlusu", type: "diğer"},
    {name: "kayıtSorumlusu", type: "diğer"},
    {name: "etkinlikSorumlusu", type: "diğer"},
    {name: "inviteSorumlusu", type: "diğer"},
    {name: "publicSorumlusu", type: "diğer"},
    {name: "sorunCozmeSorumlusu", type: "diğer"},
    {name: "streamerSorumlusu", type: "diğer"},
    {name: "tagSorumlusu", type: "diğer"},
    {name: "yetkiliAlımSorumlusu", type: "diğer"},
    
    

 // Tekil, Rol, Kanal, Roller, Acmali, Cogul
  ];
module.exports = {
    Isim: "seçenek",
    Komut: ["seçeneksistem"],
    Kullanim: "",
    Aciklama: "",
    Kategori: "-",
    Extend: true,
    
   /**
   * @param {Client} client 
   */
    onLoad: function (client) {

        //
        client.on('interactionCreate', async i => {
          if (!i.isButton()) return;
          let guild = i.guild
          let başvuruLog = guild.kanalBul("başvuru-log")
          if(i.customId == "chatsorumlusu") {
            if(başvuruLog) başvuruLog.send({content: `${i.guild.roles.cache.get(roller.Buttons.chatSorumlusu) ? i.guild.roles.cache.get(roller.Buttons.chatSorumlusu) : "@chat sorumlusu"}`, embeds: [new genEmbed().setDescription(`${i.user} isimli üye **Chat Sorumlusu** olmak için \`${tarihsel(Date.now())}\` tarihinde başvuru yaptı.`)]})
            await i.reply({content: `${i.guild.emojiGöster(emojiler.Onay)} Başarıyla başvurunuz ${i.guild.roles.cache.get(roller.Buttons.chatSorumlusu) ? i.guild.roles.cache.get(roller.Buttons.chatSorumlusu) : "@chat sorumlusu"} rolüne iletilniz gönderildi.`, ephemeral: true})
          }
          if(i.customId == "oyunsorumlusu") {
            if(başvuruLog) başvuruLog.send({content: `${i.guild.roles.cache.get(roller.Buttons.oyunSorumlusu) ? i.guild.roles.cache.get(roller.Buttons.oyunSorumlusu) : "@Oyun sorumlusu"}`, embeds: [new genEmbed().setDescription(`${i.user} isimli üye **Oyun Sorumlusu** olmak için \`${tarihsel(Date.now())}\` tarihinde başvuru yaptı.`)]})
            await i.reply({content: `${i.guild.emojiGöster(emojiler.Onay)} Başarıyla başvurunuz ${i.guild.roles.cache.get(roller.Buttons.oyunSorumlusu) ? i.guild.roles.cache.get(roller.Buttons.oyunSorumlusu) : "@Oyun sorumlusu"} rolüne iletilniz gönderildi.`, ephemeral: true})
          }
          if(i.customId == "etkinliksorumlusu") {
            if(başvuruLog) başvuruLog.send({content: `${i.guild.roles.cache.get(roller.Buttons.etkinlikSorumlusu) ? i.guild.roles.cache.get(roller.Buttons.etkinlikSorumlusu) : "@etkinlik sorumlusu"}`, embeds: [new genEmbed().setDescription(`${i.user} isimli üye **Etkinlik Sorumlusu** olmak için \`${tarihsel(Date.now())}\` tarihinde başvuru yaptı.`)]})
            await i.reply({content: `${i.guild.emojiGöster(emojiler.Onay)} Başarıyla başvurunuz ${i.guild.roles.cache.get(roller.Buttons.etkinlikSorumlusu) ? i.guild.roles.cache.get(roller.Buttons.etkinlikSorumlusu) : "@etkinlik sorumlusu"} rolüne iletilniz gönderildi.`, ephemeral: true})
          }
          if(i.customId == "kayitsorumlusu") {
            if(başvuruLog) başvuruLog.send({content: `${i.guild.roles.cache.get(roller.Buttons.kayıtSorumlusu) ? i.guild.roles.cache.get(roller.Buttons.kayıtSorumlusu) : "@kayıt sorumlusu"}`, embeds: [new genEmbed().setDescription(`${i.user} isimli üye **Kayıt Sorumlusu** olmak için \`${tarihsel(Date.now())}\` tarihinde başvuru yaptı.`)]})
            await i.reply({content: `${i.guild.emojiGöster(emojiler.Onay)} Başarıyla başvurunuz ${i.guild.roles.cache.get(roller.Buttons.kayıtSorumlusu) ? i.guild.roles.cache.get(roller.Buttons.kayıtSorumlusu) : "@kayıt sorumlusu"} rolüne iletilniz gönderildi.`, ephemeral: true})
          }
          if(i.customId == "davetsorumlusu") {
            if(başvuruLog) başvuruLog.send({content: `${i.guild.roles.cache.get(roller.Buttons.inviteSorumlusu) ? i.guild.roles.cache.get(roller.Buttons.inviteSorumlusu) : "@invite sorumlusu"}`, embeds: [new genEmbed().setDescription(`${i.user} isimli üye **Davet Sorumlusu** olmak için \`${tarihsel(Date.now())}\` tarihinde başvuru yaptı.`)]})
            await i.reply({content: `${i.guild.emojiGöster(emojiler.Onay)} Başarıyla başvurunuz ${i.guild.roles.cache.get(roller.Buttons.inviteSorumlusu) ? i.guild.roles.cache.get(roller.Buttons.inviteSorumlusu) : "@invite sorumlusu"} rolüne iletilniz gönderildi.`, ephemeral: true})
          }
          if(i.customId == "publicsorumlusu") {
            if(başvuruLog) başvuruLog.send({content: `${i.guild.roles.cache.get(roller.Buttons.publicSorumlusu) ? i.guild.roles.cache.get(roller.Buttons.publicSorumlusu) : "@public sorumlusu"}`, embeds: [new genEmbed().setDescription(`${i.user} isimli üye **Public Sorumlusu** olmak için \`${tarihsel(Date.now())}\` tarihinde başvuru yaptı.`)]})
            await i.reply({content: `${i.guild.emojiGöster(emojiler.Onay)} Başarıyla başvurunuz ${i.guild.roles.cache.get(roller.Buttons.publicSorumlusu) ? i.guild.roles.cache.get(roller.Buttons.publicSorumlusu) : "@public sorumlusu"} rolüne iletilniz gönderildi.`, ephemeral: true})
          }
          if(i.customId == "soruncozucu") {
            if(başvuruLog) başvuruLog.send({content: `${i.guild.roles.cache.get(roller.Buttons.sorunCozmeSorumlusu) ? i.guild.roles.cache.get(roller.Buttons.sorunCozmeSorumlusu) : "@sorun çözücü sorumlusu"}`, embeds: [new genEmbed().setDescription(`${i.user} isimli üye **Sorun Çözmeci** olmak için \`${tarihsel(Date.now())}\` tarihinde başvuru yaptı.`)]})
            await i.reply({content: `${i.guild.emojiGöster(emojiler.Onay)} Başarıyla başvurunuz ${i.guild.roles.cache.get(roller.Buttons.sorunCozmeSorumlusu) ? i.guild.roles.cache.get(roller.Buttons.sorunCozmeSorumlusu) : "@chat çözücü sorumlusu"} rolüne iletilniz gönderildi.`, ephemeral: true})
          }
          if(i.customId == "streamersorumlusu") {
            if(başvuruLog) başvuruLog.send({content: `${i.guild.roles.cache.get(roller.Buttons.streamerSorumlusu) ? i.guild.roles.cache.get(roller.Buttons.streamerSorumlusu) : "@streamer sorumlusu"}`, embeds: [new genEmbed().setDescription(`${i.user} isimli üye **Streamer Sorumlusu** olmak için \`${tarihsel(Date.now())}\` tarihinde başvuru yaptı.`)]})
            await i.reply({content: `${i.guild.emojiGöster(emojiler.Onay)} Başarıyla başvurunuz ${i.guild.roles.cache.get(roller.Buttons.streamerSorumlusu) ? i.guild.roles.cache.get(roller.Buttons.streamerSorumlusu) : "@streamer sorumlusu"} rolüne iletilniz gönderildi.`, ephemeral: true})
          }
          if(i.customId == "tagsorumlusu") {
            if(başvuruLog) başvuruLog.send({content: `${i.guild.roles.cache.get(roller.Buttons.tagSorumlusu) ? i.guild.roles.cache.get(roller.Buttons.tagSorumlusu) : "@tag sorumlusu"}`, embeds: [new genEmbed().setDescription(`${i.user} isimli üye **Tag Sorumlusu** olmak için \`${tarihsel(Date.now())}\` tarihinde başvuru yaptı.`)]})
            await i.reply({content: `${i.guild.emojiGöster(emojiler.Onay)} Başarıyla başvurunuz ${i.guild.roles.cache.get(roller.Buttons.tagSorumlusu) ? i.guild.roles.cache.get(roller.Buttons.tagSorumlusu) : "@tag sorumlusu"} rolüne iletilniz gönderildi.`, ephemeral: true})
          }
          if(i.customId == "yetkilialim") {
            if(başvuruLog) başvuruLog.send({content: `${i.guild.roles.cache.get(roller.Buttons.yetkiliAlımSorumlusu) ? i.guild.roles.cache.get(roller.Buttons.yetkiliAlımSorumlusu) : "@yetkili alım sorumlusu"}`, embeds: [new genEmbed().setDescription(`${i.user} isimli üye **Yetkili Alım** olmak için \`${tarihsel(Date.now())}\` tarihinde başvuru yaptı.`)]})
            await i.reply({content: `${i.guild.emojiGöster(emojiler.Onay)} Başarıyla başvurunuz ${i.guild.roles.cache.get(roller.Buttons.yetkiliAlımSorumlusu) ? i.guild.roles.cache.get(roller.Buttons.yetkiliAlımSorumlusu) : "@yetkili alım sorumlusu"} rolüne iletilniz gönderildi.`, ephemeral: true})
          }
        })
    
        client.ws.on('INTERACTION_CREATE', async interaction => {
          let GameMap = new Map([
              ["cezaListesi",roller.teyitciRolleri],
              ["lastPunitives",roller.teyitciRolleri],
              ["cezaPuanim",roller.teyitciRolleri],
              ["I", "123"],
              ["II", "123"],
              ["III", "123"],
              ["IV", "123"],
              ["V", "123"],
              ["VI", "123"],
              ["VII", "123"],
              ["VIII", "123"],
              ["IX", "123"],
      
          ])
          let name = interaction.data.custom_id        
          let member = await client.guilds.cache.get(sistem.SERVER.ID).members.fetch(interaction.member.user.id)
          if(!GameMap.has(name) || !member) return;
          let Cezalar = await Punitives.find({Member: member.id})
          let InviteData = await Invite.findOne({ guildID: member.guild.id, userID: member.user.id });
    
          const total = InviteData ? InviteData.total ? InviteData.total  : 0: 0;
      const regular = InviteData ? InviteData.regular ? InviteData.regular  : 0: 0;
      const bonus = InviteData ? InviteData.bonus ? InviteData.bonus  : 0: 0;
      const leave = InviteData ? InviteData.leave ? InviteData.leave  : 0: 0;
      const fake = InviteData ? InviteData.fake ? InviteData.fake  : 0: 0;
      const invMember = await Invite.find({ Inviter: member.user.id });
      const bazıları = invMember ? invMember.filter(value => member.guild.members.cache.get(value.userID)).slice(0, 7).map((value, index) => `\` • \`${member.guild.members.cache.get(value.userID)} (\`${value.userID}\`)`).join("\n") : undefined
      const daily = invMember ? member.guild.members.cache.filter((usr) => invMember.some((x) => x.userID === usr.user.id) && Date.now() - usr.joinedTimestamp < 1000 * 60 * 60 * 24).size : 0;
      const weekly = invMember ? member.guild.members.cache.filter((usr) => invMember.some((x) => x.userID === usr.user.id) && Date.now() - usr.joinedTimestamp < 1000 * 60 * 60 * 24 * 7).size : 0;
      let toplamMesaj = 0
      let toplamSes = 0
      let statData = await Stats.findOne({ guildID: member.guild.id, userID: member.id})
          if(statData && statData.voiceStats) statData.voiceStats.forEach(c => toplamSes += c);
          if(statData && statData.chatStats)   statData.chatStats.forEach(c => toplamMesaj += c);
          let returnText;
          if(name == "I") returnText = `:tada: **${member.guild.name}** Sunucusuna \`${tarihsel(member.joinedAt)}\` Tarihinde Katılmışsınız.`
          if(name == "II") returnText = `:tada: ${member}, üstünüzde bulunan rol(ler) şunlardır:
  ${member.roles.cache.filter(x => x.name != "@everyone" && x.id != roller.boosterRolü).map(x => `\` ••❯ \` ${x} (\`${x.id}\`)`).join("\n")}
  üzeriniz de **${member.roles.cache.size}** adet rol(ler) bulunmaktadır.`
           if(name == "III") returnText = `:tada: ${member} hesabınız, **${tarihsel(member.user.createdAt)}** tarihinde ${global.tarihHesapla(member.user.createdAt)} açılmış.`
           if(name == "IV") returnText = `${member.toString()}, üyesinin \`${tarihsel(Date.now() - (1000*60*60*3))}\` tarihinden itibaren \`${member.guild.name}\` sunucusunda toplam davet bilgileri aşağıda belirtilmiştir.
  \` • \` **Toplam**: \` ${total + bonus} üye \` (**Bonus**: \` ${bonus} üye \`)
  \` • \` **Girenler**: \` ${regular} üye \` (**Sahte**: \` ${fake} üye \`, **Ayrılmış**: \` ${leave} üye \`)
  \` • \` **Günlük**: \` ${daily} üye \`
  \` • \` **Haftalık**: \` ${weekly} üye \`
  
  ${bazıları ? `\` ••❯ \` Davet ettiğin bazı kişiler: 
  ${bazıları}` : ''}`
  if(name == "V") returnText = `:tada: **${member.guild.name}** sunucunda **${await member.cezaPuan()}** ceza puanın bulunmakta.`
  if(name == "VI") returnText = `**${member.guild.name}** Sunucusunun Aktif & Ses Bilgisi
  Sunucumuz da **${global.sayılıEmoji(member.guild.memberCount)}** üye bulunmakta.
  Sunucumuz da **${global.sayılıEmoji(member.guild.members.cache.filter(m => m.presence && m.presence.status !== "offline").size)}** aktif üye bulunmakta.`
       
  if(name == "VII") {
    let isimveri = await Users.findById(member.id)
      if(isimveri && isimveri.Names) {
        let isimler = isimveri.Names.length > 0 ? isimveri.Names.reverse().map((value, index) => `**İsim**: \` ${value.Name} \`  
  **İşlem**: ${value.State} ${value.Staff ? "(**İşlem Yapan**: <@"+ value.Staff + ">)" : ""}
  **Tarih**: \` ${tarihsel(value.Date)} \`
  ──────────────────────`).join("\n") : "";
          returnText = `
  Aşağıda sunucu içerisinde ki isimleriniz (**${isimveri.Names.length || 0}**) sıralandırılmıştır:
  ──────────────────────
  ${isimler}`
      } else {
          returnText = `:tada: ${member.guild.name} sunucusunda isim kaydınız bulunamadı.`
       }
  } 
  let saatDakikaCevir = (date) => { return moment.duration(date).format('H [saat,] m [dakika]'); }; 
  if(name == "VIII")  returnText = `:tada: **${member.guild.name}** Sunucusunda Toplamda **${toplamMesaj} mesaj** istatistiğiniz bulunuyor.`
  if(name == "IX") returnText = `:tada: **${member.guild.name}** Sunucusunda Toplamda **${saatDakikaCevir(toplamSes)}** boyunca zaman geçirmişsin.`
  if(name == "cezaListesi") {
          let data = [["ID", "🔵", "Ceza Tarihi", "Ceza Türü", "Ceza Sebebi"]];
          data = data.concat(Cezalar.map(value => {          
              return [
                  `#${value.No}`,
                  `${value.Active == true ? "✅" : `❌`}`,
                  `${tarihsel(value.Date)}`,
                  `${value.Type}`,
                  `${value.Reason}`
              ]
          }));
          let veriler = table.table(data, {
             columns: { 0: { paddingLeft: 1 }, 1: { paddingLeft: 1 }, 2: { paddingLeft: 1 }, 3: { paddingLeft: 1, paddingRight: 1 }, },
             border : table.getBorderCharacters(`void`),  
             drawHorizontalLine: function (index, size) {
                 return index === 0 || index === 1 || index === size;
             }
          });
          returnText = `\`\`\`fix
  ${await Punitives.findOne({Member: member.id}) ? veriler : `Tebrikler! ${member.guild.name} sunucusun da sana ait ceza bilgisine ulaşılamadı.`}\`\`\``
          }
          
          if(name == "lastPunitives") {
              let sesMute = await Punitives.find({Member: member.id, Active: true, Type: "Ses Susturulma"})
              let chatMute = await Punitives.find({Member: member.id, Active: true, Type: "Metin Susturulma"})
              let Cezali = await Punitives.find({Member: member.id, Active: true, Type: "Cezalandırılma"})
              let aktifCezalarList = []
              if(Cezali) Cezali.forEach(ceza => {
                  aktifCezalarList.push({
                      No: ceza.No,
                      Tip: ceza.Type,
                      Yetkili: ceza.Staff ? member.guild.members.cache.get(ceza.Staff) ? member.guild.members.cache.get(ceza.Staff) : `<@${ceza.Staff}>` : ayarlar.serverName,
                      Atılan: ceza.Duration? moment.duration(ceza.Duration- Date.now()).format("H [Saat], m [Dakika] s [Saniye]") : "Kalıcı",
                      Kalkma: `${moment.duration(ceza.Duration- Date.now()).format("H [saat], m [dakika] s [saniye]")} kaldı.`
                  })
              })
              if(sesMute) sesMute.forEach(ceza => {
                  aktifCezalarList.push({
                      No: ceza.No,
                      Tip: ceza.Type,
                      Yetkili: ceza.Staff ? member.guild.members.cache.get(ceza.Staff) ? member.guild.members.cache.get(ceza.Staff) : `<@${ceza.Staff}>` : ayarlar.serverName,
                      Atılan: ceza.Duration? moment.duration(ceza.Duration- Date.now()).format("H [Saat], m [Dakika] s [Saniye]") : "Kalıcı",
                      Kalkma: `${moment.duration(ceza.Duration- Date.now()).format("H [saat], m [dakika] s [saniye]")} kaldı.`
                  })
              })
              if(chatMute) chatMute.forEach(ceza => {
                  aktifCezalarList.push({
                      No: ceza.No,
                      Tip: ceza.Type,
                      Yetkili: ceza.Staff ? member.guild.members.cache.get(ceza.Staff) ? member.guild.members.cache.get(ceza.Staff) : `<@${ceza.Staff}>` : ayarlar.serverName,
                      Atılan: ceza.Duration? moment.duration(ceza.Duration- Date.now()).format("H [Saat], m [Dakika] s [Saniye]") : "Kalıcı",
                      Kalkma: `${ceza.Duration? moment.duration(ceza.Duration- Date.now()).format("H [Saat], m [Dakika] s [Saniye]") : "Kalıcı"}`
                  })
              })
  
              returnText = `${aktifCezalarList ? 
  aktifCezalarList.map(x => `${member.guild.emojiGöster(emojiler.Iptal)} ${x.Yetkili} tarafından **${x.Atılan}** süresince işlenen "__#${x.No}__" numaralı "__${x.Tip}__" türündeki cezalandırmanın kalkmasına **${x.Kalkma}** kaldı.`).join("\n") 
  : `${member.guild.emojiGöster(emojiler.Onay)} Tebrikler! \`${member.guild.name}\` sunucusunda size ait aktif aktif cezaya ulaşılamadı.`}`
          }
  
          if(name == "cezaPuanim") {
                  let cezaPuanı = await member.cezaPuan()
                  returnText = `${member.guild.name} sunucunda **${await member.cezaPuan()}** ceza puanın bulunmakta.`
          }
          client.api.interactions(interaction.id, interaction.token).callback.post({
              data: {
                  type: 4,
                  data: {
                      content: returnText ? returnText : `${member.guild.emojiGöster(emojiler.Onay)} Tebrikler! \`${member.guild.name}\` sunucusunda size ait aktif cezaya ulaşılamadı.`,
                      flags: "64"
                  }
              }
          })
          
      });


    
        client.ws.on('INTERACTION_CREATE', async interaction => {
            let GameMap = new Map([
                ["cezaListesi",roller.Buttons.vk],
                ["lastPunitives",roller.Buttons.dc],
                ["cezaPuanim",roller.Buttons.cekiliskatilimcisi],
        
            ])
            let name = interaction.data.custom_id        
            let member = await client.guilds.cache.get(sistem.SERVER.ID).members.fetch(interaction.member.user.id)
            if(!GameMap.has(name) || !member) return;
            let Cezalar = await Punitives.find({Member: member.id})
            let returnText;
            if(name == "cezaListesi") {
            let data = [["ID", "🔵", "Ceza Tarihi", "Ceza Türü", "Ceza Sebebi"]];
            data = data.concat(Cezalar.map(value => {          
                return [
                    `#${value.No}`,
                    `${value.Active == true ? "✅" : `❌`}`,
                    `${tarihsel(value.Date)}`,
                    `${value.Type}`,
                    `${value.Reason}`
                ]
            }));
            let veriler = table.table(data, {
               columns: { 0: { paddingLeft: 1 }, 1: { paddingLeft: 1 }, 2: { paddingLeft: 1 }, 3: { paddingLeft: 1, paddingRight: 1 }, },
               border : table.getBorderCharacters(`void`),  
               drawHorizontalLine: function (index, size) {
                   return index === 0 || index === 1 || index === size;
               }
            });
            returnText = `\`\`\`fix
    ${await Punitives.findOne({Member: member.id}) ? veriler : `Tebrikler! ${member.guild.name} sunucusun da sana ait ceza bilgisine ulaşılamadı.`}\`\`\``
            }
            
            if(name == "lastPunitives") {
                let sesMute = await Punitives.find({Member: member.id, Active: true, Type: "Ses Susturulma"})
                let chatMute = await Punitives.find({Member: member.id, Active: true, Type: "Metin Susturulma"})
                let Cezali = await Punitives.find({Member: member.id, Active: true, Type: "Cezalandırılma"})
                let aktifCezalarList = []
                if(Cezali) Cezali.forEach(ceza => {
                    aktifCezalarList.push({
                        No: ceza.No,
                        Tip: ceza.Type,
                        Yetkili: ceza.Staff ? member.guild.members.cache.get(ceza.Staff) ? member.guild.members.cache.get(ceza.Staff) : `<@${ceza.Staff}>` : ayarlar.serverName,
                        Atılan: ceza.Duration? moment.duration(ceza.Duration- Date.now()).format("H [Saat], m [Dakika] s [Saniye]") : "Kalıcı",
                        Kalkma: `${moment.duration(ceza.Duration- Date.now()).format("H [saat], m [dakika] s [saniye]")} kaldı.`
                    })
                })
                if(sesMute) sesMute.forEach(ceza => {
                    aktifCezalarList.push({
                        No: ceza.No,
                        Tip: ceza.Type,
                        Yetkili: ceza.Staff ? member.guild.members.cache.get(ceza.Staff) ? member.guild.members.cache.get(ceza.Staff) : `<@${ceza.Staff}>` : ayarlar.serverName,
                        Atılan: ceza.Duration? moment.duration(ceza.Duration- Date.now()).format("H [Saat], m [Dakika] s [Saniye]") : "Kalıcı",
                        Kalkma: `${moment.duration(ceza.Duration- Date.now()).format("H [saat], m [dakika] s [saniye]")} kaldı.`
                    })
                })
                if(chatMute) chatMute.forEach(ceza => {
                    aktifCezalarList.push({
                        No: ceza.No,
                        Tip: ceza.Type,
                        Yetkili: ceza.Staff ? member.guild.members.cache.get(ceza.Staff) ? member.guild.members.cache.get(ceza.Staff) : `<@${ceza.Staff}>` : ayarlar.serverName,
                        Atılan: ceza.Duration? moment.duration(ceza.Duration- Date.now()).format("H [Saat], m [Dakika] s [Saniye]") : "Kalıcı",
                        Kalkma: `${ceza.Duration? moment.duration(ceza.Duration- Date.now()).format("H [Saat], m [Dakika] s [Saniye]") : "Kalıcı"}`
                    })
                })
    
                returnText = `${aktifCezalarList ? 
    aktifCezalarList.map(x => `${member.guild.emojiGöster(emojiler.Iptal)} ${x.Yetkili} tarafından **${x.Atılan}** süresince işlenen "__#${x.No}__" numaralı "__${x.Tip}__" türündeki cezalandırmanın kalkmasına **${x.Kalkma}** kaldı.`).join("\n") 
    : `${member.guild.emojiGöster(emojiler.Onay)} Tebrikler! \`${member.guild.name}\` sunucusunda size ait aktif aktif cezaya ulaşılamadı.`}`
            }
    
            if(name == "cezaPuanim") {
                    let cezaPuanı = await member.cezaPuan()
                    returnText = `${member.guild.name} sunucunda **${await member.cezaPuan()}** ceza puanın bulunmakta.`
            }
            client.api.interactions(interaction.id, interaction.token).callback.post({
                data: {
                    type: 4,
                    data: {
                        content: returnText ? returnText : `${member.guild.emojiGöster(emojiler.Onay)} Tebrikler! \`${member.guild.name}\` sunucusunda size ait aktif aktif cezaya ulaşılamadı.`,
                        flags: "64"
                    }
                }
            })
            
        });

                client.on("interactionCreate", async (interaction) => {
                    let menu = interaction.customId
                    const member = await client.guilds.cache.get(sistem.SERVER.ID).members.fetch(interaction.member.user.id)
                    if (!member) return;
                    let Database = await GUILD_SETTINGS.findOne({guildID: sistem.SERVER.ID}).exec()
                    
                    const data = Database.Ayarlar.Buttons
    
    
    
    
                    if (menu === "renks") {
                      let color = new Map([
                        ["kirmizi", data.Kırmızı],
                        ["turuncu", data.Turuncu],
                        ["mavi", data.Mavi],
                        ["mor", data.Mor],
                        ["pembe", data.Pembe],
                
                      ])
                      let role = color.get(interaction.values[0])
                      let renkroller = [data.Kırmızı, data.Turuncu, data.Mavi, data.Mor, data.Pembe]
                      if (!member.roles.cache.has(roller.tagRolü) && !member.roles.cache.has(roller.boosterRolü) && !member.permissions.has("ADMINISTRATOR")) {
                        interaction.reply({ content: " Sadece tagımızı almış ya da sunucumuza boost basmış üyeler renk rolü seçebilir.", ephemeral: true })
                      } else {
                        if (interaction.values[0] === "rolsil") {
                          await member.roles.remove(renkroller)
                        } else if (role) {
                          if (renkroller.some(m => member.roles.cache.has(m))) {
                            await member.roles.remove(renkroller)
                          }
                          await member.roles.add(role)
                        }
                        interaction.reply({ content: `Rolleriniz güncellendi.`, ephemeral: true })
                      }
                    } else if (menu === "valantines") {
                        let relationship = new Map([
                          ["couple", data.lovers],
                          ["single", data.alone]
                  
                        ])
                        let role = relationship.get(interaction.values[0])
                        let roles = [data.lovers, data.alone]
                        if (interaction.values[0] === "rolsil") {
                          await member.roles.remove(roles)
                        } else if (role) {
                          if (roles.some(m => member.roles.cache.has(m))) {
                            await member.roles.remove(roles)
                          }
                          await member.roles.add(role)
                        }
                        interaction.reply({ content: "Rolleriniz güncellendi.", ephemeral: true })
                      } else if (menu === "games") {
                        let GameMap = new Map([
                          ["lol", data.lol],
                          ["csgo", data.csgo],
                          ["minecraft", data.minecraft],
                          ["valorant", data.valorant],
                          ["fortnite", data.fortnite],
                          ["gta5", data.gta5],
                          ["pubg", data.pubg],
                          ["wildrift", data.wildrift],
                          ["fivem", data.fivem],
                          ["mlbb", data.mobilelegends],
                        ])
    
                        let roles = [data.lol,data.csgo,data.minecraft, data.valorant, data.fortnite,data.gta5, data.pubg, data.wildrift, data.fivem, data.mobilelegends]
                        var role = []
                        for (let index = 0; index < interaction.values.length; index++) {
                          let ids = interaction.values[index]
                          let den = GameMap.get(ids)
                          role.push(den)
                        }
                        if (!interaction.values.length) {
                          await member.roles.remove(roles)
                        } else {
                          await member.roles.remove(roles)
                          await member.roles.add(role)
                        }
                        interaction.reply({ content: "Rolleriniz güncellendi.", ephemeral: true })
                      } else if (menu === "horoscope") {
                        let HorosCope = new Map([
                          ["koç", data.koç],
                          ["boğa", data.boğa],
                          ["ikizler", data.ikizler],
                          ["yengeç", data.yengeç],
                          ["aslan", data.aslan],
                          ["başak", data.başak],
                          ["terazi", data.terazi],
                          ["akrep", data.akrep],
                          ["yay", data.yay],
                          ["oğlak", data.oğlak],
                          ["kova", data.kova],
                          ["balık", data.balık],
                        ])
                        let roles = [data.koç, data.boğa, data.ikizler, data.yengeç, data.aslan, data.başak, data.terazi, data.akrep, data.yay, data.oğlak, data.kova, data.balık,
                        ]
                        let role = HorosCope.get(interaction.values[0])
                        if (interaction.values[0] === "rolsil") {
                          await member.roles.remove(roles)
                        } else if (role) {
                          if (roles.some(m => member.roles.cache.has(m))) {
                            await member.roles.remove(roles)
                          }
                          await member.roles.add(role)
                        }
                        interaction.reply({ content: "Rolleriniz güncellendi.", ephemeral: true })
                  
                      } else if (menu === "etkinliks") {
                        let eventsMap = new Map([
                          ["etkinlik", roller.etkinlikKatılımcısı],
                          ["cekilis", roller.cekilisKatılımcısı],
                        ])
                        let roles = [roller.etkinlikKatılımcısı, roller.cekilisKatılımcısı]
                        var role = []
                        for (let index = 0; index < interaction.values.length; index++) {
                          let ids = interaction.values[index]
                          let den = eventsMap.get(ids)
                          role.push(den)
                        }
                        if (!interaction.values.length) {
                          await member.roles.remove(roles)
                        } else {
                          await member.roles.remove(roles)
                          await member.roles.add(role)
                        }
                        
                        interaction.reply({ content: "Rolleriniz güncellendi.", ephemeral: true })
                      }
                })
      },

   /**
   * @param {Client} client 
   * @param {Message} message 
   * @param {Array<String>} args 
   */

  onRequest: async function (client, message, args) {
        const embed = new genEmbed()
        let Database = await GUILD_SETTINGS.findOne({guildID: message.guild.id}).exec()
        const data = Database.Ayarlar.Buttons
        let secim = args[0];
        let ozelliklerListe = Object.keys(data || {}).filter(a => özellikler.find(v => v.name == a))

        const buttonSatır = new MessageActionRow()
        .addComponents(
                new MessageButton()
                .setCustomId('etkinlikçekilişkur')
                .setLabel('🎉 Seçenek(ler) Kur')
                .setStyle('SUCCESS'),

                new MessageButton()
                .setCustomId('rolkur')
                .setLabel('🎇 Rolleri Kur')
                .setStyle('SUCCESS'),
            );
            let satir2 = new MessageActionRow().addComponents(
              new MessageButton()
              .setCustomId('basvurupanel')
              .setLabel('🌟 Başvuru Paneli')
              .setDisabled(ozelliklerListe.length == özellikler.length ? false  : true)
              .setStyle('DANGER'),

              new MessageButton()
                .setCustomId('kullanıcı')
                .setLabel('🎇 Kullanıcı Paneli')
                .setStyle('DANGER'),

                new MessageButton()
                .setCustomId('yönetim')
                .setLabel('Yönetim Paneli')
                .setStyle('DANGER'),

                new MessageButton()
                .setCustomId('cezapanelikur')
                .setLabel('⛔ Ceza Paneli')
                .setStyle('DANGER'),

                new MessageButton()
                .setCustomId('ayarlar')
                .setLabel('🔨 Ayarları Görüntüle')
                .setStyle('DANGER'),

            )

            let satir3 = new MessageActionRow().addComponents(

                new MessageButton()
                .setCustomId('geriii')
                .setLabel('⏪ Geri Dön')
                .setStyle('PRIMARY'),
            )

            let satir4 = new MessageActionRow().addComponents(
              new MessageButton()
              .setCustomId('otomatikburç')
              .setLabel('Burç Rolleri')
              .setEmoji(message.guild.emojiGöster("962112243661688942"))
              .setStyle('SECONDARY'),

              new MessageButton()
              .setCustomId('otomatikilişki')
              .setLabel('İlişki Rolleri')
              .setEmoji(message.guild.emojiGöster("962112243661688942"))
              .setStyle('SECONDARY'),

              new MessageButton()
              .setCustomId('otomatikoyun')
              .setLabel('Oyun Rolleri')
              .setEmoji(message.guild.emojiGöster("962112243661688942"))
              .setStyle('SECONDARY'),

              new MessageButton()
              .setCustomId('otomatikrenk')
              .setLabel('Renk Rolleri')
              .setEmoji(message.guild.emojiGöster("962112243661688942"))
              .setStyle('SECONDARY'),
            )

            let yönetimpanel = new MessageActionRow().addComponents(
              new MessageSelectMenu()
              .setCustomId("yönetimpanel")
              .setPlaceholder(`${uye.user.tag}'nin detaylarını görüntüle`)
              .addOptions( 
                { label: "Rolsüz Ver", description: "Sunucuda ki rolsüz üyeler kayıtsız rollerini verir.", value: "rolsüz", emoji: { "name": "chatMute", "id": "962112364944191499" }},
                { label: "İptal", description: "", value: "iptal", emoji: { "name": "chatMute", "id": "947548354756370472" }},
        
              )
            )
            

        if (!secim || !özellikler.some(ozellik => ozellik.name.toLowerCase() == secim.toLowerCase())) {
            let emboo = embed.setDescription(`🛠 \`${message.guild.name}\` Seçenek Menü Kurulum Paneli\n
            **Ayarlanabilir özellikler (\`${özellikler.length}\`): **
            ${özellikler.map(x => x.name).join(", ")}`)
            return message.channel.send({components: [ buttonSatır, satir2],embeds: [emboo]}).then(x => {
                const filter = i =>  i.user.id === message.member.id;

                const collector = message.channel.createMessageComponentCollector({ filter, time: 30000 });
                
                collector.on('collect', async i => {
                  if(i.customId === "basvurupanel") {
                    await x.delete().catch(err => {}),await i.deferUpdate(); 
                      client.api.channels(message.channel.id).messages.post({ data: {"content":`${message.guild.emojiGöster(emojiler.Tag)} Aşağıda ki düğmelerden sorumluluk veya sorumlu olmak için başvuru yapabilirsiniz.\n\` ••❯ \` **Birden fazla sorumluluğa başvurabilirsiniz ve en kısa sürede sonuçlandırılır!**\n\` ••❯ \` **Sorumluluk lideri veya sorumluluk yöneticisi size en kısa sürede dönüş yapacaktır!**\n\` ••❯ \` **Ayrıca sorumluluklarınız sizlere ekstra puanlar ve ekstra ödüller verecektir.**\n\` ••❯ \` **Usülsüz kullanım tespiti bot tarafından kontrol edilmektedir gereksiz başvurular otomatik olarak cezalandırılacaktır.**\n\n@everyone`,"components":[{"type":1,"components":[

                          {"type":2,"style":2,"custom_id":"chatsorumlusu","label":"🌟 Chat Sorumlusu"},
                          {"type":2,"style":2,"custom_id":"publicsorumlusu","label":"🌟 Public Sorumlusu"},
                          {"type":2,"style":2,"custom_id":"kayitsorumlusu","label":"🌟 Kayıt Sorumlusu"},
                          {"type":2,"style":2,"custom_id":"streamersorumlusu","label":"🌟 Streamer Sorumlusu"},
                          {"type":2,"style":2,"custom_id":"davetsorumlusu","label":"🌟 İnvite Sorumlusu"}
                          
                          
                          ]},
                          {"type":1,"components":[
                            {"type":2,"style":2,"custom_id":"oyunsorumlusu","label":"🌟 Oyun Sorumlusu"},
                            {"type":2,"style":2,"custom_id":"tagsorumlusu","label":"🌟 Tag Sorumlusu"},
                            {"type":2,"style":2,"custom_id":"etkinliksorumlusu","label":"🌟 Etkinlik Sorumlusu"},
                            {"type":2,"style":2,"custom_id":"soruncozucu","label":"🌟 Sorun Çözücü"},
                            {"type":2,"style":2,"custom_id":"yetkilialim","label":"🌟Yetkili Alım"}
                            
                            
                            ]}]} })

                          await message.react(message.guild.emojiGöster(emojiler.Onay)).catch(err => {})

                  }
                    if(i.customId === "cezapanelikur") {
                      await x.delete().catch(err => {}),await i.deferUpdate(); 
                        client.api.channels(message.channel.id).messages.post({ data: {"content":`${message.guild.emojiGöster(emojiler.Tag)} Aşağıda ki düğmelerden ceza listenizi, ceza puanını ve aktif cezanızın kalan süresini görüntülüyebilirsiniz.`,"components":[{"type":1,"components":[

                            {"type":2,"style":2,"custom_id":"cezaPuanim","label":"Ceza Puanı", "emoji": { "name": "uye", "id": "947548404307881994" }},
                             {"type":2,"style":3,"custom_id":"cezaListesi","label":"Cezalarım", "emoji": { "name": "Cezalandirildi", "id": "948677924561752104" }},
                            {"type":2,"style":4,"custom_id":"lastPunitives","label":"Kalan Zamanım?", "emoji": { "name": "chatMute", "id": "947629083863420960" }}
                            
                            
                            ]}]} })
                            
                            await message.react(message.guild.emojiGöster(emojiler.Onay)).catch(err => {})
                      
                    }

                    if(i.customId == "rolkur") {
                      await x.delete().catch(err => {}),await i.deferUpdate().catch(err => {}).catch(err => {}); 
                      
                      client.api.channels(message.channel.id).messages.post({ data: {"content":`Merhaba \`${message.guild.name}\` Sunucusu için **Burç, Renk, İlişki, Oyun** rollerinin kurulumunu bu menü üzerinden gerçekleştirebilirsiniz.`, components: [satir4]
                      }
                      
                       })
                    }


                    if(i.customId == "otomatikburç") {
                      if(ayarlar.Buttons && ayarlar.Buttons.aslan && message.guild.roles.cache.get(ayarlar.Buttons.aslan)) return await i.reply({content: `${cevaplar.prefix} Otomatik kurulum sistemini aktif etmek için, aktif bir rol bulunmaması gerekir.`, ephemeral: true});
                      await i.reply({content: `${message.guild.emojiGöster(emojiler.Onay)} Başarıyla otomatik burç rolleri oluşturularak veritabanına kayıt edildi.`, ephemeral: true})
                      await x.delete().catch(err => {})
                      let burçSistemi = [
                        {isim: "Koç", renk: "#09040d", sheet: "koç"},
                        {isim: "Boğa", renk: "#09040d", sheet: "boğa"},
                        {isim: "İkizler", renk: "#09040d", sheet: "ikizler"},
                        {isim: "Yengeç", renk: "#09040d", sheet: "yengeç"},
                        {isim: "Aslan", renk: "#09040d", sheet: "aslan"},
                        {isim: "Başak", renk: "#09040d", sheet: "başak"},
                        {isim: "Terazi", renk: "#09040d", sheet: "terazi"},
                        {isim: "Akrep", renk: "#09040d", sheet: "akrep"},
                        {isim: "Yay", renk: "#09040d", sheet: "yay"},
                        {isim: "Oğlak", renk: "#09040d", sheet: "oğlak"},
                        {isim: "Kova", renk: "#09040d", sheet: "kova"},
                        {isim: "Balık", renk: "#09040d", sheet: "balık"},
                      ]
                      burçSistemi.forEach(async (data) => {
                       const burçRolü = await message.guild.roles.create({
                              name: data.isim,
                              color: data.renk,
                              reason: "Otomatik Burç Kurulum Sistemi!"
                            }).then(async (rol) => {
                      await GUILD_SETTINGS.findOneAndUpdate({guildID: message.guild.id}, {$set: {[`Ayarlar.Buttons.${data.sheet}`]: rol.id}}, {upsert: true}).exec().catch(e => console.log(e))
                      })
                      })
                    }
                    if(i.customId == "otomatikilişki") {
                      if(ayarlar.Buttons && ayarlar.Buttons.lovers && message.guild.roles.cache.get(ayarlar.Buttons.lovers)) return await i.reply({content: `${cevaplar.prefix} Otomatik kurulum sistemini aktif etmek için, aktif bir rol bulunmaması gerekir.`, ephemeral: true});
                      await i.reply({content: `${message.guild.emojiGöster(emojiler.Onay)} Başarıyla otomatik ilişki & etkinlik rolleri oluşturularak veritabanına kayıt edildi.`, ephemeral: true})
                      await x.delete().catch(err => {})
                      let iliskiSistemi = [
                        {isim: "💕 Lovers", renk: "#f1479a", sheet: "lovers"},
                        {isim: "💔 Alone", renk: "#1b0404", sheet: "alone"},
                        {isim: "Etkinlik Katılımcısı", renk: "#ffffff", sheet: "etkinlik", sheetcik: "etkinlikKatılımcısı"},
                        {isim: "Çekiliş Katılımcısı", renk: "#ffffff", sheet: "cekilis", sheetcik: "cekilisKatılımcısı"},
                        {isim: "Vampir Köylü", renk: "#ffffff", sheet: "vk"},
                        {isim: "Doğruluk Mu? Cesaretlik Mi?", renk: "#b783fe", sheet: "dc"},
                        {isim: "Gartic.io", renk: "#581afc", sheet: "gartic"},
                      ]
                      iliskiSistemi.forEach(async (data) => {
                       const iliskiRolü = await message.guild.roles.create({
                              name: data.isim,
                              color: data.renk,
                              reason: "Otomatik İlişki & Etkinlik Kurulum Sistemi!"
                            }).then(async (rol) => {
                      await GUILD_SETTINGS.findOneAndUpdate({guildID: message.guild.id}, {$set: {[`Ayarlar.Buttons.${data.sheet}`]: rol.id}}, {upsert: true}).exec().catch(e => console.log(e))
                      if(data.sheetcik)  await GUILD_SETTINGS.findOneAndUpdate({guildID: message.guild.id}, {$set: {[`Ayarlar.${data.sheetcik}`]: rol.id}}, {upsert: true}).exec().catch(e => console.log(e))
                    })
                      })
                    }
                    if(i.customId == "otomatikoyun") {
                      if(ayarlar.Buttons && ayarlar.Buttons.csgo && message.guild.roles.cache.get(ayarlar.Buttons.csgo)) return await i.reply({content: `${cevaplar.prefix} Otomatik kurulum sistemini aktif etmek için, aktif bir rol bulunmaması gerekir.`, ephemeral: true});
                      await i.reply({content: `${message.guild.emojiGöster(emojiler.Onay)} Başarıyla otomatik oyun rolleri oluşturularak veritabanına kayıt edildi.`, ephemeral: true})
                      await x.delete().catch(err => {})
                      let oyunSistemi = [
                        {isim: "League Of Legends", renk: "#ffffff", sheet: "lol"},
                        {isim: "Counter-Strike: Global Offensive", renk: "#ffffff", sheet: "csgo"},
                        {isim: "Minecraft", renk: "#ffffff", sheet: "minecraft"},
                        {isim: "Valorant", renk: "#ffffff", sheet: "valorant"},
                        {isim: "Fortnite", renk: "#ffffff", sheet: "fortnite"},
                        {isim: "Grand Theft Auto V", renk: "#ffffff", sheet: "gta5"},
                        {isim: "PUBG", renk: "#ffffff", sheet: "pubg"},
                        {isim: "Wild Rift", renk: "#ffffff", sheet: "wildrift"},
                        {isim: "Mobile Legends", renk: "#ffffff", sheet: "mobilelegends"},
                        {isim: "FiveM", renk: "#ffffff", sheet: "fivem"},
                      ]
                      oyunSistemi.forEach(async (data) => {
                       const oyunRolü = await message.guild.roles.create({
                              name: data.isim,
                              color: data.renk,
                              reason: "Otomatik Oyun Kurulum Sistemi!"
                            }).then(async (rol) => {
                      await GUILD_SETTINGS.findOneAndUpdate({guildID: message.guild.id}, {$set: {[`Ayarlar.Buttons.${data.sheet}`]: rol.id}}, {upsert: true}).exec().catch(e => console.log(e))
                      })
                      })
                    }
                    if(i.customId == "otomatikrenk") {
                      if(ayarlar.Buttons && ayarlar.Buttons.kırmızı && message.guild.roles.cache.get(ayarlar.Buttons.kırmızı)) return await i.reply({content: `${cevaplar.prefix} Otomatik kurulum sistemini aktif etmek için, aktif bir rol bulunmaması gerekir.`, ephemeral: true});
                      await i.reply({content: `${message.guild.emojiGöster(emojiler.Onay)} Başarıyla otomatik renk rolleri oluşturularak veritabanına kayıt edildi.`, ephemeral: true})
                      await x.delete().catch(err => {})
                      let renkSistemi = [
                          {isim: "Kırmızı", renk: "#e43200", sheet: "kırmızı"},
                          {isim: "Turuncu", renk: "#e4b400", sheet: "turuncu"},
                          {isim: "Mavi", renk: "#0055e4", sheet: "mavi"},
                          {isim: "Mor", renk: "#7c00f8", sheet: "mor"},
                          {isim: "Pembe", renk: "#f866c1", sheet: "pembe"},

                        ]
                        renkSistemi.forEach(async (data) => {
                         const renkRolü = await message.guild.roles.create({
                                name: data.isim,
                                color: data.renk,
                                reason: "Otomatik Renk Kurulum Sistemi!"
                              }).then(async (rol) => {
                        await GUILD_SETTINGS.findOneAndUpdate({guildID: message.guild.id}, {$set: {[`Ayarlar.Buttons.${data.sheet}`]: rol.id}}, {upsert: true}).exec().catch(e => console.log(e))
                        })
                        })
                    }



                    if(i.customId == "kullanıcı") {
                      await x.delete().catch(err => {}),await i.deferUpdate().catch(err => {}).catch(err => {}); 
                      
                      client.api.channels(message.channel.id).messages.post({ data: {"content":`Merhaba \`${message.guild.name}\` Sunucusu içerisinde yapmak istediğiniz işlem veya ulaşmak istediğiniz bilgi için gerekli düğmelere tıklamanız yeterli olucaktır!\n\n**I**: Sunucuya giriş tarihinizi öğrenin.\n**II**: Üstünüzde bulunan rollerin listesini alın.\n**III**: Hesabınızın açılış tarihini öğrenin.\n\n**IV**: Davet bilgilerinizi öğrenin.\n**V**: Ceza puanını görüntüle.\n**VI**: Sunucunun anlık aktif listesini görüntüleyin.\n\n**VII**: Sunucudaki eski isim bilgilerinizi görüntüleyin.\n**VIII**: Sunucudaki toplam mesaj sayınızı öğrenin.\n**IX**: Sunucu ses kanallarında toplam geçirdiğiniz süreyi öğrenin.\n`,
                      "components":[{
                      "type":1,"components":[
                                               {"type":2,"style":1,"custom_id":"I","label":"I"},
                                               {"type":2,"style":1,"custom_id":"II","label":"II"},
                                               {"type":2,"style":1,"custom_id":"III","label":"III"},
                             ]}, {  "type":1,"components":[
                                               {"type":2,"style":1,"custom_id":"IV","label":"IV"},
                                               {"type":2,"style":1,"custom_id":"V","label":"V"},
                                               {"type":2,"style":1,"custom_id":"VI","label":"VI"}
                             ]}, {  "type":1,"components":[
                                               {"type":2,"style":1,"custom_id":"VII","label":"VII"},
                                               {"type":2,"style":1,"custom_id":"VIII","label":"VIII"},
                                               {"type":2,"style":1,"custom_id":"IX","label":"IX"}
                             ]}
                      
                      
                      ]}
                      
                       })
                    }


                    if(i.customId === "geriii")  {
                        await x.edit({content: null, components: [buttonSatır, satir2], embeds: [emboo]}), 
                        await i.deferUpdate();
                    }
                    if(i.customId === "etkinlikçekilişkur") {
                      await x.delete().catch(err => {}),await i.deferUpdate(); 
                        client.api.channels(message.channel.id).messages.post({ data: {"content":`${message.guild.emojiGöster(emojiler.Konfeti)} Sunucuda sizleri rahatsız etmemek için \`@everyone\` veya \`@here\` atmayacağız. Sadece isteğiniz doğrultusunda aşağıda bulunan tepkilere tıklarsanız Çekilişler,Etkinlikler V/K ve D/C'den haberdar olacaksınız.

\`⦁\` Eğer \`@${message.guild.roles.cache.get(roller.etkinlikKatılımcısı).name}\` Rolünü alırsanız sunucumuzda düzenlenecek olan etkinlikler, konserler ve oyun etkinlikleri gibi etkinliklerden haberdar olabilirsiniz. 
                        
\`⦁\` Eğer \`@${message.guild.roles.cache.get(roller.cekilisKatılımcısı).name}\` Rolünü alırsanız sunucumuzda sıkça vereceğimiz ${message.guild.emojiGöster(emojiler.boostluNitro)}, ${message.guild.emojiGöster(emojiler.Spotify)}, ${message.guild.emojiGöster(emojiler.Netflix)}, ${message.guild.emojiGöster(emojiler.Exxen)}, ${message.guild.emojiGöster(emojiler.Youtube)} ve daha nice ödüllerin bulunduğu çekilişlerden haberdar olabilirsiniz. 
                        
**NOT:** \`Kayıtlı, kayıtsız olarak hepiniz bu kanalı görebilmektesiniz. Sunucumuz da everyone veya here atılmayacağından dolayı kesinlikle rollerinizi almayı unutmayın.\` `,"components":[
                            
                            {
                                "type": 1, "components": [{
                                    "type": 3, "custom_id": "etkinliks", "options": [
                                        { "label": "Etkinlik Katılımcısı", "description": "Etkinliklerden haberdar olmak için", "value": "etkinlik", "emoji": { "id": "922059128321478666", "name": "monarch_etkinlik" }, },
                                        { "label": "Çekiliş Katılımcısı", "description": "Çekilişlerden haberdar olmak için", "value": "cekilis", "emoji": { "id": "922059128250195978", "name": "monarch_cekilis" }, }
                                    ], "placeholder": "Etkinlik Rolleri", "min_values": 0, "max_values": 2
                                }],
                            }]} })
                            client.api.channels(message.channel.id).messages.post({
                              data: {
                                  "content": `${message.guild.emojiGöster(emojiler.Tag)} Aşağıda ki menüden **Burç** rollerinden dilediğinizi alabilirsiniz.`,
                                  "components": [  {
                                      "type": 1, "components": [{
                                          "type": 3, "custom_id": "horoscope", "options": [
                                              { "label": "Koç", "value": "koç", "emoji": { "id": "921860371998990398", "name": "monarch_koc" }, },
                                              { "label": "Boğa", "value": "boğa", "emoji": { "id": "921860427749675049", "name": "monarch_boga" }, },
                                              { "label": "İkizler", "value": "ikizler", "emoji": { "id": "921860478425247755", "name": "monarch_ikizler" }, },
                                              { "label": "Yengeç", "value": "yengeç", "emoji": { "id": "921860522431881236", "name": "monarch_yengec" }, },
                                              { "label": "Aslan", "value": "aslan", "emoji": { "id": "921863570793316362", "name": "monarch_aslan" }, },
                                              { "label": "Başak", "value": "başak", "emoji": { "id": "921863598836432998", "name": "monarch_basak" }, },
                                              { "label": "Terazi", "value": "terazi", "emoji": { "id": "921863669996998667", "name": "monarch_terazi" }, },
                                              { "label": "Akrep", "value": "akrep", "emoji": { "id": "921863704830681098", "name": "monarch_akrep" }, },
                                              { "label": "Yay", "value": "yay", "emoji": { "id": "921863747046350920", "name": "monarch_yay" }, },
                                              { "label": "Oğlak", "value": "oğlak", "emoji": { "id": "921860226662154340", "name": "monarch_oglak" }, },
                                              { "label": "Kova", "value": "kova", "emoji": { "id": "921860274707902525", "name": "monarch_kova" }, },
                                              { "label": "Balık", "value": "balık", "emoji": { "id": "921860308467855411", "name": "monarch_balik" }, },
                                              { "label": "Rol İstemiyorum", "value": "rolsil", "emoji": { "id": "922058306263072860", "name": "monarch_trash" }, }
                  
                                          ], "placeholder": "Burç Rolleri", "min_values": 1, "max_values": 1
                                      }],
                                  }
                                  ]
                              }
                          })
                          client.api.channels(message.channel.id).messages.post({
                            data: {
                                "content": `${message.guild.emojiGöster(emojiler.Tag)} Aşağıda ki menüden **Oyun** rollerinden dilediğinizi alabilirsiniz.`,
                                "components": [  {
                                    "type": 1, "components": [{
                                        "type": 3, "custom_id": "games", "options": [
                                            { "label": "League of Legends", "value": "lol", "emoji": { "id": "921864037296398387", "name": "monarch_lol" }, },
                                            { "label": "CS:GO", "value": "csgo", "emoji": { "id": "921863992652210246", "name": "monarch_csgo" }, },
                                            { "label": "Minecraft", "value": "minecraft", "emoji": { "id": "921864081089122395", "name": "monarch_minecraft" }, },
                                            { "label": "Valorant", "value": "valorant", "emoji": { "id": "921863888591519754", "name": "monarch_valorant" }, },
                                            { "label": "Fortnite", "value": "fortnite", "emoji": { "id": "921863851652284537", "name": "monarch_fortnite" }, },
                                            { "label": "Gta V", "value": "gta5", "emoji": { "id": "921864267584651274", "name": "monarch_gta5" }, },
                                            { "label": "PUBG", "value": "pubg", "emoji": { "id": "921863782676975616", "name": "monarch_pubg" }, },
                                            { "label": "Wild Rift", "value": "wildrift", "emoji": { "id": "921864162181787708", "name": "monarch_wildrift" }, },
                                            { "label": "FiveM", "value": "fivem", "emoji": { "id": "921864209933942835", "name": "monarch_fivem" }, },
                                            { "label": "Mobile Legends", "value": "mlbb", "emoji": { "id": "921864119160815627", "name": "monarch_mobilelegends" }, }
                
                                        ], "placeholder": "Oyun Rolleri", "min_values": 0, "max_values": 10
                                    }],
                                }
                                ]
                            }
                        })
                        client.api.channels(message.channel.id).messages.post({
                          data: {
                              "content": `${message.guild.emojiGöster(emojiler.Tag)} Aşağıda ki menüden **Renk** rollerinden dilediğinizi alabilirsiniz.`,
                              "components": [{
                                  "type": 1, "components": [{
                                      "type": 3, "custom_id": "renks", "options": [
                                          { "label": "Kırmızı", "value": "kirmizi", "emoji": { "id": "922056838298628166", "name": "monarch_kirmizi" }, },
                                          { "label": "Turuncu", "value": "turuncu", "emoji": { "id": "921864542881996850", "name": "monarch_turuncu" }, },
                                          { "label": "Mavi", "value": "mavi", "emoji": { "id": "921864463538327602", "name": "monarch_mavi" }, },
                                          { "label": "Mor", "value": "mor", "emoji": { "id": "921864509566640128", "name": "monarch_mor" }, },
                                          { "label": "Pembe", "value": "pembe", "emoji": { "id": "921864428696244277", "name": "monarch_pembe" }, },
                                          { "label": "Yeşil", "value": "yesil", "emoji": { "id": "922056513919528960", "name": "monarch_yesil" }, },
                                          {
                                              "label": "Rol İstemiyorum", "value": "rolsil", "emoji": { "id": "922058306263072860", "name": "monarch_trash" },
                                          }], "placeholder": "Renk Rolleri", "min_values": 1, "max_values": 1
                                  }],
                              }
                              ]
                          }
                      })
                      client.api.channels(message.channel.id).messages.post({
                        data: {
                            "content": `${message.guild.emojiGöster(emojiler.Tag)} Aşağıda ki menüden **İlişki** rollerinden dilediğinizi alabilirsiniz.`,
                            "components": [  {
                                "type": 1, "components": [{
                                    "type": 3, "custom_id": "valantines", "options": [
                                        { "label": "Sevgilim Var", "value": "couple", "emoji": { "id": "921864349428121670", "name": "monarch_lovers" }, },
                                        { "label": "Sevgilim Yok", "value": "single", "emoji": { "id": "921864389097844736", "name": "monarch_alone" }, },
                                        { "label": "Rol İstemiyorum", "value": "rolsil", "emoji": { "id": "922058306263072860", "name": "monarch_trash" }, }
                                    ], "placeholder": "İlişki Rolleri", "min_values": 1, "max_values": 1
                                }],
                            }
                            ]
                        }
                    })
                            await message.react(message.guild.emojiGöster(emojiler.Onay)).catch(err => {}).catch(err => {})
                    }

                    if (i.customId === 'ayarlar') {
                        let ozelliklerListe = Object.keys(data || {}).filter(a => özellikler.find(v => v.name == a)).map(o => {
                            let element = data[o]
                            let ozellik = özellikler.find(z => z.name == o);
                            if(ozellik.type == "diğer") return `[**Sorumluluk**] ${başHarfBüyült(o)} (${message.guild.roles.cache.get(element) || "Ayarlı Değil!"})`
                            if(ozellik.type == "oyun") return `[**Oyunlar**] ${başHarfBüyült(o)} (${message.guild.roles.cache.get(element) || "Ayarlı Değil!"})`
                            if(ozellik.type == "burç") return `[**Burçlar**] ${başHarfBüyült(o)} (${message.guild.roles.cache.get(element) || "Ayarlı Değil!"})`
                            if(ozellik.type == "ilişki") return `[**İlişkiler**] ${başHarfBüyült(o)} (${message.guild.roles.cache.get(element) || "Ayarlı Değil!"})`
                            if(ozellik.type == "renkler") return `[**Renkler**] ${başHarfBüyült(o)} (${message.guild.roles.cache.get(element) || "Ayarlı Değil!"})`
                          }).join('\n');
                          await i.deferUpdate();
		                    await x.edit({ content: null, components: [satir3], embeds: [embed.setFooter(`yapılan ayar listesi şöyle sıralandı.`).setDescription(ozelliklerListe)] });
                    }
                   
                });
                
                collector.on('end', collected => {  x.delete().catch(err => {}) });
            })
        }
        let ozellik = özellikler.find(o => o.name.toLowerCase() === secim.toLowerCase());
        if (ozellik.type) {
            let rol = message.mentions.roles.first() || message.guild.roles.cache.get(args.splice(1)[0]) || message.guild.roles.cache.find(r => r.name === args.splice(1).join(' '));
            if(!rol) return message.channel.send({embeds: [embed.setDescription(`${message.guild.emojiGöster(emojiler.Iptal)} **${başHarfBüyült(ozellik.name)}** isimli seçenek ayarını hangi rol yapmamı istiyorsun?`)]}).then(x => setTimeout(() => {
              x.delete()
          }, 7500));
            await GUILD_SETTINGS.findOneAndUpdate({guildID: message.guild.id}, {$set: {[`Ayarlar.Buttons.${ozellik.name}`]: rol.id}}, {upsert: true}).exec().catch(e => console.log(e))
             message.channel.send({embeds: [embed.setDescription(`${message.guild.emojiGöster(emojiler.Onay)} Başarıyla **${başHarfBüyült(ozellik.name)}** isimli seçenek ayar rolü ${rol} olarak tanımladı.`)]})
            return message.react(message.guild.emojiGöster(emojiler.Onay)).catch(err => {})  
        }
    }
};

function başHarfBüyült(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }





 
                   
            