import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BrowserRouter } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import ScrollToTop from '@/components/ScrollToTop';
import AnimatedRoutes from '@/components/AnimatedRoutes'; // ← kesinlikle buradan alıyoruz
import './index.css'; // genel stiller
import { AuthProvider } from "./AuthContext";
// NOT: AnimatedRoutes.css içeriğini aşağıda (2. adım) import edeceğiz
const App = () => (_jsx(AuthProvider, { children: _jsxs(BrowserRouter, { children: [_jsx(Navbar, {}), _jsx(ScrollToTop, {}), _jsx(AnimatedRoutes, {}), "    "] }) }));
export default App;
