import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useRef, useState } from 'react';
import Container from '../ui/Container';
import Logo from './Logo';
import { AnimatePresence, motion } from 'framer-motion';
import { Separator } from '@radix-ui/react-separator';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import SlideTabs from '../ui/SlideTabs';
import { CircleUserRound } from "lucide-react";
import { Link } from 'react-router-dom';
const searchMessage = [
    "Search for anything...",
    "What are you looking for today?",
    "Type to search...",
    "Enter your query here...",
    "Search for movies, actors, or genres...",
    "Find your next favorite film...",
    "Type a movie title here...",
    "Discover trending movies..."
];
export default function Header() {
    const searchInputRef = useRef(null);
    const [showSearch, setShowSearch] = useState(false);
    const [showMenus, setShowMenus] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    // Rastgele placeholder mesajı seçme
    const randomIndex = Math.floor(Math.random() * searchMessage.length);
    const randomMessage = searchMessage[randomIndex];
    const handleSearchIconClick = () => {
        // Arama inputunun görünürlüğünü toggle et
        setShowSearch(prev => !prev);
        console.log('Search icon clicked');
    };
    // Pencere boyutuna göre isMobile durumunu ayarla
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 800);
            // Eğer genişlik desktop boyutuna dönerse, animasyonlu menüyü kapat.
            if (window.innerWidth >= 800) {
                setShowMenus(false);
            }
        };
        // İlk kontrol
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    // Mobilde animasyonlu menüyü toggle eden fonksiyon
    const handleNavBar = () => {
        if (window.innerWidth < 800) {
            setShowMenus(prev => !prev);
            console.log('Mobil menü toggle edildi');
        }
    };
    return (_jsxs(Container, { className: "bg-gray-900 h-20 backdrop-blur-md p-4 flex items-center", children: [_jsx(Link, { to: "/home", children: _jsx(motion.button, { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 2 }, children: _jsx(Logo, {}) }) }), _jsxs("div", { className: "flex items-center ml-auto space-x-6 text-white", children: [_jsx(Separator, { orientation: "vertical", className: " h-5" }), !isMobile ? (_jsx(SlideTabs, {})) : (_jsxs(_Fragment, { children: [_jsx("button", { onClick: handleNavBar, className: "focus:outline-none", children: _jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", className: "cursor-pointer", children: [_jsx("line", { x1: "3", y1: "6", x2: "21", y2: "6" }), _jsx("line", { x1: "3", y1: "12", x2: "21", y2: "12" }), _jsx("line", { x1: "3", y1: "18", x2: "21", y2: "18" })] }) }), _jsx(AnimatePresence, { children: showMenus && (_jsx(motion.div, { initial: { width: 0, opacity: 0 }, animate: { width: 200, opacity: 1 }, exit: { width: 0, opacity: 0 }, transition: { duration: 0.3 }, className: "overflow-auto max-h-[calc(160vh-80px)]", children: _jsx(SlideTabs, {}) })) })] })), _jsx(Separator, { orientation: "vertical", className: "bg-white/20 h-5" }), _jsx(AnimatePresence, { children: showSearch && (_jsx(motion.div, { initial: { width: 0, opacity: 0 }, animate: { width: 200, opacity: 1 }, exit: { width: 0, opacity: 0 }, transition: { duration: 0.3 }, className: "overflow-hidden", children: _jsx(Input, { ref: searchInputRef, type: "search", placeholder: randomMessage, className: "flex-grow" }) })) }), _jsx("button", { onClick: handleSearchIconClick, className: "focus:outline-none", children: _jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", className: "cursor-pointer", children: [_jsx("circle", { cx: "11", cy: "11", r: "8" }), _jsx("path", { d: "m21 21-4.3-4.3" })] }) }), _jsx(Button, { className: "w-8 h-8 p-0 rounded-full ", children: _jsx(CircleUserRound, { onClick: () => alert('Profile Icon Clicked'), className: "w-8 h-8 object-contain align-middle " }) })] })] }));
}
