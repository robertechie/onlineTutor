
const category = require('../Models/category_model')
const subject = require('../Models/subject_model')
const uu= require('uuid');
module.exports = {
    //using many to many relationship
    create: async (req, res) =>{
        //desturing for quick retrieving of inputs
        const { name, cart_ids } = req.body;
        try {
             //create subject   
            const cat = await category.findById({_id:cart_ids})
            const subjectInsert = await subject.create({
                subject:name,
                Category:cat
            })
            //save subjects
          const details = await subjectInsert.save();
           //push into details
          cat.Subjects.push(details)
          const fl =  await cat.save()
            //print your details
            res.status(201).send({
              message:"Registration successful",
              data:fl
            })
          } catch(error) {
            res.status(500).send(error)
      }
    }
,
    update: async (req, res) =>{
    const { ids, nameup } = req.body;
    //create the filter and update option
    const filter = { _id: ids }
    const update = { subject: nameup }

    try {
        const subjectUpdated = await subject.findByIdAndUpdate(filter,update)
        if(!subjectUpdated)return res.status(401).send("unable to update subject")
        const updatedinfo = await subject.findById(filter)
        res.status(201).json({message:"Successfully updated",data:updatedinfo})
      } catch(err) {
        res.status(500).send(err)
      }
},
//delete a subject
    delete: async (req, res) =>{
    const { ids } = req.body;
    //create the filter and update option
    const filter = { _id: ids };
    try {
         //delete        
        const subjectDelete = await subject.remove(filter)
        if (subjectDelete.n === 0 && subjectDelete.ok === 1) {
            return res.send("User not not found or already deleted")
        }
        res.status(201).send("Subject Deleted");
      } catch(err) {
        res.status(500).send(err)
      }
},

RetrieveSubject: async (req, res) =>{
  const { subid } = req.params;
  if(subid == "") return res.status("401").send("Enter a subject id")
  //create the filter and update option
  try {
    //find the subject
    const subjectfilter = await subject.findOne({_id: subid}).populate("Category") 
      if (subjectfilter<=0) {
          return res.send("Subject not found")
      }
    const myob={
      subject_Name:subjectfilter.subject,
      Category:subjectfilter.Category.name
    }
      res.status(201).send(myob);
    } catch(err) {
      res.status(500).send(err)
    }
},
  SearchSubject: async (req, res) =>{
  const { subname } = req.params;
  try {
    //find the subject
    //subjectfilter.find({subject: {$regex: subname, $options: 'i'}}).limit(5);
    const subjectfilter = await subject.find({subject: {$regex: subname, $options: 'i'}}).sort({subject:1})
      if (subjectfilter<=0) return res.send("Subject not found")
      const subjectlisting = []
      subjectfilter.forEach((sub, i)=>{
        const myob={
          subject_Name:sub.subject,
        }
        subjectlisting.push(myob)
      })

      res.status(201).send(subjectlisting);
    } catch(err) {
      res.status(500).send(err)
    }
}

}