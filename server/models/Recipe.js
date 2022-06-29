const mongoose=require('mongoose');
const { Schema } = mongoose;

const RecipeSchema = new Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId
    },
    username:{
        type:String,
        default:"",
    },
    title:{
        type:String,
        required:true,
    },
    ingredients:{
        type:[String],
        required:true,
    },
    procedure:{
        type:String,
        required:true,
    },
    imageUrl:{
        type:String,
    },
    date:{
        type:Date,
        default:Date.now,
    }
});

const Recipe = mongoose.model('recipe', RecipeSchema);
module.exports = Recipe;