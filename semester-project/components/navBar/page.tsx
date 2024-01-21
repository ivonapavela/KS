'use client'
import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Button from "@/components/button/page";
import './navBar.css';

const pages = {
  Home: "/",
  Recipes: "/recipes",
  About: "/about",
  LogIn: "/LogIn",
};

const visiblePages = ["/", "/recipes/all", "/about", "/LogIn", "/recipes/breakfast", "/recipes/lunch",
  "/recipes/dinner", "/recipes/dessert", "/recipes/snack", "/recipes"
];

const NavBar = () => {
  const [clickedButton, setClickedButton] = useState<string>('');
  const [isNavBarVisible, setIsNavBarVisible] = useState<boolean>(true);
  const pathname = usePathname();

  // Set initial visibility based on provided pages
  useEffect(() => {
    setIsNavBarVisible(visiblePages.includes(pathname));
  }, [pathname]);

  // Set CSS variable based on visibility state
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
      <button onClick={handleToggleVisibility} className="menu-button">
      </button>
    </div>
  );
};
export default NavBar;
