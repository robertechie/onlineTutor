
const User = require('../Models/user_model')
const Registration = require('../Models/SubjectRegistration_model')
const Subject = require('../Models/subject_model')
module.exports = {
  RegisterSubject: async (req, res) =>{
    //desturing for quick retrieving of inputs
    const { ids} = req.body;
    const id  = req.user._id
    //look for the info for all the stuff
    const subfilter = { _id: ids }
    const userfilter = { _id: id }
    try {
        //get all the items via the find
        const findSubject = await Subject.findById(subfilter)
        if(!findSubject) return res.send("subject not found")
        //find user
        const findUser = await  User.findById(userfilter)
        if(!findUser) return res.send("user not found")
        //next Register the course
       const  objsubject= {
        SubjectID:findSubject,
        UserID:findUser
        }
        //check if registration exist
        const loadsubject= await Registration.findOne(objsubject)
        if(loadsubject) return  res.status(401).send("Subject already registered")

        const subjectDetails = await Registration.create({
            SubjectID:findSubject,
            UserID:findUser,
            Registration_date:Date.now()
        })
      const response = await subjectDetails.save()
     
      if(!response) return res.status(401).send("Subject registration failed ")
       //{own created middlewares for saving into reference models} 
     await User.findByIdAndUpdate({_id:findUser._id},{$push:{Subjects:response}})
     await Subject.findByIdAndUpdate({_id:findSubject._id},{$push:{regID:response}})

    //{end created middlewares} 
      return res.status(200).send({message:"Subject successfully registered"})
       // res.status(201).send()
      } catch(error) {
        res.status(500).send(error)
      }
  },
  
updateRegisteredSubject: async (req, res) =>{
    //desturing for quick retrieving of inputs
    const {regID, subject} = req.body;
    //look for the info for all the stuff
    const filterReg = { _id: regID }
    const fillterSubject = { _id: subject }
    try {
        //get all the items via the find
        const findSubject = await Subject.findById(fillterSubject)
        const updateSub={SubjectID:findSubject}
        if(!findSubject) return res.send("subject not found")
        //find subjectReg and update
        const regUpdate = await Registration.findByIdAndUpdate(filterReg,updateSub)
        if(!regUpdate) return res.send("Reg cannot be updated")
        //find the lesson after the update
        const loadReg= await Registration.findOne(filterReg)
        if(loadReg) return res.status(200).json({message:"Subject Reg successfully updated",
      "returned_data":loadReg})
      } catch(err) {
        res.status(500).send(err)
      }
  },
 
   //Tutor can retrieve all subject picked to teach
   RetrieveAllsubject:async (req, res) =>{
    try {
        //const { ids }= req.params
        const ids= req.user._id
        //get all the items via the find
        const RegRetrieved = await Registration.find({_id: ids}).populate('SubjectID').populate('UserID')
        //let me use a loop to populate my list
        const myobarray=[
            `total course registered: ${RegRetrieved.length}`
        ]
        for (let i = 0; i < RegRetrieved.length; i++) {
            let myob={
                Subjec_Reg:RegRetrieved[i]._id,
                Subject:RegRetrieved[i].SubjectID.subject,
                Date_Registered:RegRetrieved[i].Registration_date
            }
            myobarray.push(myob)
          }
        return res.status(200).send(myobarray)
      } catch(err) {
        res.status(500).send(err)
      }
  },
 DeleteRegisteredSubject:async (req, res) =>{
        try {
          const { id } = req.params;
          let userinfo = req.user._id
          //load the complete items
        const findUser = await  User.findById(userinfo)
        
        const CourseReg = await Registration.findOne({_id:id,UserID:findUser})
       // return res.send(CourseReg)
         if(!CourseReg) return res.status(401).send("Subject not registered or deleted")
         const reg = await Registration.deleteMany({_id:id, UserID:findUser})

       //cascade delete from reference teble for user
      await User.findByIdAndUpdate( { _id: findUser._id }, { $pull: {Subjects : CourseReg._id}} )
      //cascade delete from reference teble for subject
      await Subject.findByIdAndUpdate( { _id: CourseReg.SubjectID }, { $pull: {regID : CourseReg._id}} )
    //end of cascade
        if(reg.n === 0 && reg.ok === 1)return res.status(401).send("Operation failed")
        return res.status(200).send("Record successfully deleted")
        } catch (error) {
            res.send(error)
        }
    }
}