const mongoose= require('mongoose')
const postSchema = mongoose.Schema({
    name:String,
    price:Number,
    featured:Boolean,
    rating:Number,
    company:String,
    
    createdAt:{
        type:Date,
        default:new Date(),
    }
});

module.exports = mongoose.model('model',postSchema)
