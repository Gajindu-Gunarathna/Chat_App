const express = require('express');
const app = express();

const PORT=55001;

//root route
app.get('/',(req,res)=>{
    res.send('Hello Server');
})

// Test route
app.get('/test',(req,res)=>{
    res.json ({
        message: 'Server is working perfect',
        timestamp: new Date(),
        status: 'sucess'
    })
})


app.listen(PORT,()=>{
    console.log(`Server is running at port number:${PORT}`)

})