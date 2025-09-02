import React, { useEffect, useState } from "react";
import axios from "axios";

const AssignRoom = () => {
  const [students, setStudents] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [studentId, setStudentId] = useState("");
  const [roomId, setRoomId] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Get all students
  const fetchStudents = async () => {
    try {
      const res = await axios.get("http://localhost:8080/students");
      // फक्त ज्यांना अजून room नाहीत तेवढे students
      const unassigned = res.data.filter((s) => !s.room);
      setStudents(unassigned);
    } catch (err) {
      console.error("Error fetching students:", err);
    }
  };

  // Get all rooms
  const fetchRooms = async () => {
    try {
      const res = await axios.get("http://localhost:8080/rooms");
      // फक्त जिथे जागा आहे तेवढे rooms
      const available = res.data.filter((r) => r.occupied < r.capacity);
      setRooms(available);
    } catch (err) {
      console.error("Error fetching rooms:", err);
    }
  };

  useEffect(() => {
    fetchStudents();
    fetchRooms();
  }, []);

  // Assign room
  const assignRoomToStudent = async () => {
    if (!studentId || !roomId) {
      alert("Please select both student and room");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.put(
        `http://localhost:8080/students/${studentId}/assign-room/${roomId}`
      );

      if (res.status === 200) {
        setSuccessMessage("✅ Room Assigned Successfully!");
        setStudentId("");
        setRoomId("");
        fetchStudents(); // Refresh students list
        fetchRooms(); // Refresh rooms
      }
    } catch (error) {
      console.error("Error assigning room:", error);
      alert("❌ Room is full or assignment failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h3>🏠 Assign Room to Student</h3>

      {/* Student Dropdown */}
      <div className="mb-3">
        <label className="form-label">Select Student:</label>
        <select
          className="form-select"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
        >
          <option value="">-- Select Student --</option>
          {students.map((student) => (
            <option key={student.id} value={student.id}>
              {student.name} (Course: {student.course}, Age: {student.age})
            </option>
          ))}
        </select>
      </div>

      {/* Room Dropdown */}
      <div className="mb-3">
        <label className="form-label">Select Room:</label>
        <select
          className="form-select"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
        >
          <option value="">-- Select Room --</option>
          {rooms.map((room) => (
            <option key={room.id} value={room.id}>
              {room.roomNumber} ({room.type}) - {room.occupied}/{room.capacity} occupied
            </option>
          ))}
        </select>
      </div>

      {/* Assign button */}
      <button
        onClick={assignRoomToStudent}
        className="btn btn-primary"
        disabled={loading}
      >
        {loading ? "Assigning..." : "Assign Room"}
      </button>

      {/* Success Message Alert */}
      {successMessage && (
        <div
          className="alert alert-success alert-dismissible fade show mt-4"
          role="alert"
        >
          {successMessage}
          <button
            type="button"
            className="btn-close"
            onClick={() => setSuccessMessage("")}
          ></button>
        </div>
      )}
    </div>
  );
};

export default AssignRoom;
