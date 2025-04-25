import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
// src/app/components/Navbar.tsx  (veya senin dosya yapına göre konumlandır)
import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { fetchUserMe } from '@/app/api_/userapi';
import './Navbar.css';
export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState(null);
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
                }
                catch (error) {
                    // Token is invalid or expired
                    localStorage.removeItem('authToken');
                    setIsAuthenticated(false);
                    setUsername(null);
                }
            }
            else {
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
    return (_jsx("header", { className: "navbar", children: _jsxs("div", { className: "navbar-container", children: [_jsx(Link, { to: "/", className: "navbar-logo", children: "\uD83C\uDFAC Listopia" }), _jsx("button", { className: "navbar-toggle", onClick: toggleMenu, "aria-label": "Toggle navigation", children: "\u2630" }), _jsxs("nav", { className: `navbar-menu ${isOpen ? 'open' : ''}`, children: [_jsx(NavLink, { to: "/", end: true, className: ({ isActive }) => isActive ? 'navbar-link active' : 'navbar-link', onClick: () => setIsOpen(false), children: "Ana Sayfa" }), _jsx(NavLink, { to: "/genres", className: ({ isActive }) => isActive ? 'navbar-link active' : 'navbar-link', onClick: () => setIsOpen(false), children: "Filmler" }), loading ? (_jsx("span", { className: "navbar-link loading", children: "Y\u00FCkleniyor..." })) : isAuthenticated && username ? (_jsxs(_Fragment, { children: [_jsx(NavLink, { to: `/profile/${username}`, className: ({ isActive }) => isActive ? 'navbar-link active' : 'navbar-link', onClick: () => setIsOpen(false), children: "Profilim" }), _jsx("button", { className: "navbar-link logout-button", onClick: () => {
                                        setIsOpen(false);
                                        handleLogout();
                                    }, children: "\u00C7\u0131k\u0131\u015F Yap" })] })) : (_jsx(NavLink, { to: "/signin", className: ({ isActive }) => isActive ? 'navbar-link active' : 'navbar-link', onClick: () => setIsOpen(false), children: "Giri\u015F Yap" }))] })] }) }));
};
export default Navbar;
