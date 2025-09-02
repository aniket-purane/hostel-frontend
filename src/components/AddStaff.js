import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddStaff() {
  const navigate = useNavigate();
  const [staff, setStaff] = useState({
    name: '',
    email: '',
    contact: '',
    designation: '',
    address: '',
  });

  const handleChange = (e) => {
    setStaff({ ...staff, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/staff", staff);
      // Pass flag in state to tell StaffList to refresh
      navigate("/staff", { state: { refresh: true } });
    } catch (error) {
      console.error("Error adding staff:", error);
      alert("Failed to add staff.");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Add Staff</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Name</label>
          <input type="text" name="name" className="form-control" value={staff.name} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Email</label>
          <input type="email" name="email" className="form-control" value={staff.email} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Contact</label>
          <input type="text" name="contact" className="form-control" value={staff.contact} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Designation</label>
          <input type="text" name="designation" className="form-control" value={staff.designation} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Address</label>
          <textarea name="address" className="form-control" value={staff.address} onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-primary">Add Staff</button>
      </form>
    </div>
  );
}

export default AddStaff;
