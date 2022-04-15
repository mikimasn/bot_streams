const discord = require("discord.js")
const secret = require("./secret.json")
var client = new discord.Client({intents:[discord.Intents.FLAGS.GUILDS,discord.Intents.FLAGS.GUILD_MESSAGES]});
const functions = require("./functions")
const db = require("./db")
const dbc = new db();
const config = require("./config.json")
client.on("ready",()=>{
    console.log("ready");
});
client.on("messageCreate",(message)=>{
    var uid = message.author.id
    dbc.readlogs(uid,Math.floor(new Date()/1000-config.timeout),rows=>{
        if(rows.length==0){
            dbc.addxp(uid,functions.randomint(config.minxp,config.maxxp),{type:0,msg:message.id});
        }
    })
})
client.on("interactionCreate",inter=>{
    if(inter.isCommand()){
        inter.deferReply({ephemeral:true}).then(()=>{
        if(inter.commandName=="rank"){
            var user = inter.options.getUser("user",false)===null?inter.user:inter.options.getUser("user",false);
            var id = user.id;
            dbc.readxp(id,xp=>{
                var embed = new discord.MessageEmbed()
                .setColor("RANDOM")
                .setTitle("xp")
                .setDescription(xp?`${user.username} ma ${xp} xp`:`${user.username} jest nierankingowy`)
                .setTimestamp(new Date())
                .setFooter(user.tag,user.avatarURL())
                inter.editReply({embeds:[embed]})
            })
        }
    })
    }
    else if(inter.isUserContextMenu()){
        inter.deferReply({ephemeral:true}).then(()=>{
        if(inter.commandName=="rank"){
            var user = inter.targetUser;
            var id = user.id;
            dbc.readxp(id,xp=>{
                var embed = new discord.MessageEmbed()
                .setColor("RANDOM")
                .setTitle("xp")
                .setDescription(xp?`${user.username} ma ${xp} xp`:`${user.username} jest nierankingowy`)
                .setTimestamp(new Date())
                .setFooter(user.tag,user.avatarURL())
                inter.editReply({embeds:[embed]})
            })
        }
        })
    }
})
client.login(secret.token)