
const User = require('../Models/user_model')
const Lessons = require('../Models/lesson_model')
const Subject = require('../Models/subject_model')
module.exports = {
  bookLesson: async (req, res) =>{
    //desturing for quick retrieving of inputs
    const { ids,userid,bookby } = req.body;
    //look for the info for all the stuff
    const subfilter = { _id: ids }
    const userfilter = { _id: userid }
    const userBookfilter = { _id: userid }
    try {
        //get all the items via the find
        const findSubject = await Subject.findById(subfilter)
        if(!findSubject) return res.send("subject not found")
        //find user
        const findUser = await  User.findById(userfilter)
        if(!findUser) return res.send("user not found")
        //find bookinguser
        const findBookedUser = await User.findById(userBookfilter)
        if(!findBookedUser) return res.send("Creator user not found")
        //next book the lesson
        //check if a particular lesson has been created for a user
     // const getLess
       const  objLesson= {
          Lessons:findSubject,
          User:findUser
        }
        const loadLessons= await Lessons.findOne(objLesson)
        if(loadLessons) return  res.send("lesson already booked for this user")

        const lessDetails=await Lessons.create({
          Lessons:findSubject,
          User:findUser,
          bookby:findBookedUser,
        })
      
      const response=await lessDetails.save()
        //pick the response and save it in users lessons
        findUser.Lessons.push(response)
       const booklesson=await findUser.save()
      // console.log(hashedPassword);
      if(!booklesson)res.send("Failed to book lesson for a user")
      res.status(200).send({message:"lesson booked"})
        //make another insertion into roles
       // res.status(201).send()
      } catch(err) {
        res.status(500).send(err)
      }
  },
  
  updateLesson: async (req, res) =>{
    //desturing for quick retrieving of inputs
    const {lessonid, subject} = req.body;
    //look for the info for all the stuff
    const filterLesson = { _id: lessonid }
    const fillterSubject = { _id: subject }
    try {
        //get all the items via the find
        const findSubject = await Subject.findById(fillterSubject)
        const lessonup={Lessons:findSubject}
        if(!findSubject) return res.send("subject not found")
        //find lesson and update
        const lessonUpdate = await Lessons.findByIdAndUpdate(filterLesson,lessonup)
        if(!lessonUpdate) return res.send("Lesson cannot be updated")
        //find the lesson after the update
        const loadLessons= await Lessons.findOne(filterLesson)
        if(loadLessons) return res.status(200).json({message:"Lesson successfully updated",
      "returned_data":loadLessons})
      } catch(err) {
        res.status(500).send(err)
      }
  },
  //Admin can retrieve all lessons
  LessonRetrieve:async (req, res) =>{
    try {
        //get all the items via the find
        const lessonRetrieve = await Lessons.find().populate('Lessons').populate('User').populate('bookby')
                   
        //let me use a loop to populate my list
        const myobarray=[
            `total_lesson_booked: ${lessonRetrieve.length}`
        ]
        for (let i = 0; i < lessonRetrieve.length; i++) {
            let myob={
                Lesson_ID:lessonRetrieve[i]._id,
                Subject:lessonRetrieve[i].Lessons.subject,
                Student_name:lessonRetrieve[i].User.name,
                Boking_made_by:{
                    Name:lessonRetrieve[i].bookby.name,
                    Booker_privelege:lessonRetrieve[i].bookby.Role
                }
            }
            myobarray.push(myob)
          }
        //create an object to extract all the details
        //if(!lessonRetrieve) return res.status(401).send("Nothing to find")
        return res.status(200).send(myobarray)
      } catch(err) {
        res.status(500).send(err)
      }
  },
LessonByID:async (req, res) =>{
        try {
          const {id} = req.params;
          //const subfilter = { _id: ids }
          //get lesson by id
          const lessonbyID= await Lessons.findById({_id:id}).populate('Lessons').populate('User').populate('bookby')
         if(!lessonbyID)return res.status(401).send("unable to fetch lesson")
            const myobj={
                lesson_id:lessonbyID._id,
                Subject_Name:lessonbyID.Lessons.subject,
                Student_name:lessonbyID.User.name,
                Boking_made_by:{
                    Name:lessonbyID.bookby.name,
                    Booker_privelege:lessonbyID.bookby.Role
            }
        }

      return  res.status(200).send(myobj)
        } catch (error) {
            res.send(err)
        }
        
    },
//admin can delete a lesson comming soon
DeleteLesson:async (req, res) =>{
  try {
    const {id} = req.params;
    const lessonbyID= await Lessons.deleteOne({_id:id})
    if (lessonbyID.n === 0 && lessonbyID.ok === 1) {
      return res.send("Lesson not found or already deleted")
  }
  res.status(201).send("Lesson Deleted");

return  res.status(200).send(myobj)
  } catch (error) {
      res.send(err)
  }
  
}
 

}