import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Lab1 from './pages/Lab1';
import Lab2 from './pages/Lab2';
import Lab3 from './pages/Lab3';
import Lab4 from './pages/Lab4';
import Lab5 from './pages/Lab5';
import Lab6 from './pages/Lab6';
import AboutPage from './pages/AboutPage';
import ProfilePage from './pages/ProfilePage';
import Contacts from './pages/Contacts';
import Auth from './pages/Auth';
import LabPage from './pages/LabPage';
import Footer from './components/Footer';
import Header from './components/Header';
import { getUserById } from './components/Api';

function App() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Проверяем, есть ли сохраненные данные пользователя (например, в localStorage)
        const userId = localStorage.getItem('userId');
        if (userId) {
            const fetchUser = async () => {
                try {
                    const userData = await getUserById(userId);
                    setUser(userData);
                } catch (error) {
                    console.error('Ошибка при загрузке пользователя:', error);
                    localStorage.removeItem('userId');
                }
            };
            fetchUser();
        }
    }, []);

    const handleLogin = (userData) => {
        setUser(userData);
        localStorage.setItem('userId', userData.id);
    };

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem('userId');
        navigate('/');
    };

    const handleUpdateUser = (updatedUser) => {
        setUser(updatedUser);
    };

    return (
        <>
            <Header user={user} onLogout={handleLogout} />
            <div className="content">
                <Routes>
                    <Route path="/" element={<HomePage user={user} />} />
                    <Route path="1" element={<Lab1 user={user} />} />
                    <Route path="2" element={<Lab2 user={user}/>} />
                    <Route path="3" element={<Lab3 user={user} />} />
                    <Route path="4" element={<Lab4 user={user} />} />
                    <Route path="5" element={<Lab5 user={user} />} />
                    <Route path="6" element={<Lab6 user={user} />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/auth" element={<Auth onLogin={handleLogin} />} />
                    <Route path="/contacts" element={<Contacts />} />
                    <Route 
                        path="/profile" 
                        element={
                            <ProfilePage 
                                user={user} 
                                onUpdateUser={handleUpdateUser} 
                            />
                        } 
                    />
                    <Route path="/lab/:id" element={<LabPage />} />
                </Routes>
            </div>
            <Footer />
        </>
    );
}

export default function AppWrapper() {
    return (
        <Router>
            <App />
        </Router>
    );
}