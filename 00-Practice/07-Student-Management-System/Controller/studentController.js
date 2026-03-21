const Student = require('../model/studentModel');
const mongoose = require('mongoose');

const createStudent = async (req, res) => {
    try {
        const { name, email, age } = req.body;

        if (!name || !email || !age) {
            return res.status(400).json({ error: "All are required " });
        }

        const newStudent = new Student({ name, email, age });
        await newStudent.save();
        res.status(201).json({ message: "Student created successfully", data: newStudent });
    } catch (error) {
       res.status(400).json({ error: "Student Created fail"});
    }
};

const getAllStudents = async (req, res) => {
    try {
        const students = await Student.find();
        res.status(200).json({ data: students });
    } catch (error) {
        res.status(500).json({ error: "Server Error"});
    }
};

const getStudentById = async (req, res) => {
    try {
        const { id } = req.params;
        

        const student = await Student.findById(id);
        if (!student) {
            return res.status(404).json({ error: "Student not found" });
        }

        res.status(200).json({ data: student });
    } catch (error) {
        res.status(500).json({ error: "Server Error", details: error.message });
    }
};

const updateStudent = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, age } = req.body;

       
        const updatedStudent = await Student.findByIdAndUpdate(
            id,
            req.body
        );

        if (!updatedStudent) {
            return res.status(404).json({ error: "Student not found" });
        }

        res.status(200).json({ message: "Student updated successfully", data: updatedStudent });
    } catch (error) {
        if (error.name === 'ValidationError') {
             return res.status(400).json({ error:"server error"});
        }
        res.status(500).json({ error: "Server Error", details: error.message });
    }
};

const deleteStudent = async (req, res) => {
    try {
        const { id } = req.params;
        
        const deletedStudent = await Student.findByIdAndDelete(id);
        if (!deletedStudent) {
            return res.status(404).json({ error: "Student not found" });
        }

        res.status(200).json({ message: "Student deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Server Error", details: error.message });
    }
};

module.exports = {
    createStudent,
    getAllStudents,
    getStudentById,
    updateStudent,
    deleteStudent
};
