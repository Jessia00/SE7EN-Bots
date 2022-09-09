const {} = require("discord.js");
const canvas = require("canvas");


 /**
 * @param {Client} client
 */


module.exports = () => {
    let guild = client.guilds.cache.get(sistem.SERVER.ID);

 setInterval( async () => {
        let channels = guild.channels.cache.filter(channel => channel.type == "voice" && channel.members.size > 0 && channel.parent);
        channels.forEach(channel => {
            let members = channel.members.filter(member => !member.user.bot && !member.voice.selfDeaf);
            members.forEach(async (member) => {
                if(member.bot) return;
                if(member.roles.cache.has(roller.jailRolü) || member.roles.cache.has(roller.şüpheliRolü) || member.roles.cache.has(roller.yasaklıTagRolü) || (roller.kayıtsızRolleri && roller.kayıtsızRolleri.some(rol => member.roles.cache.has(rol)))) return;
                if(coinConf.sistem) await member.coinAdd(coinConf.Ödül.Ses) 
            });
        });
    }, coinConf.kacmilisaniyesonra);
}


module.exports.config = {
    Event: "ready"
}