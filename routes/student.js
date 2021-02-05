

const express = require('express')
const router = express.Router()
const validateStudentId = require('../middleware/validateStudentId')
const {students} = require('../data/students')

// use middleware for requests with student id
router.use('/:studentId', validateStudentId)

// get all students
router.get('/', (req, res) => res.send({data: students}))

// get student with id
router.get('/:studentId', (req, res) => {
  res.send({data: students[req.studentIndex]})
})

// create a new student
router.post('/', (req, res) => {
  const {firstName, lastName, nickname, email} = req.body
  const newStudent = {
    id: Date.now(),
    firstName,
    lastName,
    nickname,
    email
  }
  students.push(newStudent)
  res.status(201).send({data: newStudent})
})


// update specified student
router.put('/:studentId', (req, res) => {
  const id = parseInt(req.params.studentId)
  const {firstName, lastName, nickname, email} = req.body
  const updatedStudent = {id, firstName, lastName, nickname, email}
  students[req.studentIndex] = updatedStudent
  res.send({data: updatedStudent})
})

router.put('/:studentId', (req, res) => {
  const {id, ...theRest} = req.body
  const updatedStudent = Object.assign({}, students[req.studentIndex], theRest)
  students[req.studentIndex] = updatedStudent
  res.send({data: updatedStudent})
})

router.delete('/:studentId', (req, res) => {
  const id = parseInt(req.params.studentId)
  // splice returns an array of the removed items
  const deletedStudents = students.splice(req.studentIndex, 1)
  res.send({data: deletedStudents[0]})
})

module.exports = router

