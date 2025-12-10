const express = require('express');
const cors=require('cors');
const dotenv=require('dotenv');
const http=require('http');
const {Server}=require('socket.io');
const {addMessage}=require('./controllers/messageControllers')


//dotenc in server.js
dotenv.config();


const app = express();
const server=http.createServer(app);
const io = new Server(server,{
    cors:{
        origin:"*",
        methods:["GET","POST"]
    }
})
const PORT= process.env.PORT || 5000;


//Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))


//Routes in server.js
app.use('/api/messages',require('./routes/messageRoutes'))


//root route
app.get('/',(req,res)=>{
    res.send({
        message:"Chat API Server",
        version: '1.0',
        endpoints: {
            getMessage: 'GET /api/messages',
            createMessages: 'POST /api/messages',
            deleteMessages: 'DELET /api/messages',
            testClient:'GET /index.html'
        }
    });
})

//Socket connection in backend
io.on('connection', (socket)=>{
    console.log("user socket id is :",socket.id );

    //USer connect to server
    socket.emit('message',{
        user: "system",
        text: "Welcome to the chat!",
        timestamp: new Date().toISOString()
    })

    socket.broadcast.emit('message',{
        user: 'Sytem',
        text: 'A new user joined the chat',
        timestamp: new Date().toISOString()
    })

    // User disconnect to server
    socket.on('disconnect',()=>{
        console.log("User Disconnected", socket.io);
        io.emit('message',{
            user:'System',
            text: 'A user left the chat',
            timestamp: new Date().toISOString()
        })
    })

    //typing function in backend
    socket.on('typing',(data)=>{
        socket.broadcast.emit('userTyping',data);
    })

    //send and recive messages
    socket.on('sendMessage',(data)=>{
        const newMessage=addMessage(data);

        io.emit('receiveMessage',newMessage);
    })
})


// Test route
app.get('/test',(req,res)=>{
    res.json ({
        message: 'Server is working perfect',
        timestamp: new Date(),
        status: 'sucess'
    })
})

//Error Handelling
app.use((req,res)=>
{
    res.status(404).json({
        success:false,
        message: 'Route not Found'
    })
})

app.use((err,req,res,next)=>{
    console.log(err.stack);
    res.status(500).json({
        success:false,
        message: 'Something went wrong',
        error:err.message
    })
})

server.listen(PORT,()=>{
    console.log(`Server is running at PORT number:${PORT}`)

})