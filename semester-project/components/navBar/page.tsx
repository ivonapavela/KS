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
  const [isToggleButtonVisible, setIsToggleButtonVisible] = useState<boolean>(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsNavBarVisible(visiblePages.includes(pathname));
  }, [pathname]);

  useEffect(() => {
    const handleResize = () => {
      setIsToggleButtonVisible(window.innerWidth < 768 && visiblePages.includes(pathname));
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [pathname]);

  useEffect(() => {
    document.documentElement.style.setProperty('--page-margin', !isNavBarVisible ? '-100px' : '0');
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
      {isToggleButtonVisible && (
        <button onClick={handleToggleVisibility} className="menu-button">
          Toggle NavBar
        </button>
      )}
    </div>
  );
};

export default NavBar;
