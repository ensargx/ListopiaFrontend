import { Outlet } from 'react-router-dom';
import Navbar from '@/components/Navbar';

const MainLayout = () => (
    <>
        <Navbar />
        <main>
            <Outlet />
        </main>
    </>
);

export default MainLayout;
