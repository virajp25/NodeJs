const router = require('express').Router()
const userModel = require('../model/user.module')
const crypto = require('crypto-js')
const authMiddleware = require('../middleware/auth.middleware')

router.post('/register',async(req,res)=>{
    try {
        const {name} = req.body
        var str = name + new Date().getTime()
        const apiKey = crypto.SHA256(str).toString().slice(0,20)

        const userCreated = new userModel({name,apiKey})
        await userCreated.save()
        
        res.json({status:200, success:"user Created"})
    } catch (error) {
        
    } 
})

router.get('/login',authMiddleware.userAuthMiddle,async(req,res)=>{
    try {
        if (req.user) {
        res.json({status:200, success:req.user})
        }
        
    } catch (error) {
        
    }


})

module.exports = router