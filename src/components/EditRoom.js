import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getRoomById, updateRoom } from '../services/RoomService';
import axios from 'axios';


const EditRoom = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [room, setRoom] = useState({
    roomNumber: '',
    type: '',
    capacity: '',
    occupied: false,
  });

  const [error, setError] = useState('');

  useEffect(() => {
    const loadRoom = async () => {
      try {
        const res = await getRoomById(id);
        setRoom(res.data);
      } catch (err) {
        console.error('Error loading room:', err);
        setError('Failed to load room data.');
      }
    };

    loadRoom();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setRoom({ ...room, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateRoom(id, room);
      navigate('/rooms'); // ✅ After successful update
    } catch (err) {
      console.error('Error updating room:', err);
      setError('Failed to update room.');
    }
  };

  // ✅ Cancel handler
  const handleCancel = () => {
    navigate('/rooms');
  };

  return (
    <div className="container mt-4">
      <h2>Edit Room</h2>

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
          onChange={handleChange}
          className="form-control mb-2"
          required
        />
        <div className="form-check mb-2">
          <input
            type="checkbox"
            name="occupied"
            checked={room.occupied}
            onChange={handleChange}
            className="form-check-input"
            id="occupiedCheck"
          />
          <label className="form-check-label" htmlFor="occupiedCheck">
            Occupied
          </label>
        </div>

        {/* ✅ Button group */}
        <div className="d-flex gap-2">
          <button type="submit" className="btn btn-success">
            Update Room
          </button>
          <button type="button" className="btn btn-secondary" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditRoom;
