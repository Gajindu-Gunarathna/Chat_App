//mock database
let messages = [
    {
        id:1,
        text: "hello welcome to the real chat application bootcamp",
        user: "Jhone",
        timestamp: new DataTransfer().toISOString(),
    },

    {
        id:2,
        text: "hello welcome to the real chat application bootcamp",
        user: "RaRu",
        timestamp: new DataTransfer().toISOString(),
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