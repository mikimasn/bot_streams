module.exports=class{
    #db;
    constructor(){
        var sqlite = require("sqlite3").verbose();
        this.#db = new sqlite.Database("db.db")
    }
    addlogs(uid,amount,reason){
        this.#db.run(`INSERT INTO "main"."logs"("u_id","amount","reason","timestamp") VALUES (?,?,?,?);`,[uid,amount,JSON.stringify(reason),Math.floor(new Date()/1000)],err=>{
            if(err)
                console.error(err);
        })
    }
    readlogs(uid,time,callback){
        this.#db.all(`Select * from logs where timestamp>=? AND u_id=?`,[time,uid],(err,rows)=>{
            if(err)
                console.error(err)
            else
                callback(rows)
        })
    }
    addxp(uid,amount,reason){
        this.addlogs(uid,amount,reason)
        this.#db.get(`Select * from data where u_id=?`,[uid],(err,row)=>{
            if(err)
                console.error(err)
            else{
                if(row===undefined){
                    this.#db.run(`INSERT INTO "main"."data"("u_id","xp") VALUES (?,?);`,[uid,amount],err=>{
                        if(err){
                            console.error(err)
                        }
                    })
                }
                else{
                    this.#db.run(`UPDATE "main"."data" SET "xp"=? WHERE "u_id"=?`,[row["xp"]+amount,uid],err=>{
                        if(err){
                            console.error(err)
                        }
                    })
                }
            }
        })
    }
    readxp(uid,callback){
        this.#db.get(`Select xp from data where u_id=?`,[uid],(err,row)=>{
            callback(row===undefined?false:row["xp"])
        })
    }
}