const mongoose  = require('mongoose');
const RoleSchema = new mongoose.Schema({
    Role:{
        type:String,
        required: 'Role name is required!'
    },
   
},{
    timestamps:true
})

module.exports = mongoose.model('Roles',PostSchema);