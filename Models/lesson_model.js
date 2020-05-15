const mongoose = require('mongoose');
const lessonSchema = new mongoose.Schema({
    Lessons :
    {type: mongoose.Schema.Types.ObjectId,
    ref:'Subject'
    },

    User:{type: mongoose.Schema.Types.ObjectId,
        ref:'User',
    },

    bookby:{type: mongoose.Schema.Types.ObjectId,
        ref:'User'}
},{
    timestamps: true
});

lessonSchema.indexes({
    Lessons: 1,
    User: 1,
  }, {
    unique: true,
  });

module.exports = mongoose.model('Lesson',lessonSchema);