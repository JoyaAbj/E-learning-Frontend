import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../CSS/Herosection.css';

function Herosection() {
    const [isBurgerActive, setIsBurgerActive] = useState(false);

    const toggleBurgerMenu = () => {
        setIsBurgerActive(!isBurgerActive);
    };

    return (
        <div>
            <div className="Header-Desktop">
                <div className='Desktop'>
                    <div className="Header-Navbar">
                        <div className="Header-Logo">Ridge Polyglot</div>
                        <div className="Nav-Desktop">
                            <a className="Nav-Title" href="#Languages">Languages</a>
                            <a className="Nav-Title" href="#About">About</a>
                            <a className="Nav-Title" href="#Teachers">Teachers</a>
                            <a className="Nav-Title" href="#Contact us">Contact us</a>
                        </div>
                        <div className="Header-login">Log in
                
            </div>
                    </div>
                    <div className="Header-Hero">
                        <div className="Hero-description">
                            <p className="Hero-description1">
                                <span className="Header-highlight">Ridge Polyglot</span> Language Institute
                            </p>
                            <p className="Hero-description2">
                                Dive into a world of diverse cultures and open doors to new opportunities
                                with our language programs. <br /> <br />
                                Welcome to a place where languages unite us!
                            </p>
                            <button className="Header-enroll">Enroll now!</button>
                        </div>
                        <div>
                            <img className="Header-image" src="Hero-section.png" alt="" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="Header-Mobile">
                <div className='Mobile'>
                    <div className="Mobile-Navbar">
                        <button className="Mobile-Burger" onClick={toggleBurgerMenu}>
                            ☰
                        </button>
                        <div className={`Mobile-Nav ${isBurgerActive ? 'active' : ''}`}>
                            <a className="Mobile-Nav-Title" href="#Languages">Languages</a>
                            <a className="Mobile-Nav-Title" href="#About">About</a>
                            <a className="Mobile-Nav-Title" href="#Teachers">Teachers</a>
                            <a className="Mobile-Nav-Title" href="#Contact us">Contact us</a>
                        </div>
                        <div className="Mobile-Logo">Ridge Polyglot</div>
                        <button className="Mobile-Login">Log in</button>
                        
                    </div>

                    <div className="Mobile-Header-Hero">
                        <div className="Mobile-Hero-description">
                            <p className="Mobile-Hero-description1">
                                <span className="Mobile-Header-highlight">Ridge Polyglot</span> Language Institute
                            </p>
                            <p className="Mobile-Hero-description2">
                                Dive into a world of diverse cultures and open doors to new opportunities
                                with our language programs. <br /> <br />
                                Welcome to a place where languages unite us!
                            </p>
                            <button className="Mobile-Header-enroll">Enroll now!</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Herosection;