require('dotenv').config();
const express=require('express');
const PORT=require("./config/secret").PORT;
const NODE_ENV=require("./config/secret").NODE_ENV
const ConnectDB=require("./utils/db");
const {notFound,errorHandler}=require("./middleware/errorMiddleware")
const userRoutes=require("./routes/userRoutes");
const chatRoutes=require("./routes/chatRoutes");
const healthCheckRoute= require("./routes/healthCheckRoute")
const messageRoutes=require("./routes/messageRoutes")
const path=require("path")
const app=express();


app.use(express.json());
app.use("/api",healthCheckRoute);
app.use('/api/user',userRoutes);
app.use("/api/chat",chatRoutes);
app.use("/api/message",messageRoutes)
//----------------Deployment code start----------
const __dirname1=path.resolve();
if(NODE_ENV==='production'){
    app.use(express.static(path.join(__dirname1,"/frontend/build")));

    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname1,"frontend","build","index.html"));
    })
}else{
    app.get("/",(req,res)=>{
        res.send("API Runs Successfilly");
    });
}

//----------------Deployment code end----------

app.use(notFound)
app.use(errorHandler)

const server=app.listen(PORT,async()=>{
    console.log(`Server running at PORT ==> ${PORT}`);
    await ConnectDB();
});

const io=require("socket.io")(server,{   pingTimeout:60000,
    cors:{
    origin:"*",
},credentials: true,})

io.on("connection",(socket)=>{ 
    socket.on('setup',(userData)=>{
       socket.join(userData._id);
       socket.emit("Connected");
    })
    socket.on("join chat",(room)=>{
        socket.join(room);
    })
    socket.on("typing",(room)=>socket.in(room).emit("typing"))
    socket.on("stop typing",(room)=>socket.in(room).emit("stop typing"))
    socket.on("new message",(newMessageRecieved)=>{
        var chat=newMessageRecieved.chat;
        if(!chat.users)return console.log("chat.usrs not defined");
        chat.users.forEach(user=>{
            if(user._id==newMessageRecieved.sender._id)return;
            socket.in(user._id).emit("message recieved",newMessageRecieved)
        })
    })
    socket.off("setup",()=>{
        socket.leave(userData._id);
    })
})