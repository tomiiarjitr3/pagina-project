import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from "./components/Header.jsx";
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import PublicPage from './pages/About.jsx';
import About from './pages/About.jsx';

export default function App() {
  const [institutionData, setInstitutionData] = useState(null);
  const [registeredUser, setRegisteredUser] = useState(null);

  const logout = () => {
    setInstitutionData(null);
    setRegisteredUser(null);
  };

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/dashboard"
          element={
            <Dashboard institutionData={institutionData} logout={logout} />
          }
        />
        <Route
          path="/login"
          element={<Login registeredUser={registeredUser} />}
        />
        <Route
          path="/register"
          element={
            <Register
              setInstitutionData={setInstitutionData}
              setRegisteredUser={setRegisteredUser}
            />
          }
        />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}