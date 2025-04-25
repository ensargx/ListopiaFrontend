// src/app/components/Navbar.tsx  (veya senin dosya yapına göre konumlandır)
import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { fetchUserMe } from '@/app/api_/userapi';
import './Navbar.css';

export const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            setLoading(true);
            const token = localStorage.getItem('authToken');
            
            if (token) {
                try {
                    const user = await fetchUserMe();
                    setIsAuthenticated(true);
                    setUsername(user.username);
                } catch (error) {
                    // Token is invalid or expired
                    localStorage.removeItem('authToken');
                    setIsAuthenticated(false);
                    setUsername(null);
                }
            } else {
                setIsAuthenticated(false);
                setUsername(null);
            }
            
            setLoading(false);
        };
        
        checkAuth();
    }, []);

    const toggleMenu = () => setIsOpen(open => !open);

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        setIsAuthenticated(false);
        setUsername(null);
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
                    
                    {loading ? (
                        <span className="navbar-link loading">Yükleniyor...</span>
                    ) : isAuthenticated && username ? (
                        <>
                            <NavLink
                                to={`/profile/${username}`}
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
