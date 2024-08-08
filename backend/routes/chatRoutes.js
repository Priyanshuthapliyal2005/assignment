const express=require("express");
const router=express.Router();
const {protect}=require("../middleware/authMiddleware");
const { accessChat,fetchChat,createGroupChat,renameGroup, addToGroup, removeFromGroup}=require("../controllers/chatController")


router.post("/",protect,accessChat);
router.get("/",protect,fetchChat);
router.post("/group",protect,createGroupChat);
router.put("/rename",protect,renameGroup);
router.put("/groupremove",protect,removeFromGroup);
router.put("/groupadd",protect,addToGroup);


module.exports=router;