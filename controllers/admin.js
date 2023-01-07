
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const dotenv = require('dotenv');
const Portfolio = require("../models/portfolio");
const Testimonial = require("../models/testimonial");



exports.auth = (req, res) => {
    res.render("./admin/auth")
}
exports.login = async(req, res) => {
    console.log(req.body)

    try {
        let email = req.body.email;
        let password = req.body.password
        if (!email || !password) {
            return res.status(400).render("./admin/auth", { 
                message: "no email or password"
                , response: "error",
                 resHeader: "Opps!" })
        }
        Portfolio.getAllContents("admin",async(admin)=>{
            if (admin.length === 0 || !(await bcrypt.compare(password, admin[0].password))) {
                return res.status(401).render("./admin/auth", {
                     message: "incorrect email or password",
                      response: "error",
                       resHeader: "Opps!" })
            } else {
                let id = admin[0].id
                let token = jwt.sign({ id: id },
                     process.env.JWT_SECRETS, 
                     { expiresIn: process.env.JWT_EXPIRES_IN })
                const cookieOptions = {
                    expires: new Date(
                        Date.now() + 
                        process.env.COOKIES_EXPIRES_IN * 60 * 1000
                    ),
                    httpOnly: true
                }
                res.cookie("jwt", token, cookieOptions)
                res.status(200).redirect("/admin/dashboard")
            }
        })
    } catch (error) {
        console.log(error)
    }
}
exports.logout = (req, res) => {
    newCookieOption = {
        expires: new Date(
            Date.now() * 2 * 1000
        )
    }
    res.cookie("jwt", "logout", newCookieOption)
    res.status(200).redirect("/admin/auth")
};
exports.isLoggedIn = async(req, res, next) => {
    if (req.cookies.jwt) {
        try {
            const decoded = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRETS);
            const id = decoded.id
            Portfolio.getAdminDetails(id,admin=>{
                if (!admin) {
                    return next();
                }
                req.user = admin[0]
                return next();
            })
        } catch (error) {
            console.log(error);
            next()
        }
    } else {
        next();
    }

};

exports.homepage = (req, res) => {
    if (req.user) {
        Portfolio.getAllContents("portfolio",portfolios=>{
            Portfolio.getAllContents("messages",messages=>{
                Portfolio.getAllContents("testimonials",testimonials=>{
                    Portfolio.getAllContents("visitors",visitors=>{
                        res.render("./admin/dashboard", 
                        { portfolios, messages, testimonials, visitors })
                    })
                })
            })
        })
    } else {
        res.redirect("/admin/auth")
    }

}
exports.addPortfolio = (req, res) => {
    if (req.user) {
        res.render("./admin/addPortfolio")
    } else {
        res.redirect("/admin/auth")
    }
}
exports.addTestimonial = (req, res) => {
    if (req.user) {
        res.render("./admin/addTestimonial")
    } else {
        res.redirect("/admin/auth")
    }
}
exports.addPortfolioPost = (req, res) => {
    if (req.user) {
        let {title,link} = req.body
        let image = req.file
        let imageDestination = req.file.destination
        let imageFilename = req.file.filename
        let image_location = imageDestination + imageFilename;
        let image_src = image_location.slice(8)
        let portfolio = new Portfolio(title,image_src,link)
        portfolio.save()
        res.redirect("/admin/dashboard")
    } else {
        res.redirect("/admin/auth")
    }
}
exports.addTestimonialPost = (req, res) => {
    if (req.user) {
       let {name,testimony} = req.body
        let image = req.file
        let imageDestination = req.file.destination
        let imageFilename = req.file.filename
        let image_location = imageDestination + imageFilename;
        let image_src = image_location.slice(8)
        let testimonial = new Testimonial(name,image_src,testimony)
        testimonial.save()
        res.redirect("/admin/dashboard")
    } else {
        res.redirect
    }
}
exports.viewPortfolio = (req, res) => {
    if (req.user) {
        Portfolio.getAllContents("portfolio",portfolios=>{
            res.render("./admin/viewportfolio", { portfolios })
        })
    } else {
        res.redirect("/admin/auth")
    }
}
exports.viewTestimonial = (req, res) => {
    if (req.user) {
        Portfolio.getAllContents("testimonials",testimonials=>{
            res.render("./admin/viewtestimonial", { testimonials })
        })
    } else {
        res.redirect("/admin/auth")
    }
}
exports.deletePortfolio = (req, res) => {
    if (req.user) {
        let id = req.params.id
        Portfolio.deleteContent("portfolio",id)
        res.redirect("/admin/view_portfolio")
       } else {
        res.redirect("/admin/auth")
    }
}
exports.deleteTestimonial = (req, res) => {
    if (req.user) {
        let id = req.params.id
        Portfolio.deleteContent("testimonials",id)
        res.redirect("/admin/view_testimonial")
      } else {
        res.redirect("/admin/auth")
    }
}
exports.resetPassword = (req, res) => {
    if (req.user) {
        res.render("./admin/resetpassword")
    } else {
        res.redirect("/admin/auth")
    }
}
exports.resetPasswordPost = async(req, res) => {
    if (req.user) {
        let id = req.user.id
        let password = req.body.password
        let passwordC = req.body.cpassword
        if (password !== passwordC) {
            res.render("./admin/resetpassword", { message: "mismatched passwords", response: "error", resHeader: "Oops!" })
        } else if (password === passwordC) {
            let hashedPassword = await bcrypt.hash(password, 8)
           Portfolio.updatePassword(id,hashedPassword)
            res.redirect("/admin/dashboard")
        }
    } else {
        res.redirect("/admin/auth")
    }
}
