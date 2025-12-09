//mock database -array to store message
let messages = [
    {
        id:1,
        text: "hello welcome to the real chat application bootcamp",
        user: "Jhone",
        timestamp: new Date().toISOString(),
    },

    {
        id:2,
        text: "hello welcome to the real chat application bootcamp",
        user: "RaRu",
        timestamp: new Date().toISOString(),
    },
];

//Get all messages
const getMessages=(req,res)=>{
    //advantages of express have error handelling
    try{
        res.json({
            sucess:true,
            count: messages.length,
            data:messages
        })
    }catch(error){
        res.status(500).json({
            sucess:false,
            message:'Server Error',
            error:error.message
        })
    }
}

//POST the message
const createMessages=(req,res)=>{
    try {
        const {text,user}=req.body;

        //validations
        if(!text || !user){
            return res.status(400).json({
                sucess:false,
                message: 'Please provide text for the message'
            })
        }

        const newMessage={
            id:messages.length+1,
            text,
            user,
            timestamp: new Date().toISOString()
        }

        messages.push(newMessage),
        res.status(200).json({
            sucess:true,
            message:'Message Created',
            data: newMessage
        })
    } catch (error) {
        res.status(500).json({
            sucess:false,
            message:'Server Error',
            error:error.message
        })
    }
}

//Delete Messages
const deleteAllMessages=(req,res)=>{
    try {
        messages=[];
        res.json({
            sucess:true,
            message:'All messages Deleted'
        })
    } catch (error) {
        res.status(500).json({
            sucess:false,
            message:'Server Error',
            error:error.message
        })
    }
}

//Adding new messages
const addMessage=(messageData)=>{
    const newMessage={
        id:messages.length+1,
        text:messageData.text,
        user:messageData.user,
        timestamp: new Date().toISOString()
    }

    messages.push(newMessage);  
    return newMessage;
}

module.exports={
    getMessages,
    createMessages,
    deleteAllMessages,
    addMessage
}