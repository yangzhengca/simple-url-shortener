const express = require('express')
const mongoose = require('mongoose')
const ShortUrl = require('./models/shortUrl')
const app = express()

const PORT=process.env.PORT || 3000
const MONGO_URL = 'mongodb://localhost/urlShortener'

mongoose.connect(MONGO_URL,{useNewUrlParser:true,useUnifiedTopology: true })



app.set('view engine','ejs')
app.use(express.urlencoded({extended: false}))

app.get('/',async (req,res)=>{
    const shortUrls= await ShortUrl.find()
    res.render('index',{shortUrls:shortUrls})
})

app.post('/shorturls',async (req,res)=>{
    await ShortUrl.create({full:req.body.fullUrl})
    res.redirect('/')
})


app.get('/:shortUrl', async (req, res) => {
    const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl })
    if (shortUrl == null) return res.sendStatus(404)
  
    shortUrl.clicks++
    shortUrl.save()
  
    res.redirect(shortUrl.full)
})

app.listen(PORT,()=>{
    console.log(`listen on port: ${PORT}`)
}) 