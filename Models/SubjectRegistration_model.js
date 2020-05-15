const mongoose = require('mongoose');
const Subject = require('../Models/subject_model')
const RegSchema = new mongoose.Schema({
    SubjectID :
    {type: mongoose.Schema.Types.ObjectId,
    ref:'Subject'
    },

    UserID:{type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        require:true
    },
    
    Registration_date:{
        type:Date
    }
},{
    timestamps: true
});
RegSchema.pre('remove', function(next){
    Subject.remove({_id: {$in: this.Subject}}).then(()=>next)
})
module.exports = mongoose.model('SubjectRegistration',RegSchema);