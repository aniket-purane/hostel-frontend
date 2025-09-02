import React from 'react';
import { Link } from 'react-router-dom';

function Sidebar() {
  return (
   <div className="bg-light border-end mt-1" style={{ width: '250px', minHeight: '100vh' }}>

      <div className="list-group list-group-flush">

        {/* Student Module */}
        <div className="list-group-item bg-primary text-white fw-semibold border-dark ">
          Student Module
        </div>

        <Link to="/add" className="list-group-item list-group-item-action py-2">➕ Add Student</Link>
        <Link to="/" className="list-group-item list-group-item-action py-2">👨‍🎓 Student List</Link>
        <Link to="/assign-room" className="list-group-item list-group-item-action py-2">🛏️ Assign Room</Link>

        {/* Room Module */}
        <div className="list-group-item bg-primary text-white fw-semibold mt-3 border-dark">
          Room Module
        </div>

        <Link to="/add-room" className="list-group-item list-group-item-action py-2">➕ Add Room</Link>
        <Link to="/rooms" className="list-group-item list-group-item-action py-2">📋 Room List</Link>
         

        {/* Staff Module */}
        <div className="list-group-item bg-primary text-white fw-semibold mt-3 border-dark">
          Staff Module
        </div>

         <Link to="/add-staff" className="list-group-item list-group-item-action py-2">➕ Add Staff</Link>
        <Link to="/staff" className="list-group-item list-group-item-action py-2">🧑‍💼 Staff List</Link>
        

        {/* Other */}
       <div className="list-group-item bg-primary text-white fw-semibold mt-3 border border-dark">
          Other
        </div>
        <Link to="/dashboard" className="list-group-item list-group-item-action py-2">📊 Dashboard</Link>

      </div>
    </div>
  );
}

export default Sidebar;
