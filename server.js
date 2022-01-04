const express = require('express')
const mongoose = require('mongoose')
const userdata = require('./database/db')
var bodyParser = require('body-parser')
require('dotenv').config();

const DB = process.env.DATABASE

mongoose.connect(DB, { useNewUrlParser: true ,useUnifiedTopology: true  })
.then(()=> console.log('database is connected'))
.catch((err)=>console.log(err))

const app  = express();
app.use(bodyParser.urlencoded({extended:true}))

app.use(bodyParser.json());
app.use(express.static('public'))
app.set('view engine' , 'ejs')

app.get('/',(req,res)=>{
    userdata.find({},(err,items)=>{
        if(err){
            res.send('error getting data')
        }
        else {
            res.render('index', {items : items})
        }
    })
})

app.get('/add',(req,res)=>{
    res.render('add')
})


app.post('/add',(req,res)=>{
    var itemdata = new userdata(req.body);
   
    itemdata.save((err)=>{
        if(err) {
            res.send('error post')
        }
        else{
            res.send('post success')
        }
    })

})


app.get('/edit',(req,res)=>{
    userdata.find({},(err,items)=>{
        if(err){
            res.send('error getting data')
        }
        else {
            res.render('edit', {items : items})
        }
    })
})

app.get('/delete/:id',(req,res)=>{
    userdata.findByIdAndRemove(req.params.id,function(err) {
        if (err) {
            res.send('not deleted');
        } else {
            res.redirect('/edit');
        }
    });
})

app.get('/editdata/:id',(req,res)=>{
    userdata.findById(req.params.id,(err,items)=>{
        if(err){
            res.send('error getting data')
        }
        else{
            res.render('editdata',{items:items})
        }
    })
})


app.post('/editdata/:id',(req,res)=>{
   
    userdata.findByIdAndUpdate(req.params.id, req.body , (err,items)=>{
      if(err){
          res.send('eror')
      }
      else{
          res.redirect('/edit')
      }
  })
})


const port = process.env.PORT

app.listen(port)
