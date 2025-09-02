import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addRoom } from '../services/RoomService';

const AddRoom = () => {
  const [room, setRoom] = useState({
    roomNumber: '',
    type: '',
    capacity: 1,  // minimum 1
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRoom(prevRoom => ({
      ...prevRoom,
      [name]: name === 'capacity' ? parseInt(value) || 1 : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // Occupied field NOT sent, backend will set it to 0 automatically
      await addRoom(room);
      navigate('/rooms');
    } catch (err) {
      console.error('Error adding room:', err);
      setError('Failed to add room. Please try again.');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Add Room</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="roomNumber"
          value={room.roomNumber}
          placeholder="Room Number"
          onChange={handleChange}
          className="form-control mb-2"
          required
        />
        <input
          type="text"
          name="type"
          value={room.type}
          placeholder="Type"
          onChange={handleChange}
          className="form-control mb-2"
          required
        />
        <input
          type="number"
          name="capacity"
          value={room.capacity}
          placeholder="Capacity"
          min={1}
          onChange={handleChange}
          className="form-control mb-2"
          required
        />

        <button className="btn btn-primary">Add Room</button>
      </form>
    </div>
  );
};

export default AddRoom;
