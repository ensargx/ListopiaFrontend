import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import HomePage from '@/features/home/HomePage';
import GenrePage from '@/features/genre/GenrePage';
import MoviePage from '@/features/movie/MoviePage';
import ProfilePage from '@/features/profile/ProfilePage';
import SignPage from '@/features/sign/SignPage';
import './AnimatedRoutes.css';
const AnimatedRoutes = () => {
    const location = useLocation();
    // Create a ref for CSSTransition to use instead of findDOMNode
    const nodeRef = useRef(null);
    return (_jsx(TransitionGroup, { component: null, children: _jsx(CSSTransition, { nodeRef: nodeRef, classNames: "fade", timeout: { exit: 100, enter: 600 }, children: _jsx("div", { ref: nodeRef, className: "fade-wrapper", children: _jsxs(Routes, { location: location, children: [_jsx(Route, { path: "/", element: _jsx(HomePage, {}) }), _jsx(Route, { path: "/genres", element: _jsx(GenrePage, {}) }), _jsx(Route, { path: "/genres/:genre", element: _jsx(GenrePage, {}) }), _jsx(Route, { path: "/movies/:movieId", element: _jsx(MoviePage, {}) }), _jsx(Route, { path: "/profile/:username", element: _jsx(ProfilePage, {}) }), _jsx(Route, { path: "/signin", element: _jsx(SignPage, {}) }), _jsx(Route, { path: "/login", element: _jsx(SignPage, {}) }), _jsx(Route, { path: "/register", element: _jsx(SignPage, {}) })] }) }) }, location.pathname) }));
};
export default AnimatedRoutes;
