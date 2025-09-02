import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

function StaffList() {
  const [staffList, setStaffList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    fetchStaff();
  }, []);

  useEffect(() => {
    if (location.state?.refresh) {
      fetchStaff();
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  const fetchStaff = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/staff');
      setStaffList(res.data);
    } catch (err) {
      console.error("Error fetching staff", err);
    }
  };

  const deleteStaff = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/staff/${id}`);
      fetchStaff();
    } catch (err) {
      console.error("Error deleting staff", err);
    }
  };

  // 🔍 Filtered Staff List
  const filteredStaff = staffList.filter(staff =>
    staff.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    staff.designation?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    staff.contact?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between mb-3">
        <h2>Staff List</h2>
        <button className="btn btn-success" onClick={() => navigate('/add-staff')}>
          ➕ Add Staff
        </button>
      </div>

      {/* 🔍 Search Input */}
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search by Name, Designation, or Contact"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <table className="table table-bordered">
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Designation</th>
            <th>Contact</th>
            <th>Email</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredStaff.length === 0 ? (
            <tr>
              <td colSpan="7" className="text-center">No Staff Found</td>
            </tr>
          ) : (
            filteredStaff.map((staff, index) => (
              <tr key={staff.id}>
                <td>{index + 1}</td>
                <td>{staff.name}</td>
                <td>{staff.designation}</td>
                <td>{staff.contact}</td>
                <td>{staff.email}</td>
                <td>{staff.address}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => navigate(`/edit-staff/${staff.id}`)}
                  >
                    ✏️ Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteStaff(staff.id)}
                  >
                    🗑 Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default StaffList;
