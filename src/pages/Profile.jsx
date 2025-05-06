import React from 'react';
import { useAuth } from '../context/AuthContext';
import Layout from '../components/Layout';

const Profile = () => {
    const { user, logout } = useAuth();

    return (
        <Layout>
            <div className="profile-container">
                <h2>Профіль користувача</h2>
                <div className="profile-info">
                    <p><strong>Ім'я:</strong> {user?.username}</p>
                </div>
                <button onClick={logout} className="logout-btn">
                    Вийти
                </button>
            </div>
        </Layout>
    );
};

export default Profile;