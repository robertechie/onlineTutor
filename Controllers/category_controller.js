
const category = require('../Models/category_model')
const reg = require('../Models/SubjectRegistration_model')
const subjectm = require('../Models/subject_model')
const uu= require('uuid');
module.exports = {
    create: async (req, res) =>{
        //desturing for quick retrieving of inputs
        const { name } = req.body;
        //hash your password with bycrypt
        try {
             //create category        
            const categoryInsert = await category.create({
                cart_id:(uu.v4()),
                name:name
            })
        const details = await categoryInsert.save();
          // console.log(hashedPassword);
            return res.send(categoryInsert)
            //make another insertion into roles
            res.status(201).send()
          } catch(err) {
            res.status(500).send(err)
          }
    }
,
update: async (req, res) =>{
    const { name, uid } = req.body;
    //create the filter and update option
    const filter = { cart_id: uid };
    const update = { name: name };
    try {
         //update category        
        const categoryInsert = await category.findOneAndUpdate(filter, update)
        if(!categoryInsert)return res.status(401).send("unable to update")
      // console.log(hashedPassword);
      const vReturn = await category.findOne(filter)
        res.status(201).json({message:"Successfully updated",data:vReturn})
      } catch(err) {
        res.status(500).send(err)
      }
},
//delete category
delete: async (req, res) =>{
    const { uid } = req.body;
    //create the filter and update option
    const filter = { _id: uid };
    try {
         //delete        
        const categoryDelete = await category.remove(filter)
        if (categoryDelete.n === 0 && categoryDelete.ok === 1) {
            return res.send("Not found or already deleted")
        }
        res.status(201).send("Category Deleted");
      } catch(err) {
        res.status(500).send(err)
      }
},

  Retrieve_subject_tutor: async (req, res) =>{
  const { catid } = req.params;
  if(catid ==="") return res.status("401").send("Enter category id")
  //create the filter and update option
  const filter = { _id: catid };
  try {
      const getSubject = await category.findOne(filter).populate("Subjects").populate({path:'regID',populate: 'UserID'})
     // const details=getSubject.Subjects[0].regID[0]

      const subjectlisting=[
        `Tutor taking respective subject for ${getSubject.name} Category`
    ]
   
    for (let i = 0; i < getSubject.Subjects.length; i++) {
       // myob.subject = getSubject.Subjects[i].subject
       let myob={
        subject: getSubject.Subjects[i].subject,
        Tutors:[]
      }
        for(let j=0; j < getSubject.Subjects[i].regID.length; j++){
         //get the arrays
           const info = getSubject.Subjects[i].regID[j]
           let mainifo = await reg.findById({_id:info})
           let infoget = await reg.findById({_id:info}).populate("UserID")
          myob.Tutors.push({Name:infoget.UserID.first_name+" "+infoget.UserID.name})
        }
        subjectlisting.push(myob)
      }

      if(!getSubject) return res.status(401).send("No record found")
      res.status(201).json({subjectlisting});
    } catch(err) {
      res.status(500).send(err)
    }
},
  RetrieveAllsubject: async (req, res) =>{
      const { cat_id } = req.params;
      if(cat_id == "") return res.status("401").send("Enter a category id")
 
      //create the filter and update option
      try {
        const valu = await  category.find({_id: cat_id})
        if(!valu) return res.send("Category not found")
        //find the subject
        const categoryfilter = await category.findOne({_id: cat_id}).populate("Subjects") 
          if (!categoryfilter) {
              return res.send("Category not found")
          }
          const categorydetails =categoryfilter.name
          const subjects = []

          for(let i = 0; i < categoryfilter.Subjects.length; i++ ){
            let obj={
              subject: categoryfilter.Subjects[i].subject
            }
            subjects.push(obj)
          }
   
          res.status(201).send({
            Category:categorydetails,
            subjects
          });
        } catch(err) {
          if(err.name=="CastError") return res.status(401).send("invalid category")
          res.status(500).send(err)
        }
},

RetrieveAllCategories: async (req, res) =>{
  try {
    //retrieve all the categories
    const categoryfilter = await category.find()
      if (!categoryfilter) return res.status(400).send("unable to retrieve categories")
      const categories = []
      for(let i = 0; i < categoryfilter.length; i++ ){
        let obj={
          Category_name: categoryfilter[i].name
        }
        categories.push(obj)
      }

      res.status(201).send(categories);
    } catch(err) {
      if(err.name=="CastError") return res.status(401).send("invalid category")
      res.status(500).send(err)
    }
}

}