const express=require("express")
const {healthCheckController} =require("../controllers/healthCheckController");
const router=express.Router();


router.get("/health",healthCheckController.healthCheck); 

module.exports=router;