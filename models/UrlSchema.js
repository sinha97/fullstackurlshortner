const mongoose = require("mongoose");
const shortid = require('shortid');

const Schema = mongoose.Schema;

const ShortUrlSchema = new Schema({
    fullUrl:{
        type:String,
        required:true
    },
    shortUrl:{
        type:String,
        required:true,
        default:shortid.generate()
    },
    urlClicks:{
        type:Number,
        required:true,
        default:0
    },
    pinnedUrl:{
        type:Boolean
    }
},{timestamps:true});

module.exports= mongoose.model("UrlList",ShortUrlSchema)
