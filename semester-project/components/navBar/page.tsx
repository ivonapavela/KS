'use client'
import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Button from "@/components/button/page";
import './navBar.css';

const pages = {
  Home: "/",
  Recipes: "/recipes/all",
  About: "/about",
  MyProfile: "/myProfile",
};

const visiblePages = ["/", "/recipes/all", "/about", "/myProfile", "/recipes/breakfast", "/recipes/lunch",
  "/recipes/dinner", "/recipes/dessert", "/recipes/snack", "/recipes"
];

const NavBar = () => {
  const [clickedButton, setClickedButton] = useState<string>('');
  const [isNavBarVisible, setIsNavBarVisible] = useState<boolean>(true);
  const pathname = usePathname();

  // Update visibility based on screen size
  const handleResize = () => {
    setIsNavBarVisible(typeof window !== 'undefined' && window.innerWidth >= 768);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);

  // Set initial visibility based on provided pages
  useEffect(() => {
    setIsNavBarVisible(visiblePages.includes(pathname));
  }, [pathname]);

  // Set CSS variable based on visibility state
  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.documentElement.style.setProperty('--page-margin', !isNavBarVisible ? '-100px' : '0');
    }
  }, [isNavBarVisible]);

  const handleToggleVisibility = () => {
    setIsNavBarVisible(!isNavBarVisible);
  };

  return (
    <div className="navbar-container">
      <nav style={{ visibility: isNavBarVisible ? 'visible' : 'hidden' }}>
        <div>
          <ul>
            {Object.entries(pages).map(([name, path]) => (
              <li key={name}>
                <Button path={path} name={name} isActive={clickedButton === name} setClickedButton={setClickedButton}></Button>
              </li>
            ))}
          </ul>
        </div>
      </nav>
      <button onClick={handleToggleVisibility} className="menu-button">
        Toggle NavBar
      </button>
    </div>
  );
};

export default NavBar;
