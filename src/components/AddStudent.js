// ✅ Clean AddStudent.jsx with JSON header
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddStudent() {
    const [student, setStudent] = useState({
        name: '',
        email: '',
        course: '',
        age: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setStudent({ ...student, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(
                'http://localhost:8080/students',
                student,
                { headers: { "Content-Type": "application/json" } }  // ✅ important
            );
            navigate('/');
        } catch (err) {
            console.error("Error saving student", err);
        }
    };

    return (
        <div className="container mt-4">
            <h2>➕ Add New Student</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    value={student.name}
                    onChange={handleChange}
                    placeholder="Name"
                    className="form-control mb-2"
                    required
                />
                <input
                    type="email"
                    name="email"
                    value={student.email}
                    onChange={handleChange}
                    placeholder="Email"
                    className="form-control mb-2"
                    required
                />
                <input
                    type="text"
                    name="course"
                    value={student.course}
                    onChange={handleChange}
                    placeholder="Course"
                    className="form-control mb-2"
                    required
                />
                <input
                    type="number"
                    name="age"
                    value={student.age}
                    onChange={handleChange}
                    placeholder="Age"
                    className="form-control mb-3"
                    required
                />
                <button className="btn btn-primary">💾 Save</button>
            </form>
        </div>
    );
}

export default AddStudent;