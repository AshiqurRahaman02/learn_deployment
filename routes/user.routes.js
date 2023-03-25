const express = require('express');
const {UserModel} = require('../model/user.model')
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt');

const userRoute = express.Router()


userRoute.post("/register", async(req, res)=>{
    const {email,password,location,age} = req.body
    try {
        bcrypt.hash(password,5,async(err,hash)=>{
            const user = new UserModel({email, password: hash,location,age})
            console.log(user)
            await user.save()
            res.status(200).send({"message":"User has been successfully registered"})
        })
    } catch (error) {
        res.status(404).send(error)
        console.log(error)
    }
})


userRoute.post("/login", async(req, res)=>{
    const {email,password} = req.body
    try {
        const user =await UserModel.findOne({email})
        if(user){
            bcrypt.compare(password,user.password,async(err,result)=>{
                result? res.status(200).send({"message":"Successfully logged in","token":jwt.sign({ "userID": user._id }, 'deathNote')}):res.status(404).send({"message":"Invalid credentials"})
            })
        }
    } catch (error) {
        res.status(404).send(error)
        console.log(error)
    }
})


userRoute.get("/details", async(req, res)=>{
    const {token} = req.query
    jwt.verify(token , "deathNote" , (err, decoded)=>{
        decoded ? res.status(200).send({"message":"User details"}) : res.status(404).send({"message":err.message})
    })
})


userRoute.get("/moviedata", async(req, res)=>{
    const {token} = req.query
    if(token == "abc@123"){
        res.status(200).send("Moviedata")
    }else{
        res.status(404).send({"message":"Access denied"})
    }
})

module.exports = {userRoute}