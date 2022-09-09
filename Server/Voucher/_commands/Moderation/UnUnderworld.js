const { Client, Message, MessageEmbed} = require("discord.js");
const Punitives = require('../../../../Global/Databases/Schemas/Global.Punitives');
const Users = require('../../../../Global/Databases/Schemas/Client.Users');
const { genEmbed } = require("../../../../Global/Init/Embed");
module.exports = {
    Isim: "unban",
    Komut: ["yasaklama-kaldır","bankaldır","yasaklamakaldır"],
    Kullanim: "unban <#No/@sehira/ID>",
    Aciklama: "Belirlenen üyenin yasaklamasını kaldırır.",
    Kategori: "yetkili",
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
    if(!roller.banHammer.some(oku => message.member.roles.cache.has(oku)) && !roller.kurucuRolleri.some(oku => message.member.roles.cache.has(oku)) && !message.member.permissions.has('ADMINISTRATOR')) return message.channel.send(cevaplar.noyt);
    if(Number(args[0])) {
        let cezanobul = await Punitives.findOne({Type: "Underworld", No: args[0], Active: true})
        if(cezanobul) args[0] = cezanobul.Member
    }
    let uye = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || await client.getUser(args[0])    
    if(!uye) return message.channel.send(cevaplar.üye + ` \`${sistem.botSettings.Prefixs[0]}${module.exports.Isim} <@sehira/ID>\``);
    if(message.author.id === uye.id) return message.channel.send(cevaplar.kendi);
    await Punitives.findOne({Member: uye.id, Type: "Underworld", Active: true}).exec(async (err, res) => {
        if(!res) return message.channel.send({embeds: [new genEmbed().setDescription(`${cevaplar.prefix} Belirtilen ${uye} isimli üyenin **Underworld** cezası bulunamadı.`)]}).then(x => {
                message.react(message.guild.emojiGöster(emojiler.Iptal))
                setTimeout(() => {
                    x.delete()
                }, 7500);
            });
        
            if(res) {
                if(res.Staff !== message.author.id && message.guild.members.cache.get(res.Staff) && !message.member.permissions.has("ADMINISTRATOR") && !roller.kurucuRolleri.some(x => message.member.roles.cache.has(x))) return message.channel.send({embeds: [new genEmbed().setDescription(`${cevaplar.prefix} Bu ceza ${res.Staff ? message.guild.members.cache.get(res.Staff) ? `${message.guild.members.cache.get(res.Staff)} (\`${res.Staff}\`)` : `${res.Staff}` :  `${res.Staff}`} Tarafından cezalandırılmış. **Bu Cezayı Açman Münkün Değil!**`).setFooter("yaptırım yapılan cezada yaptırımı yapan yetkili işlem uygulayabilir.")]}).then(x => {
                    message.react(message.guild.emojiGöster(emojiler.Iptal))
                    setTimeout(() => {
                        x.delete()
                    }, 7500);
                });
            }
            if(res) await Punitives.updateOne({ No: res.No }, { $set: { "Active": false, Expried: Date.now(), Remover: message.member.id} }, { upsert: true }).exec();
            let bul = message.guild.members.cache.get(uye.id) 
            if(bul) {
                let User = await Users.findOne({_id: uye.id});
                if(!ayarlar.taglıalım && User && User.Name && User.Names && User.Gender) {
                    if(uye && uye.manageable) uye.setNickname(`${User.Name}`)
                    if(User.Gender == "Erkek") uye.setRoles(roller.erkekRolleri)
                    if(User.Gender == "Kadın") uye.setRoles(roller.kadınRolleri)
                    if(User.Gender == "Kayıtsız") uye.setRoles(roller.kayıtsızRolleri)
 
                } else {
                    uye.setRoles(roller.kayıtsızRolleri)
                    if(uye && uye.manageable) await uye.setNickname(`${uye.user.username.includes(ayarlar.tag) ? ayarlar.tag : (ayarlar.tagsiz ? ayarlar.tagsiz : (ayarlar.tag || ""))} İsim | Yaş`)
                }
            }
            let findChannel = message.guild.kanalBul("underworld-log");
            if(findChannel) await findChannel.send({embeds: [new genEmbed().setDescription(`${uye} uyesinin sunucudaki ${res ? `\`#${res.No}\` ceza numaralı Underworld'ü` : `Underworld'ü`}, **${tarihsel(Date.now())}** tarihinde ${message.author} tarafından kaldırıldı.`)]})
            await message.channel.send(`${message.guild.emojiGöster(emojiler.Onay)} ${uye} üyesinin ${res ? `(\`#${res.No}\`) ceza numaralı` : "sunucudaki"} Underworld'ü kaldırıldı!`);
            message.react(message.guild.emojiGöster(emojiler.Onay))
        })
   
    }
};