import React, { useEffect, useState } from 'react';
import { getAllRooms, deleteRoom } from '../services/RoomService';
import { useNavigate } from 'react-router-dom';
import ConfirmDeleteModal from './ConfirmDeleteModal';

const RoomList = () => {
    const [rooms, setRooms] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Modal related states
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [selectedRoomId, setSelectedRoomId] = useState(null);

    useEffect(() => {
        loadRooms();
    }, []);

    const loadRooms = async () => {
        try {
            const result = await getAllRooms();
            setRooms(result.data);
            setError('');
        } catch (error) {
            console.error("Error loading rooms:", error);
            setError("Failed to load rooms. Please try again.");
        }
    };

    const handleDelete = (id) => {
        setSelectedRoomId(id);
        setShowConfirmModal(true);
    };

    const handleConfirmDelete = async () => {
        try {
            await deleteRoom(selectedRoomId);
            setRooms(rooms.filter((room) => room.id !== selectedRoomId));
            setShowConfirmModal(false);
            setSelectedRoomId(null);
        } catch (error) {
            console.error('Error deleting room:', error);
        }
    };

    // ✅ Use this for canceling modal
    const handleCancelDelete = () => {
        setShowConfirmModal(false);
        setSelectedRoomId(null);
    };

    const filteredRooms = rooms.filter((room) =>
        (room.roomNumber || '').toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container mt-4">
            <h2>Room List</h2>

            <button
                className="btn btn-primary mb-3"
                onClick={() => navigate("/add-room")}
            >
                ➕ Add Room
            </button>

            <input
                type="text"
                className="form-control mb-3"
                placeholder="Search by Room Number..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            {error && (
                <div className="alert alert-danger">
                    {error}
                </div>
            )}

            <table className="table table-bordered text-center">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Room Number</th>
                        <th>Type</th>
                        <th>Capacity</th>
                        <th>Occupied</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredRooms.map((room) => (
                        <tr key={room.id}>
                            <td>{room.id}</td>
                            <td>{room.roomNumber}</td>
                            <td>{room.type}</td>
                            <td>{room.capacity}</td>
                            <td>{room.occupied ? 'Yes' : 'No'}</td>
                            <td>
                                <button
                                    className="btn btn-warning btn-sm me-2"
                                    onClick={() => navigate(`/edit-room/${room.id}`)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => handleDelete(room.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    {filteredRooms.length === 0 && (
                        <tr>
                            <td colSpan="6" className="text-center text-muted">
                                No matching rooms found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            <ConfirmDeleteModal
                show={showConfirmModal}
                onHide={handleCancelDelete} // ✅ ESLint-safe
                onConfirm={handleConfirmDelete}
                title="Delete Room"
                message="Are you sure you want to delete this room?"
            />
        </div>
    );
};

export default RoomList;
