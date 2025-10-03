const express = require("express");
const http = require("http");
const app = express();
const path = require("path")
const {Server} = require("socket.io");
const server = http.createServer(app);

const io = new Server(server); //this io is for input/output this will control for the sockets

//Sockets
io.on("connection",(socket)=>{
    socket.on("user-message",(message)=>{
        console.log("new user message", message);

        // send message back to all clients (including sender)
        io.emit("message", message);
    });
})

app.use(express.static(path.resolve("./public")));

app.get('/',(req,res)=>{
    return res.sendFile(path.resolve('./public/index.html'));
})

server.listen(9000,()=>{
    console.log(`Server started at PORT 9000`)
})
