const express = require('express');
const router = express.Router();
const {
    createStudent,
    getAllStudents,
    getStudentById,
    updateStudent,
    deleteStudent
} = require('../Controller/studentController');


router.get('/', (req, res) => res.send('Welcome to Student Management System'));
router.get('/add', (req, res) => res.render('add'));
router.post('/create', createStudent);
router.get('/read', getAllStudents);
router.get('/:id', getStudentById);
router.put('/update/:id', updateStudent);
router.delete('/delete/:id', deleteStudent);

module.exports = router;
