import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StudentList from './components/StudentList';
import AddStudent from './components/AddStudent';
import EditStudent from './components/EditStudent';
import AddRoom from './components/AddRoom';
import RoomList from './components/RoomList';
import EditRoom from './components/EditRoom';
import Dashboard from './components/Dashboard';
import AssignRoom from './components/AssignRoom';
import StaffList from './components/StaffList';
import AddStaff from './components/AddStaff';
import EditStaff from './components/EditStaff';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from './design/Header';
import Sidebar from './design/Sidebar';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-3 col-lg-2 px-0 bg-light">
              <Sidebar />
            </div>

            <div className="col-md-9 col-lg-10 px-4 py-3">
              <Routes>
                <Route path="/" element={<StudentList />} />
                <Route path="/students" element={<StudentList />} />
                <Route path="/add" element={<AddStudent />} />
                <Route path="/edit/:id" element={<EditStudent />} />
                <Route path="/rooms" element={<RoomList />} />
                <Route path="/add-room" element={<AddRoom />} />
                <Route path="/edit-room/:id" element={<EditRoom />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/assign-room" element={<AssignRoom />} />
                <Route path="/staff" element={<StaffList />} />
                <Route path="/add-staff" element={<AddStaff />} />
                <Route path="/edit-staff/:id" element={<EditStaff />} />
              </Routes>
            </div>
          </div>
        </div>
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </Router>
  );
}

export default App;
