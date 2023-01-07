const con = require("../config/db")
const databaseQuery = sql=>{
    con.query(sql,(err,results)=>{
        if(err)throw err;
        return
    })
}
const selectQuery = (sql,cb)=>{
    con.query(sql,(err,results)=>{
        if(err)throw err;
        cb(results)
    })
}
module.exports = class Portfolio{
    constructor(name,imgsrc,link){
        this.name = name
        this.imgsrc = imgsrc
        this.link = link
    }
    save(){
const {name,imgsrc,link} =  this
  let sql = `INSERT INTO portfolio(name,imgsrc,link) VALUES("${name}","${imgsrc}","${link}")`
  databaseQuery(sql)
    }
    static getAllContents(table,cb){
        let sql = `SELECT * FROM ${table}`
        selectQuery(sql,content=>{
cb(content)
        })
    }
    static getAdminDetails(id,cb){
        let sql = `SELECT * FROM admin WHERE id ="${id}"`
        selectQuery(sql,admin=>{
            cb(admin)
        })
    }
    static updatePassword(id,password){
        let sql = `UPDATE admin SET password = "${password}" WHERE id = ${id} `
        databaseQuery(sql)
     }
     static deleteContent(table,id){
        let sql = `DELETE FROM ${table} WHERE id = ${id}`
        databaseQuery(sql)
     }
}