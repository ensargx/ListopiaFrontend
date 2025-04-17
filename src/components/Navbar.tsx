import { Link } from 'react-router-dom';

const Navbar = () => (
    <nav>
        <ul>
            <li><Link to="/">Anasayfa</Link></li>
            <li><Link to="/reviews">Yorumlar</Link></li>
            <li><Link to="/profile">Profil</Link></li>
        </ul>
    </nav>
);

export default Navbar;
