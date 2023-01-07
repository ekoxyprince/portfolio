const con = require("../config/db")

const databaseQuery = sql =>{
    con.query(sql,(err,results)=>{
        if(err) throw err;
        return
    })
}

module.exports = class Testimonial{
    constructor(name,imgsrc,testimonial){
        this.name = name;
        this.imgsrc = imgsrc;
        this.testimonial = testimonial;
    }
    save(){
        let sql = `INSERT INTO testimonials(name,imgsrc,testimonial) VALUES("${this.name}","${this.imgsrc}","${this.testimonial}")`
        databaseQuery(sql)
    }
}