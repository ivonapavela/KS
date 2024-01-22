'use client'
import React, { useState } from 'react';
import LogInForm from '@/components/logInForm/page';
import SignUpForm from '@/components/signUpForm/page'; // Import the SignUpForm component
import { useAuth } from '@/app/AuthContext';
import DisplaySavedRecipes from '../displaySavedRecipes/page';

const LogIn: React.FC = () => {
    const { isLoggedIn, username, setLoggedIn, setUsername } = useAuth();
    const [showSignUp, setShowSignUp] = useState(false); // State to toggle between login and signup components

    function handleLogout() {
        setLoggedIn(false);
        setUsername(null);
    }

    return (
        <div>
            {isLoggedIn && <button onClick={handleLogout}>Logout</button>}

            {!isLoggedIn && 
            <button onClick={() => setShowSignUp(!showSignUp)}>
                {showSignUp ? 'Switch to Login' : 'Switch to Sign Up'}
            </button>}

            {/* Render either the DisplaySavedRecipes or the chosen authentication form */}
            {isLoggedIn ? (<DisplaySavedRecipes/>) : (showSignUp ? <SignUpForm/> : <LogInForm/>)}
        </div>
    );
};

export default LogIn;
