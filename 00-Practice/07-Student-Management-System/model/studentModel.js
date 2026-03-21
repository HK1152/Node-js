const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        minlength: [3, 'Name must be at least 3 characters']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        match: [/^\S+@\S+\.\S+$/, 'Invalid email format']
    },
    age: {
        type: Number,
        required: [true, 'Age is required'],
        min: [18, 'Age must be between 18 and 60'],
        max: [60, 'Age must be between 18 and 60']
    }
});



const Student = mongoose.model('Student', studentSchema);
module.exports = Student;
