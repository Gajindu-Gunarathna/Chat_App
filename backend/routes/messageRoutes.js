const express = require('express');
const router=express.Router();
const{
    getMessages,
    createMessages,
    deleteAllMessages
}=require('../controllers/messageControllers')


//Gett All Messages
router.get('/',getMessages);

//POST 
router.post('/',createMessages);

//Delete
router.delete('/',deleteAllMessages);

module.exports=router;