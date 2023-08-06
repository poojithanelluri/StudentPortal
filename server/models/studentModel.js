const mongoose = require('mongoose')

const Schema = mongoose.Schema

const studentSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  id: {
    type: Number,
    required: true
  },
  stream: {
    type: String,
    required: true
  },
  experience: {
    type: Number,
    required: true
  },
  dob: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  }
}, { timestamps: true })

module.exports = mongoose.model('student', studentSchema)
