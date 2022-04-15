const discord = require("discord.js")
const secret = require("./secret.json")
var client = new discord.Client({intents:[discord.Intents.FLAGS.GUILDS]});
client.on("ready",()=>{
    console.log("ready");
})
client.login(secret.token)