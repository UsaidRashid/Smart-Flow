const express=require("express");
const router=express.Router();
const setDataController=require("../controllers/setData");

router
    .route('/')
        .get(setDataController.sendRandomImages);

module.exports=router;

