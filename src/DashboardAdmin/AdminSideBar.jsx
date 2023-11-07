import React, { useState } from 'react';
import CreateUser from './CreateUser';
import AllUsers from './AllUsers';
import Language from './Language';
import SignOut from './Signout';
import '../CSS/AdminDashboard.css';

const AdminDashboard = () => {
    const [selectedOption, setSelectedOption] = useState('users');

    const handleNavigationChange = (section) => {
        setSelectedOption(section);
        console.log(selectedOption);
    };

    return (
        <div>
            <div>
                <h2 className="Admin-Header">Admin Dashboard</h2>
            </div>
            <div className="Admin-Sidebar">
                <button className={`Sidebar-Button ${selectedOption === 'CreateUser' ? 'active' : ''}`} onClick={() => handleNavigationChange('CreateUser')}>
                    Create User
                </button>
                <button className={`Sidebar-Button ${selectedOption === 'AllUsers' ? 'active' : ''}`} onClick={() => handleNavigationChange('AllUsers')}>
                    All Users
                </button>
                <button className={`Sidebar-Button ${selectedOption === 'Language' ? 'active' : ''}`} onClick={() => handleNavigationChange('Language')}>
                    Language
                </button>
                <button className={`Sidebar-Button ${selectedOption === 'Signout' ? 'active' : ''}`} onClick={() => handleNavigationChange('Signout')}>
                    Sign Out
                </button>
            </div>
            <div className="Admin-Content">
                {selectedOption === 'CreateUser' && <CreateUser />}
                {selectedOption === 'AllUsers' && <AllUsers />}
                {selectedOption === 'Language' && <Language />}
                {selectedOption === 'Signout' && <SignOut />}
            </div>
        </div>
    );
};

export default AdminDashboard;