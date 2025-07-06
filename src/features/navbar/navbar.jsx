import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import api from '../../api';
import './navbar.scss';
import { darkcocheLogo, darkcocheLogoMobile, sanyaLopez, userIcon } from '../../assets/images.js';

function NavBar(){
    const navigate = useNavigate();
    const location = useLocation();
    const underlineRef = useRef(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [profilePic, setProfilePic] = useState(null);

    const navRefs = {
        home: useRef(null),
        services: useRef(null),
        gallery: useRef(null),
    };

    const user = JSON.parse(localStorage.getItem('user'));
    const isLoggedIn = !!user;

    const loadProfilePicture = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user?.id) return;

    try {
        const res = await api.get(`/fetch_profile_picture.php?user_id=${user.id}`);
        if (res.data.success && res.data.profile_picture) {
        setProfilePic(res.data.profile_picture); // this assumes it's already a full URL or a relative path
        }
    } catch (err) {
        console.error('Error fetching profile picture:', err);
    }
    };

    useEffect(() => {
    loadProfilePicture();
    }, []);

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
                            <div className='account-icon'>
                                {profilePic ? (
                                    <img
                                        src={
                                        profilePic.startsWith('blob:')
                                            ? profilePic
                                            : `http://localhost/the_coche-events/${profilePic}`
                                        }
                                        alt="account-icon"
                                    />
                                ) : (
                                <span>{user?.first_name?.charAt(0).toUpperCase() || 'G'}</span>
                                )}
                            </div>
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