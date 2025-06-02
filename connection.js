const mongoose=require('mongoose')


mongoose.connect('mongodb://127.0.0.1:27017/mongodb-3')
.then(()=>
{
    console.log('mongodb connected');
    
})

.catch((err)=>
{
    console.log('mongodb not connected',err);
    
})
