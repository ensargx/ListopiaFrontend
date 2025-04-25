// src/app/components/Navbar.tsx  (veya senin dosya yapına göre konumlandır)
import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '@/app/AuthContext';
import './Navbar.css';

export const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const { login, logout, user } = useAuth();

    const toggleMenu = () => setIsOpen(open => !open);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

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
                        Ana Sayfa
                    </NavLink>
                    <NavLink
                        to="/genres"
                        className={({ isActive }) =>
                            isActive ? 'navbar-link active' : 'navbar-link'
                        }
                        onClick={() => setIsOpen(false)}
                    >
                        Filmler
                    </NavLink>
                    
                    {user ? (
                        <>
                            <NavLink
                                to={`/profile/${user.username}`}
                                className={({ isActive }) =>
                                    isActive ? 'navbar-link active' : 'navbar-link'
                                }
                                onClick={() => setIsOpen(false)}
                            >
                                Profilim
                            </NavLink>
                            <button 
                                className="navbar-link logout-button"
                                onClick={() => {
                                    setIsOpen(false);
                                    handleLogout();
                                }}
                            >
                                Çıkış Yap
                            </button>
                        </>
                    ) : (
                        <NavLink
                            to="/signin"
                            className={({ isActive }) =>
                                isActive ? 'navbar-link active' : 'navbar-link'
                            }
                            onClick={() => setIsOpen(false)}
                        >
                            Giriş Yap
                        </NavLink>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default Navbar;
