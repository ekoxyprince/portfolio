const con = require("../config/db")

const databaseQuery = sql =>{
    con.query(sql,(err,results)=>{
        if(err) throw err;
        return
    })
}

module.exports = class Count{
    constructor(name,email,message,currentTime){
        this.name = name;
        this.email = email;
        this.message = message;
        this.currentTime = currentTime
    }
    save(){
        let sql = `INSERT INTO messages(name,email,messages,time) VALUES("${this.name}","${this.email}","${this.message}", "${this.currentTime}")`
        databaseQuery(sql)
    }
}