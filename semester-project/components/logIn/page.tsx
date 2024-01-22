'use client'
import React, { useState } from 'react';
import LogInForm from '@/components/logInForm/page';
import SignUpForm from '@/components/signUpForm/page';
import { useAuth } from '@/app/AuthContext';
import DisplaySavedRecipes from '../displaySavedRecipes/page';

const LogIn: React.FC = () => {
  const { isLoggedIn, username, setLoggedIn, setUsername } = useAuth();
  const [showSignUp, setShowSignUp] = useState(false); // State to toggle between login and signup components

  function handleLogout() {
    setLoggedIn(false);
    setUsername(null);
  }

  const toggleSignUp = () => {
    setShowSignUp(!showSignUp);
  };

  return (
    <div>
      {isLoggedIn && <button onClick={handleLogout}>Logout</button>}
      {isLoggedIn ? <DisplaySavedRecipes /> : showSignUp ? <SignUpForm toggleSignUp={toggleSignUp}/> : <LogInForm toggleSignUp={toggleSignUp} />}
    </div>
  );
};

export default LogIn;
