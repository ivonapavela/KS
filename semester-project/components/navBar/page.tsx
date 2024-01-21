'use client'
import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Button from "@/components/button/page";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons'; // Import arrow icons
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
  const [isWiderThan550px, setIsWiderThan550px] = useState<boolean>(true);
  const pathname = usePathname();

  // Update visibility and icon based on screen size
  const handleResize = () => {
    setIsWiderThan550px(typeof window !== 'undefined' && window.innerWidth >= 550);
    setIsNavBarVisible(visiblePages.includes(pathname));
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
      <nav style={{ display: isNavBarVisible ? 'block' : 'none' }}>
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
        <FontAwesomeIcon icon={isWiderThan550px ? faBars : isNavBarVisible ? faCaretUp : faCaretDown} className="icon" />
      </button>
    </div>
  );
};

export default NavBar;
