const express=require("express");
const router=express.Router();
const getDataController = require("../controllers/getData");

router
    .route("/")
        .post(getDataController.processimages);

module.exports = router;