const expressAsyncHandler = require("express-async-handler");
const Chat = require("../model/chatModel");
const User = require("../model/userModel");
const Message = require("../model/messageModel");

const accessChat = expressAsyncHandler(async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    console.log("UserId param not sent with request");
    return res.sendStatus(400);
  }
  var isChat = await Chat.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: req.user._id } } },
      { users: { $elemMatch: { $eq: userId } } },
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage");

  isChat = await User.populate(isChat, {
    path: "latestMessage.sender",
    select: "name pic email",
  });

  if (isChat.length > 0) {
    res.send(isChat[0]);
  } else {
    var chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [req.user._id, userId],
    };
    try {
      const createChat = await Chat.create(chatData);

      const FullChat = await Chat.findOne({ _id: createChat._id }).populate(
        "users",
        "-password"
      );
      res.status(200).send(FullChat);
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  }
});

const fetchChat = expressAsyncHandler(async (req, res) => {
  try {
    let chats = await Chat.find({ users: req.user._id })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 });

    chats = await User.populate(chats, {
      path: "latestMessage.sender",
      select: "name pic email",
    });
    res.status(200).json(chats);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const createGroupChat = expressAsyncHandler(async (req, res) => {
  if (!req.body.users || !req.body.name) {
    return res.status(400).send({ message: "Please Fill all the feilds" });
  }

  var users = JSON.parse(req.body.users);

  if (users.length < 2) {
    return res
      .status(400)
      .send("More than 2 users are required to form a group chat");
  }

  users.push(req.user);

  try {
    const groupChat = await Chat.create({
      chatName: req.body.name,
      users: users,
      isGroupChat: true,
      groupAdmin: req.user,
    });

    const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");
    res.status(200).json(fullGroupChat);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const renameGroup=expressAsyncHandler(async(req,res)=>{
    const {chatId,chatName}=req.body;
    const updatedChat=await Chat.findByIdAndUpdate(chatId,{chatName},{new:true}) 
                                .populate("users", "-password")
                                .populate("groupAdmin", "-password");

    if (!updatedChat){return res.status(400).json({ msg: "Chat not found" });}
    return res.status(200).json(updatedChat);
    
})

const addToGroup=expressAsyncHandler(async(req,res)=>{
     const {chatId,userId} =req.body;

     const added=await Chat.findByIdAndUpdate(
      chatId,
    {
       $push:{users:userId}
    },{new:true})
    .populate("users","-password")
    .populate("groupAdmin","-password")

    if(!added){
      res.status(400);
      throw new Error("chat not found");
    }else{
      res.json(added);
    }
})

const removeFromGroup=expressAsyncHandler(async(req,res)=>{
  const {chatId,userId} =req.body;

  const removed=await Chat.findByIdAndUpdate(
   chatId,
 {
    $pull:{users:userId}
 },{new:true})
 .populate("users","-password")
 .populate("groupAdmin","-password")

 if(!removed){
   res.status(400);
   throw new Error("chat not found");
 }else{
   res.json(removed);
 }
})


module.exports = { accessChat, fetchChat, createGroupChat, renameGroup, addToGroup, removeFromGroup };
