const express = require("express");
const bodyParser = require("body-parser")
const mongoose = require("./database");

const UrlList = require("./models/UrlSchema.js")
const app=express();

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.get('/',async(req,res)=>{
    const allShortUrl = await UrlList.find()
    res.status(200).send(allShortUrl)
})

app.post('/shorturl',async(req,res)=>{
console.log('req.body.fullUrl',req.body.fullUrl,'req.body',req.body)
    if (!req.body.fullUrl) {
        console.log("Invalid data passed into request");
        return res.sendStatus(400);
      }
    
      let newAddedUrl = {
        fullUrl: req.body.fullUrl
      };
    
      UrlList.create(newAddedUrl)
        .then((addUrl) => {
          res.status(202).send(addUrl);
        })
        .catch((error) => {
          console.log(error);
          res.sendStatus(400);
        });
// await UrlList.create({fullUrl:req.body.fullUrl})

res.redirect('/')
})

app.get('/:shortUrl',async (req,res)=>{
    const short = await UrlList.findOne({shortUrl:req.params.shortUrl});
    if(short == null){
        return res.sendStatus(404)
    }

    short.urlClicks = short.urlClicks +1;
    await short.save();


    res.redirect(short.fullUrl)

})

app.put("/:shortUrl",async (req,res)=>{
        await UrlList.findOneAndUpdate({shortUrl:req.params.shortUrl},
            {pinnedUrl:req.body.pinnedUrl
        }).then((addUrl) => {
            res.status(204).send(addUrl);
          }).catch((err)=>{
            console.log(err);
            res.sendStatus(400);
        })
})

const port = 5000;

const server = app.listen(port,()=>console.log(`Server is running on ${port}`))