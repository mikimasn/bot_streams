const db = require("./db")
const dbc = new db();
dbc.getleaderboard(5,0,rows=>{
    console.log(rows)
})