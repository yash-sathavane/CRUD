const express1 = require('express');
const app = express1();
const mongoose = require('mongoose');
const port = 4000;
app.use(express1.json());
const Student = require('./Students');

mongoose.connect('mongodb://localhost:27017/test').then(() => {
  console.log('Connected to database');
});
/*app.get('/', (req,res) =>{
    console.log("Hello world")
    res.send(Student.findById(""))
    })
    */
app.get('/Students', async (req, res) => {
  try {
    const students = await Student.find({}); // Mongoose's find method
    res.json(students); // Send the data as JSON
  } catch (error) {
    console.error(error); // Log any errors
    res.status(500).send('An error occurred while fetching students.');
  }
});


app.post('/Students', (req, res) => {
  const { name, age, course } = req.body;
  const student = new Student(req.body);
  student.save().then(() => {
    res.send('Student saved');
  }).catch(() => {
    res.status(400).send('Student not saved');
  }); 
});
app.put('/Students/:id', async (req, res) => {
  const { id } = req.params;
  const { name, age, course } = req.body;

  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      id,
      { name, age, course },
      { new: true } // Return the updated document
    );

    if (!updatedStudent) {
      return res.status(404).send('Student not found');
    }

    res.json(updatedStudent); // Send the updated student data as JSON
  } catch (error) {
    console.error(error); // Log any errors
    res.status(500).send('An error occurred while updating the student.');
  }
});

app.delete('/Students/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const deletedStudent = await Student.findByIdAndDelete(id);
  
      if (!deletedStudent) {
        return res.status(404).send('Student not found');
      }
  
      res.send('Student deleted successfully');
    } catch (error) {
      console.error(error); // Log any errors
      res.status(500).send('An error occurred while deleting the student.');
    }
  });

app.listen(port, () => {
  console.log('Server is running on port ${port}');
});