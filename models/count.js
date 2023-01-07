const con = require("../config/db")

const databaseQuery = sql =>{
    con.query(sql,(err,results)=>{
        if(err) throw err;
        return
    })
}

module.exports = class Count{
    constructor(count){
        this.count = count;
    }
    save(){
        let sql = `INSERT INTO visitors(count) VALUES("${this.count}")`
        databaseQuery(sql)
    }
}