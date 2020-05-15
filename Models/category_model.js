const Subject = require('../Models/subject_model')
const mongoose = require('mongoose');
const Categoryschema = new mongoose.Schema({
    cart_id :{
        type:String,
        required: 'UID Required',
        unique: true
    },
    name :{
        type:String,
        required: 'Category name is required!',
        unique: true
    },
  
    Subjects :
    [{type: mongoose.Schema.Types.ObjectId,
    ref:'Subject'
}]
 
},{
    timestamps: true
});

// Categoryschema.pre('remove', function(next){
//     Subject.remove({_id: {$in: this.Subject}}).then(()=>next)
// })
// Categoryschema.pre('remove', function(callback) {
//     // Remove all the docs that refers
//     this.model('Subject').findByIdAndDelete({ Category: this._id }, callback);
// });
//cascade delete middleware
// Categoryschema.post("remove", document => {
//     const category_id = document._id;
//     Subject.find({ Category:category_id }).then(category => {
//         category.forEach(bia=>{
//             Promise.all(
//                 Subject.findOneAndDelete( {Category: bia._id } )
//               ).catch(err=>console.log(err));
//         })
   
//     });
   
//   });
  
//   product = await product.deleteOne();
// await Product.findById(product._id); 


module.exports = mongoose.model('Category',Categoryschema);

