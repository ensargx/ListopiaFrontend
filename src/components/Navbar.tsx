import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Navbar.css'; // stil dosyasını unutma

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <Link to="/">🎬 Listopia</Link>
            </div>
            <button className="navbar-toggle" onClick={toggleMenu}>
                ☰
            </button>
            <ul className={`navbar-links ${isOpen ? 'open' : ''}`}>
                <li><NavLink to="/" end> Anasayfa </NavLink></li>
                <li><NavLink to="/genre"> Türler </NavLink></li>
                <li><NavLink to="/reviews"> Yorumlar </NavLink></li>
                <li><NavLink to="/profile"> Profil </NavLink></li>
            </ul>
        </nav>
    );
};

export default Navbar;
