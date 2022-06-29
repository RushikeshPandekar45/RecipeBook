const mongoose = require('mongoose');

const mongourl = "mongodb://localhost:27017/RecipeBook?readPreference=primary&appname=MongoDB%20Compass&ssl=false"

const connectTomongo=()=>{
    mongoose.connect(mongourl,()=>{
        console.log("Connected to mongodb Successfully");
    });
}
module.exports = connectTomongo;