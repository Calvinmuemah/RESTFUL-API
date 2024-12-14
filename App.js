const express = require("express")
const mongoose = require('mongoose')
const createError = require("http-errors")
const app = express()

app.use(express.json())

// mongodb+srv://kelvinmuemah855:<db_password>@cluster0.s87kg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
// connecting to mongoose
mongoose.connect('mongodb+srv://cluster0.s87kg.mongodb.net/',{
    dbName:'RestApi',
    user:'kelvinmuemah855',
    pass:'kelvinmuemah855'
    // useFindAndModify: false
})
.then(() =>{
    console.log("MongoDB is connected...")
}) 
// to handle the err when there is an error in connecting in the db
.catch(err => console.log(err.message))
mongoose.connection.on('connected', ()=>{
    console.log("MongoDB is connected to db...")
})

mongoose.connection.on('error', (err)=>{
    console.log("err.message")
})

mongoose.connection.on('disconnected', ()=>{
    console.log("MongoDB is disconnected to db...")
})

process.on('SIGINT', () =>{
    mongoose.connection.close(()=>{
        console.log(123)
        console.log("MongoDB is connection is disconnected due to app termination...")
        process.exit(0)
    })
})

// locally
// mongoose.connect('mongodb://localhost:27017/RestApi',{
//     // useNewUrlParser:true,
//     // useUnifiedTopology:true
// })
// .then(() =>{
//     console.log("MongoDB is connected...")
// })


const products = require('./routes/products')
app.use('/products', products)
// handle all routes
// app.all('/test', (req, res) =>{
//     // console.log(req.query)
//     // res.send(req.query)
// })
// for ids
// app.all('/test/:id/:name', (req, res) =>{
//     console.log(req.params)
//     res.send(req.params)
// })
// for req body
app.all('/test', (req, res) =>{
        console.log(req.body)
        res.send(req.body)
    })



// to send error when a page that does note exist is accessed
// this is not the correct way to do so
// app.use((req, res, next) =>{
//     res.status(404)
//     res.send({
//         error: ("Not found") 
//     })
// })
// the correct way is using express error handler
// using npm package "http-errors"
app.use((req, res, next) =>{
    
    next(createError(404,'Not found'))//to pass the error to the error handler//
})
// manual
// app.use((req, res, next) =>{
//     const err = new Error("Not found")
//     err.status = 404
//     next(err)//to pass the error to the error handler//
// })
// error handler
app.use((err, req, res, next) =>{
    //we handle our errors
    res.status(err.status || 500)
    res.send({
        error: {
            status: err.status || 500,
            message: err.message
        }
    });
});


const port = 5000;
app.listen(port, ()=>{
    console.log(`you are listening to port :${port}`)
});