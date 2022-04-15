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
        
    }
})
client.login(secret.token)