import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import './navbar.scss';
import { darkcocheLogo, darkcocheLogoMobile, sanyaLopez, userIcon } from '../../assets/images.js';

function NavBar(){
    const navigate = useNavigate();
    const location = useLocation();
    const underlineRef = useRef(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const navRefs = {
        home: useRef(null),
        services: useRef(null),
        gallery: useRef(null),
    };

    const user = JSON.parse(localStorage.getItem('user'));
    const isLoggedIn = !!user;

    const handleAccountClick = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleSignOut = () => {
        localStorage.removeItem('user');
        navigate('/home');
    };

    const handleSignIn = () => {
        navigate('/auth/login');
    };

    const handleAccountPage = () => {
        navigate('/account'); // account/profile page
    };

    useEffect(() => {
        const path = location.pathname.split("/")[1];
        const active = navRefs[path]?.current;

        if (active && underlineRef.current) {
            const underlineWidth = 70;
            underlineRef.current.style.width = `${underlineWidth}px`;
            underlineRef.current.style.left = `${active.offsetLeft + (active.offsetWidth / 2) - (underlineWidth / 2)}px`;
        }
    }, [location]);

    return (
        <>
            <div className="navbar">
                <div className="navbar-container">
                    <img id="coche-logo-desktop" src={darkcocheLogo} alt="coche desktop logo" />
                    <img id="coche-logo-mobile" src={darkcocheLogoMobile} alt="coche mobile logo" />
                    <nav className="navbar-links">
                        <nav className="navbar-links">
                            <div className="nav-item" ref={navRefs.home}><NavLink to="/home">Home</NavLink></div>
                            <div className="nav-item" ref={navRefs.services}><NavLink to="/services">Services</NavLink></div>
                            <div className="nav-item" ref={navRefs.gallery}><NavLink to="/gallery">Gallery</NavLink></div>
                            <div className="nav-underline" ref={underlineRef}></div>
                        </nav>
                    </nav>

                    <div className="navbar-actions">
                        <button className="contact-button" 
                            onClick={() => window.open("https://m.me/thecocheevents", "_blank", "noopener,noreferrer")
                        }>Contact Us</button>
                        <button className='account' onClick={handleAccountClick}>
                            <img id='account-icon' src={user?.profile_picture || userIcon} alt="account-icon"/>
                            <p>{user?.first_name || 'Guest'}</p>
                            <i className="fa-solid fa-caret-down dropdown-icon"></i>
                        </button>
                    </div>
                </div>
            </div>

            {dropdownOpen && (
                <div className="dropdown-menu">
                    {isLoggedIn ? (
                    <>
                        <button onClick={handleAccountPage}>Account</button>
                        <hr/>
                        <button onClick={handleSignOut}>Sign Out</button>
                    </>
                    ) : (
                    <button onClick={handleSignIn}>Sign In</button>
                    )}
                </div>
            )}
        </>
    );
}

export default NavBar