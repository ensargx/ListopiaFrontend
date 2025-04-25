import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Header from './Header';
import Footer from './Footer';
const Layout = ({ children }) => {
    return (_jsxs("div", { className: "flex flex-col min-h-screen", children: [_jsx(Header, {}), _jsx("main", { className: "flex-grow", children: children }), _jsx(Footer, {})] }));
};
export default Layout;
