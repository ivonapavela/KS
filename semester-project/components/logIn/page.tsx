'use client'
import React  from 'react';
import LogInForm from '@/components/logInForm/page';
import { useAuth } from '@/app/AuthContext';
//import DisplaySavedRecipes from '../displaySavedRecipes/page';


const LogIn: React.FC = () => {
    const { isLoggedIn, username, setLoggedIn, setUsername } = useAuth();

    function handleLogout() {
        setLoggedIn(false);
        setUsername(null);
    }

  return (
    <div>
        {isLoggedIn && <button onClick={handleLogout}>Logout</button>}
      {isLoggedIn ? (<p>haha</p>) : (<LogInForm/>) }
    </div>
  );
};

export default LogIn;
