const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());
app.use(express.static("public"));

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/studentDB")
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

// Student Schema
const studentSchema = new mongoose.Schema({
    name: String,
    rollNo: String,
    branch: String,
    marks: Number
});

// Student Model
const Student = mongoose.model("Student", studentSchema);


// CREATE - Add Student
app.post("/students", async (req, res) => {
    try {
        const student = new Student(req.body);
        await student.save();

        res.json({
            message: "Student added successfully",
            student: student
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// READ - Get All Students
app.get("/students", async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// UPDATE - Update Student
app.put("/students/:id", async (req, res) => {
    try {
        const student = await Student.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json({
            message: "Student updated successfully",
            student: student
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// DELETE - Delete Student
app.delete("/students/:id", async (req, res) => {
    try {
        await Student.findByIdAndDelete(req.params.id);

        res.json({
            message: "Student deleted successfully"
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// Start server
app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});