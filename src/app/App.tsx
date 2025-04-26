// src/routes.tsx
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import ScrollToTop from '@/components/ScrollToTop';
import AnimatedRoutes from '@/app/routes/AnimatedRoutes';
import Footer from '@/components/Footer';
import LinkedInMessagePopup from '@/components/MessagePopUp';
import { useAuth } from './auth/hooks/AuthContext';

export default function App() {
    const { user } = useAuth();
    return (
        <BrowserRouter>
            <Navbar />
            <ScrollToTop />
            <AnimatedRoutes />
            <LinkedInMessagePopup/>
            <Footer />
        </BrowserRouter>
    );
}
