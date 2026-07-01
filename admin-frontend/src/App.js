import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import CreateListingPage from './pages/CreateListingPage';
import UpdateListingPage from './pages/UpdateListingPage';

function App() {
  const [token, setToken] = useState(localStorage.getItem('adminToken'));

  const handleLogin = (newToken) => {
    setToken(newToken);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    setToken(null);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        <Route path="/dashboard" element={token ? <DashboardPage onLogout={handleLogout} /> : <Navigate to="/login" />} />
        <Route path="/create-listing" element={token ? <CreateListingPage /> : <Navigate to="/login" />} />
        <Route path="/update-listing/:id" element={token ? <UpdateListingPage /> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;