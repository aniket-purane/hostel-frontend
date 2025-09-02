import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

function EditStaff() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [staff, setStaff] = useState({
    name: '',
    designation: '',
    contact: '',
    email: '',
    address: ''
  });

  useEffect(() => {
    axios.get(`http://localhost:8080/api/staff/${id}`)
      .then(response => {
        setStaff(response.data);
      })
      .catch(error => {
        toast.error("Failed to load staff data");
        console.error(error);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStaff(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.put(`http://localhost:8080/api/staff/${id}`, staff)
      .then(() => {
        toast.success("Staff updated successfully");
        navigate('/staff');
      })
      .catch(error => {
        toast.error("Failed to update staff");
        console.error(error);
      });
  };

  return (
    <div className="container mt-4">
      <h2>Edit Staff</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Name:</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={staff.name || ''}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Designation:</label>
          <input
            type="text"
            className="form-control"
            name="designation"
            value={staff.designation || ''}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Contact:</label>
          <input
            type="text"
            className="form-control"
            name="contact"
            value={staff.contact || ''}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Email:</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={staff.email || ''}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Address:</label>
          <textarea
            className="form-control"
            name="address"
            value={staff.address || ''}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">Update Staff</button>
      </form>
    </div>
  );
}

export default EditStaff;
