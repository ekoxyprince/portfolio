
const mailHelper = require("../helpers/mail")
const Portfolio = require("../models/portfolio")
const Count = require("../models/count")
const Message  = require("../models/messages")


exports.getHomePage =  (req, res) => {
Portfolio.getAllContents("portfolio",portfolio=>{
Portfolio.getAllContents("testimonials",testimonial=>{
let count = new Count("new request")
count.save()
res.render("portfolio", { portf: portfolio, testi: testimonial }) 
    })
})
}
exports.postHomeContact = (req, res) => {
    let {name,email,message} = req.body
    let myEmail = "denniseinstien@gmail.com"
    let currentTime = (new Date()).toLocaleString(); 
    let mailOption = {
        from: '" EkoxyBoss" <contact@astrodev.com.ng>',
        to: `denniseinstien@gmail.com`,
        subject: "Portfolio Contact",
        text: "Hello Prince, you have a new message from " + name,
        html: `<html>  
        <body style='color: #000; font-size: 16px; text-decoration: none; font-family: Helvetica Neue, Helvetica, Arial, sans-serif; background-color: #efefef;'>
            <div id='wrapper' style='max-width: 600px; margin: auto auto; padding: 20px;'>
                <div id='content' style='font-size: 16px; padding: 25px; background-color: #fff;
                    moz-border-radius: 10px; -webkit-border-radius: 10px; border-radius: 10px; -khtml-border-radius: 10px;
                    border-color: blue; border-width: 4px 1px; border-style: solid;position:relative;top:-180px;'>
                    <h1 style='font-size: 22px;'><center>New Message from your portfolio</center></h1>
                    <p>From ${name},</p>
                    <p>hello, prince</p>
                    <p>${name} with an email ${email} sent you a message saying "${message}"</P>
                    Best Regards!<br>
                    </p>
                    <br />
                    <p><center><a href='https://capitalhilltrades.com'></a></center></p>
                    <p style='display: flex; justify-content: center; margin-top: 10px;'><center>
                         </div>
                    </center></p>
                </div>
                <div id='footer1' style='margin-bottom: 20px; padding: 0px 8px; text-align: center;background-color: #e5e7e9; padding: 10px;position:relative;top:-180px;'>
           </div>
                <div id='footer' style='margin-bottom: 20px; padding: 0px 8px; text-align: center;position:relative;top:-180px;'>

                     Copyright Astrodev 2022.
                </div>
            </div>
        </body>
    </html>`
    }
   mailHelper(mailOption,send=>{
    if(send){
        message = new Message(name,email,message,currentTime)
        message.save()
        res.redirect("/")
    }
   })
   
}