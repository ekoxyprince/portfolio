const express = require("express")
const router = express.Router()
const adminController = require("../controllers/admin")
const multer = require("multer")
const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/static/img/")
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "--" + file.originalname)
    }
})
const upload = multer({ storage: fileStorageEngine })

router.get("/auth", adminController.auth)
router.post("/auth", adminController.login)
router.get("/logout", adminController.logout)
router.get("/dashboard", adminController.isLoggedIn, adminController.homepage)
router.get("/add_portfolio", adminController.isLoggedIn, adminController.addPortfolio)
router.get("/add_testimonial", adminController.isLoggedIn, adminController.addTestimonial)
router.post("/add_portfolio", upload.single("fileToUpload"), adminController.isLoggedIn, adminController.addPortfolioPost)
router.post("/add_testimonial", upload.single("fileToUpload"), adminController.isLoggedIn, adminController.addTestimonialPost)
router.get("/view_portfolio", adminController.isLoggedIn, adminController.viewPortfolio)
router.get("/view_testimonial", adminController.isLoggedIn, adminController.viewTestimonial)
router.get("/portfolio/delete/:id", adminController.isLoggedIn, adminController.deletePortfolio)
router.get("/testimonial/delete/:id", adminController.isLoggedIn, adminController.deleteTestimonial)
router.get("/password_reset", adminController.isLoggedIn, adminController.resetPassword)
router.post("/password_reset", adminController.isLoggedIn, adminController.resetPasswordPost)




module.exports = router