const express = require('express')
const router = express.Router()

const priceController = new (require("../Controllers/price"))();

//ROUTES
router.route('/')
    .get(priceController.fetchPricesList)

module.exports = router