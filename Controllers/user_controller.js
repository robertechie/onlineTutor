
const User = require('../Models/user_model')
const Lessons = require('../Models/lesson_model')
const Subject = require('../Models/subject_model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

module.exports = {
    create: async (req, res) =>{
        //desturing for quick retrieving of inputs
        const { name, email, phone, password, role, first_name } = req.body;
        //hash your password with bycrypt
        try {
            const hashedPassword = await bcrypt.hash(password, 10)
            if(role != 'Tutor' && role !='Student'){
                return res.send("you can't register as admin or any other role other than than student or tutor");
            }
             //check if the user exist
            const exitsUser = await User.findOne({email:email})
            if(exitsUser) return res.status(401).send("User already exist")
             //create the user
            const user = await User.create({
                first_name:first_name,
                name,
                email,
                phone,
                hashedPassword,
                Role:role,
                Status:"active"
            })
       
        const details = await user.save();
          // console.log(hashedPassword);
            return res.send(user)
            //make another insertion into roles
            res.status(201).send()
          } catch(err) {
            res.status(500).send(err)
          }
    }
 ,
  login: async (req, res) =>{
      //validate the user first
        const {email,password} = req.body;
        //validate the user
        const user = await User.findOne({email:email})
        if(!user) return res.status(401).send("User not found")
        //verify the password and create token with jwt
        try {
           const validuser = await bcrypt.compare(password,user.hashedPassword)
            if(!validuser) return res.status(400).send("invalid password")
            //return a success message
            //sign our token with json webtoken
            const token = jwt.sign({_id:user._id},process.env.TOKEN_SECRET)
            //add the token to the header
            res.header('auth-token', token).send(token)
           // req.sumele=token;
            //res.status(201).send("Sucess")
          } catch(err) {
            res.status(500).send(err)
          }
    },
  RetrieveTutuor: async(req, res) => {
    try {
      const alltutors = await  User.find({Role:'Tutor'})
      if(!alltutors) return res.status(401).send("No records found")
      const myobj=[
        "Total Tutors: "+alltutors.length
      ]
      alltutors.map(doc =>{
          myobj.push({
            id:doc._id,
            name: doc.name,
            email:doc.email,
            phone:doc.phone
          })  
      }).sort()

      return res.status(200).send(myobj)
      
    } catch (error) {
      return res.status(500).send(error)
    }

  }
  ,
  RetrieveTutuorByID: async(req, res) => {
    const {id} = req.params
    try {
      const tutor = await  User.findOne({_id:id, Role:'Tutor'})
      if(tutor.length<=0) return res.status(401).send("No records found")
    const myobj={
            id:tutor._id,
            name: tutor.name,
            email:tutor.email,
            phone:tutor.phone,
            user_type:tutor.Role
          } 
      
      return res.status(200).json(myobj)
      
    } catch (error) {
      return res.status(500).send(error)
    }

  },
  DeactivateTutor: async(req, res) => {
    const {userid} = req.body
    try {
      const tutor = await  User.findOneAndUpdate({_id:userid, Role:'Tutor'},{Status:'inactive'})
      if(!tutor) return res.status(401).send("Operation not successfull")
  
      return res.status(200).json("Tutor Deactivated")
      
    } catch (error) {
      return res.status(500).send(error)
    }

  },
  ActivateTutor: async(req, res) => {
    const {userid} = req.body
    try {
      const tutor = await  User.findOneAndUpdate({_id:userid, Role:'Tutor'},{Status:'active'})
      if(!tutor) return res.status(401).send("Operation not successfull")
  
      return res.status(200).json("Tutor Activated")
      
    } catch (error) {
      return res.status(500).send(error)
    }

  },

  SearchTutuor: async(req, res) => {
    const {firstname} = req.params
   
    try {
      const tutorfilter = await User.find({Role:'Tutor',first_name: {$regex: firstname, $options: 'i'}}).sort({firstname:1})  
      if(tutorfilter.length<=0) return res.status(401).send("No records found")

      const tutorlisting = []
      tutorfilter.forEach((tutor, i)=>{
        const myob={
          Tutor_first_name:tutor.first_name,
          Tutor_second_name:tutor.name,
          Tutor_email:tutor.email,
          Tutor_phone:tutor.phone
        }
        tutorlisting.push(myob)
      })

      return res.status(200).json(tutorlisting)
      
    } catch (error) {
      return res.status(500).send(error)
    }

  },
  MakeTutorAdmin: async(req, res) => {
    const {id} = req.params
    try {
      const tutorfilter = await User.findByIdAndUpdate({_id:id,Role:'Tutor'},{Role:'Admin'})  
      if(!tutorfilter) return res.status(401).send("No records found")

      return res.status(200).json("Operation successful")
      
    } catch (error) {
      return res.status(500).send(error)
    }

  }



}