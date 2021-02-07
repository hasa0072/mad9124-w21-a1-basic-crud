

const {students} = require('../data/students')

const validateStudentId = (req, res, next) => {
  console.log("Validating student")
  const id = parseInt(req.params.studentId)
  const index = students.findIndex(student => student.id === id)

  if (index < 0) {
    res.status(404).send({
      errors: [
        {
          status: '404',
          title: 'Resource does not exist',
          description: `We could not find a student with id: ${id}`
        }
      ]
    })
  } else {
    req.studentIndex = index
    next()
  }
}

const validateStudentData = (req, res, next) => {
  console.log("Validating Student Name")
  const student = students[req.studentIndex]
  console.log(req.body)
  for (const key in req.body) {
    console.log("\tValidating " + key)
    if (!(key in student)) {
      //https://stackoverflow.com/questions/6123425/rest-response-code-for-invalid-data
      res.status(422).send({
        errors: [
          {
            status: '422',
            title: 'Cannot Process Data',
            description: `One or more property names are invalid: ${key} does not exist`
          }
        ]
      }) 
      return
    }
  }
  console.log("VALIDATION SUCCESS")
  next()
}

module.exports = {validateStudentId, validateStudentData}


