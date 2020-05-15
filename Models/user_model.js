const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    first_name :{
        type:String,
        required: 'Name is required!'
    },
    name :{
        type:String,
        required: 'Name is required!'
    },
    email: {
        type:String,
        required: 'Email is required'
    },
    phone:{
        type:Number
    },
    hashedPassword:{
        type:String,
        require: 'Pasword is required',
    },
    Role :{
        type:String,
        required:'User type is required'
    },
    Status :{
        type:String,
        required:'User type is required',
    },
    Subjects :
   [{type: mongoose.Schema.Types.ObjectId,
        ref:'SubjectRegistration',
    }],

    Lessons :
    [{type: mongoose.Schema.Types.ObjectId,
    ref:'Lesson',
    },
    
],
    
},{
    timestamps: true
})

module.exports = mongoose.model('User',UserSchema);

