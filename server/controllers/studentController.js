const Student = require('../models/studentModel')
const mongoose = require('mongoose')

// get all wtudents
const getStudents = async (req, res) => {
  const students = await Student.find({}).sort({createdAt: -1})

  res.status(200).json(students)
}

// get a single wtudent
const getStudent = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such student'})
  }

  const student = await Student.findById(id)

  if (!student) {
    return res.status(404).json({error: 'No such student'})
  }

  res.status(200).json(student)
}

// create a new wtudent
const createStudent = async (req, res) => {
    const { title, id, stream, experience, dob, address } = req.body;
  
    // Validate that required fields are present in req.body
    if (!title || !id || !stream || !experience || !dob || !address) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
  
    // Create a new student in the database
    try {
      const student = await Student.create({
        title,
        id,
        stream,
        experience,
        dob,
        address
      });
      res.status(201).json(student); // 201 status code for successful creation
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  

// delete a wtudent
const deleteStudent = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such student'})
  }

  const student = await Student.findOneAndDelete({_id: id})

  if(!student) {
    return res.status(400).json({error: 'No such student'})
  }

  res.status(200).json(student)
}

// update a wtudent
const updateStudent = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such student'})
  }

  const student = await Student.findOneAndUpdate({_id: id}, {
    ...req.body
  })

  if (!student) {
    return res.status(400).json({error: 'No such wtudent'})
  }

  res.status(200).json(student)
}

module.exports = {
  getStudents,
  getStudent,
  createStudent,
  deleteStudent,
  updateStudent
}
