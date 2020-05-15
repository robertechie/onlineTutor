const User = require('../Models/user_model')
const jwt = require('jsonwebtoken');
module.exports = {
    auth: async (req, res, next) =>{
        const token = req.header('auth-token')
        //let verify the token 
        if(!token)return res.status(401).send("access denied")
        try {
            const verify = jwt.verify(token, process.env.TOKEN_SECRET)
            if(!verify)return res.status(401).send("access denied")
            req.user=verify
            next()
        } catch (error) {
            res.status(400).send("invalid token")
        }
    }
,
Student: async (req, res, next) =>{
    //let verify the token 
    try {
       const userid= req.user._id
       const role=await (await User.findOne({_id:userid})).toJSON()
       //res.status(400).send(role.Roles)
       
    if(role.Role !=='Student')
        return res.status(400).send("you are not authorized")
        next()
    } catch (error) {
        res.status(400).send("invalid token")
    }
},

Tutor: async (req, res, next) =>{
    //let verify the token 
    try {
       const userid= req.user._id
       const role=await (await User.findOne({_id:userid})).toJSON()
        if(role.Role !=='Tutor')
        return res.status(400).send("you are not authorized")
        next()
    } catch (error) {
        res.status(400).send("invalid token")
    }
},
Admin: async (req, res, next) =>{
    //let verify the token 
    try {
       const uid= req.user._id
       const brand= await (await User.findOne({_id:uid})).toJSON()
        if(brand.Role !== 'Admin')
        return res.status(400).send("you are not authorized")
        next()
    } catch (error) {
        res.status(400).send("invalid token")
    }
}

}