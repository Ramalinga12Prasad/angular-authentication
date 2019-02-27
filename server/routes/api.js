const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()
const mongoose = require('mongoose')
const User = require('../models/user')

const db = "mongodb://127.0.0.1:27017/eventsDb"

mongoose.connect(db, err=>{
    if(err){
        console.error("Error"+err)
    }
    else{
        console.log("Connection to mongodb suceeded")
    }
})

function verifyToken(req, res, next){
    if(!req.headers.authorization){
        res.status(401).send('Unauthorized request1')
    }
    let token = req.headers.authorization.split(' ')[1]
    if(token === 'null')
        res.status(401).send('Unauthorized request2')
    let payload = jwt.verify(token, 'secretKey')
    
    if(!payload)
        res.status(401).send('Unauthorized request3')
    req.userId = payload.subject
    next()


}

router.get('/',(req,res)=>{
    res.send('from API route')
})


router.post('/register',(req,res)=>{
    let userData =req.body;
    let user = new User(userData)
    user.save((error,registeredUser)=>{
        if(error){
            console.log(error)
        }
        else{
            payload = { subject : registeredUser._id}
             token = jwt.sign(payload, 'secretKey')
            res.status(200).send({token})
            
        }
    })


})

router.post('/login',(req,res)=>{
    let userData = req.body
    User.findOne({email:userData.email},(error, user)=>
    {
        if(error)
        console.log(error);
        else{
            if(!user){
                res.status(401).send("Invalid email")
            }
            else{
                if(user.password != userData.password)
                res.status(401).send("Invalid Password")
                else
                  payload = { subject : user._id}
                 token = jwt.sign(payload, 'secretKey')
                res.status(200).send({token})
            }
        }
    })


})

router.get('/events', (req, res)=>{
    let events= [
        {
            "_id":"1",
            "name":"Auto Expo",
            "description":"lorum ipsum",
            "date":"2019-02-27W11:53:511Z"
        },
        {
            "_id":"2",
            "name":"Auto Expo",
            "description":"lorum ipsum",
            "date":"2019-02-27W11:53:511Z"
        },
        {
            "_id":"3",
            "name":"Auto Expo",
            "description":"lorum ipsum",
            "date":"2019-02-27W11:53:511Z"
        },
        {
            "_id":"4",
            "name":"Auto Expo",
            "description":"lorum ipsum",
            "date":"2019-02-27W11:53:511Z"
        },
        {
            "_id":"5",
            "name":"Auto Expo",
            "description":"lorum ipsum",
            "date":"2019-02-27W11:53:511Z"
        },

    ]
    res.json(events)
})

router.get('/special', verifyToken, (req, res)=>{
    let events= [
        {
            "_id":"1",
            "name":"Auto Expo",
            "description":"lorum ipsum",
            "date":"2019-02-27W11:53:511Z"
        },
        {
            "_id":"2",
            "name":"Auto Expo",
            "description":"lorum ipsum",
            "date":"2019-02-27W11:53:511Z"
        },
        {
            "_id":"3",
            "name":"Auto Expo",
            "description":"lorum ipsum",
            "date":"2019-02-27W11:53:511Z"
        },
        {
            "_id":"4",
            "name":"Auto Expo",
            "description":"lorum ipsum",
            "date":"2019-02-27W11:53:511Z"
        },
        {
            "_id":"5",
            "name":"Auto Expo",
            "description":"lorum ipsum",
            "date":"2019-02-27W11:53:511Z"
        },

    ]
    res.json(events)
})
module.exports = router