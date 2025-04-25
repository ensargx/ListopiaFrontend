import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BrowserRouter } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import ScrollToTop from '@/components/ScrollToTop';
import AnimatedRoutes from '@/components/AnimatedRoutes';
export default function App() {
    return (_jsxs(BrowserRouter, { children: [_jsx(Navbar, {}), _jsx(ScrollToTop, {}), _jsx(AnimatedRoutes, {})] }));
}
