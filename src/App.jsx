import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import DashboardLayout from './components/DashboardLayout';
import Home from './components/Home';
import FTable from './tool-components/FTable';
import Sui from './tool-components/Sui';
import Settings from './tool-components/Settings';
import Uploader_tool  from './tool-components/Uploader_tool';
import Profile_tool from "./tool-components/Profile_tool"
import Logout_message_page from './components/Logout_message_page';
import UserProfile from './tool-components/userProfile';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/login"
            element={
              isAuthenticated ?
                <Navigate to="/" /> :
                <Login setIsAuthenticated={setIsAuthenticated} />
            }
          />
          <Route
            path="/register"
            element={
              isAuthenticated ?
                <Navigate to="/" /> :
                <Register />
            }
          />

          <Route
            path="/*"
            element={
              isAuthenticated ?
                <DashboardLayout setIsAuthenticated={setIsAuthenticated} /> :
                <Navigate to="/login" />
            }
          >
           
            <Route index element={<Home />} />
            <Route path="ftable" element={<FTable />} />
            <Route path="sui" element={<Sui />} />
            <Route path="settings" element={<Settings />} />
            <Route path='upload' element={<Uploader_tool />} />
            <Route path='profile' element={<Profile_tool />} />
            <Route path='profile/:id' element={<UserProfile/>}/>
            <Route path="logout_message" element={<Logout_message_page/>}/>
          </Route>  
        </Routes>
      </div>
    </Router>
  );
}

export default App;

