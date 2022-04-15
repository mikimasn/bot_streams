const discord = require("discord.js")
const secret = require("./secret.json")
var client = new discord.Client({intents:[discord.Intents.FLAGS.GUILDS]});
const functions = require("./functions")
client.on("ready",()=>{
    console.log("ready");
});
client.on("message",()=>{

})
client.login(secret.token)