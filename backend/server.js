const express = require('express');
const cors=require('cors');
const dotenv=require('dotenv');


//dotenc in server.js
dotenv.config();


const app = express();
const PORT=5000;


//Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}))


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
            deleteMessages: 'DELET /api/messages'
        }
    });
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

app.listen(PORT,()=>{
    console.log(`Server is running at PORT number:${PORT}`)

})