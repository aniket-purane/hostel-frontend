import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function EditStudent() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [student, setStudent] = useState({
    name: "",
    email: "",
    course: "",
    age: "",
    room: null,
  });

  const [availableRooms, setAvailableRooms] = useState([]);

  useEffect(() => {
    // fetch student
    axios
      .get(`http://localhost:8080/students/${id}`)
      .then((res) => {
        setStudent(res.data);
      })
      .catch((err) => console.error("Error fetching student:", err));

    // fetch rooms
    axios
      .get("http://localhost:8080/rooms")
      .then((res) => setAvailableRooms(res.data))
      .catch((err) => console.error("Error fetching rooms:", err));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "room") {
      setStudent({ ...student, room: { id: Number(value) } }); // ✅ number मध्ये बदलले
    } else {
      setStudent({ ...student, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedStudent = {
      ...student,
      room: student.room ? { id: student.room.id } : null,  
    };

    axios
      .put(`http://localhost:8080/students/${id}`, updatedStudent)
      .then(() => {
        navigate("/students");
      })
      .catch((err) => console.error("Error updating student:", err));
  };

  return (
    <div className="container mt-4">
      <h2>Edit Student</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-2">
          <label>Name:</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={student.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group mb-2">
          <label>Email:</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={student.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group mb-2">
          <label>Course:</label>
          <input
            type="text"
            className="form-control"
            name="course"
            value={student.course}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group mb-2">
          <label>Age:</label>
          <input
            type="number"
            className="form-control"
            name="age"
            value={student.age}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group mb-2">
          <label>Room:</label>
          <select
            className="form-control"
            name="room"
            value={student.room?.id || ""}
            onChange={handleChange}
            required
          >
            <option value="">Select Room</option>
            {availableRooms.map((room) => (
              <option key={room.id} value={room.id}>
                {room.roomNumber} - {room.type}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="btn btn-primary">
          Update Student
        </button>
      </form>
    </div>
  );
}

export default EditStudent;
