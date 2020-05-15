require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mainRoute = require('./Route')
const mongoose = require('mongoose')
const app=express();

//middlewares
app.use(cors());
//accept only json in the app
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
//connect to database
try {
const url = 'mongodb+srv://Roberto:freeme2018@cluster0-xdavb.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(url,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,

})
} catch (error) {
    app.send(error)
}


//call in the route
app.use(mainRoute)

//the main page
app.get('/', (req,res)=>{
    res.send("Welcome to Robertechie online tutor api")
})

//let handle 404 errors
 app.use((req, res, next)=>{
          res.status(404).send(`no page like this is found in Robertechie online tutor api`);
     next();
    })
// //let handle error 500
app.use((err,req, res, next)=>{
   console.error(err.stack);
     console.log('something went wrong sorry');
})

const PORT=process.env.PORT || 3000;
app.listen(PORT, ()=>console.log(`server running on ${PORT}`));
