// src/app/components/Navbar.tsx  (veya senin dosya yapına göre konumlandır)
import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Navbar.css';

export const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => setIsOpen(open => !open);

    return (
        <header className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">
                    🎬 Listopia
                </Link>

                <button
                    className="navbar-toggle"
                    onClick={toggleMenu}
                    aria-label="Toggle navigation"
                >
                    ☰
                </button>

                <nav className={`navbar-menu ${isOpen ? 'open' : ''}`}>
                    <NavLink
                        to="/"
                        end
                        className={({ isActive }) =>
                            isActive ? 'navbar-link active' : 'navbar-link'
                        }
                        onClick={() => setIsOpen(false)}
                    >
                        Anasayfa
                    </NavLink>
                    <NavLink
                        to="/genres"
                        className={({ isActive }) =>
                            isActive ? 'navbar-link active' : 'navbar-link'
                        }
                        onClick={() => setIsOpen(false)}
                    >
                        Films
                    </NavLink>
                    <NavLink
                        to="/profile"
                        className={({ isActive }) =>
                            isActive ? 'navbar-link active' : 'navbar-link'
                        }
                        onClick={() => setIsOpen(false)}
                    >
                        Profile
                    </NavLink>
                </nav>
            </div>
        </header>
    );
};

export default Navbar;
