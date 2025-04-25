// src/routes.tsx
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from '@/components/Header/Navbar';
import ScrollToTop from '@/components/ScrollToTop';
import AnimatedRoutes from '@/app/routes/AnimatedRoutes';
import Footer from '@/components/Footer';

export default function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <ScrollToTop />
            <AnimatedRoutes />
            <Footer />
        </BrowserRouter>
    );
}
