import React from 'react';
import { useNavigate } from 'react-router-dom';

const SignOut = () => {
    const navigate = useNavigate();

    const handleSignOut = () => {
        localStorage.removeItem('userId');
        navigate('/');
    };

    return (
        <div>
            <p className='sign-out-text'>Are you sure you want to sign out?</p>
            <button className='sign-out-button' onClick={handleSignOut}>Sign Out</button>
        </div>
    );
}

export default SignOut;