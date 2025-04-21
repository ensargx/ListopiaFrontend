// src/routes.tsx
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import ScrollToTop from '@/components/ScrollToTop';
import AnimatedRoutes from '@/components/AnimatedRoutes';

export default function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <ScrollToTop />
            <AnimatedRoutes />
        </BrowserRouter>
    );
}
