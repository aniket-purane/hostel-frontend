import React, { useEffect, useState } from 'react';
import axios from 'axios';


function Dashboard() {
    const [studentCount, setStudentCount] = useState(0);
    const [roomCount, setRoomCount] = useState(0);
    const [occupiedRooms, setOccupiedRooms] = useState(0);
    const [availableRooms, setAvailableRooms] = useState(0);
    const [staffSummary, setStaffSummary] = useState({});

    useEffect(() => {
        fetchSummary();
    }, []);

    const fetchSummary = async () => {
        try {
            const res = await axios.get('http://localhost:8080/dashboard/stats');
            const stats = res.data;

            setStudentCount(stats.totalStudents);
            setRoomCount(stats.totalRooms);
            setOccupiedRooms(stats.occupiedRooms);
            setAvailableRooms(stats.availableRooms);
            setStaffSummary(stats.staffSummary);
        } catch (error) {
            console.error('Error fetching summary data', error);
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">📊 Hostel Dashboard</h2>
            <div className="row">
                <div className="col-md-3">
                    <div className="card text-white bg-primary mb-3 shadow">
                        <div className="card-body text-center">
                            <h5 className="card-title">Total Students</h5>
                            <h3>{studentCount}</h3>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card text-white bg-success mb-3 shadow">
                        <div className="card-body text-center">
                            <h5 className="card-title">Total Rooms</h5>
                            <h3>{roomCount}</h3>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card text-white bg-warning mb-3 shadow">
                        <div className="card-body text-center">
                            <h5 className="card-title">Occupied Rooms</h5>
                            <h3>{occupiedRooms}</h3>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card text-white bg-info mb-3 shadow">
                        <div className="card-body text-center">
                            <h5 className="card-title">Available Rooms</h5>
                            <h3>{availableRooms}</h3>
                        </div>
                    </div>
                </div>
            </div>

            {/* Staff Summary Section */}
            <div className="mt-5">
                <h4>👨‍💼 Staff Summary</h4>
                <table className="table table-bordered mt-3">
                    <thead className="table-secondary">
                        <tr>
                            <th>Designation</th>
                            <th>Count</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.entries(staffSummary).map(([designation, count]) => (
                            <tr key={designation}>
                                <td>{designation}</td>
                                <td>{count}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Dashboard;
