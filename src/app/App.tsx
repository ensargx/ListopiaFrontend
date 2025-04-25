import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import ScrollToTop from '@/components/ScrollToTop';
import AnimatedRoutes from '@/components/AnimatedRoutes';  // ← kesinlikle buradan alıyoruz
import './index.css';  // genel stiller
import { AuthProvider } from "./AuthContext";
// NOT: AnimatedRoutes.css içeriğini aşağıda (2. adım) import edeceğiz

const App: React.FC = () => (
    <AuthProvider>
        <BrowserRouter>
            <Navbar />
            <ScrollToTop />
            <AnimatedRoutes />    {/* ← buraya geçişli rotalar */}
        </BrowserRouter>
    </AuthProvider>
);

export default App;
