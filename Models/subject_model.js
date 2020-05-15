const mongoose = require('mongoose');
const subjectSchema = new mongoose.Schema({
     subject :{
        type:String,
        required: 'Subject name is required!'
    },
    Category :{type: mongoose.Schema.Types.ObjectId,
        ref:'Category'},
        
    regID:[
        {type: mongoose.Schema.Types.ObjectId,
        ref:'SubjectRegistration'
        }
        ]

},{
    timestamps: true
})

module.exports = mongoose.model('Subject',subjectSchema);

