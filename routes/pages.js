const express = require("express")
const app = express();
const router = express.Router();
const pagesController = require("../controllers/pages")

router.get("/",pagesController.getHomePage)

router.post("/",pagesController.postHomeContact)

module.exports = router;