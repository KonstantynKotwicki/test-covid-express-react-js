const {Router}  = require("express")

const router = Router()

const getStats = require("./controllers/getStats")

router.get("/:country?", getStats)

module.exports = router