import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
export default function SlideTabs() {
    // Aktif sekmenin index'ini takip ediyoruz.
    const [activeTab, setActiveTab] = useState(0);
    // Tıklanan sekmenin konum bilgisini saklıyoruz.
    const [activePosition, setActivePosition] = useState({
        left: 0,
        width: 0,
        opacity: 1,
    });
    // Anlık konumu (hover sırasında güncellenebilir) activePosition'a göre başlatıyoruz.
    const [position, setPosition] = useState(activePosition);
    return (_jsxs("ul", { 
        // Fare sekmelerin dışına çıktığında aktif sekmenin konumunu geri yüklüyoruz.
        onMouseLeave: () => {
            setPosition(activePosition);
        }, className: "relative mx-auto flex flex-nowrap w-fit rounded-full border-2 border-gray-900 bg-gray-900 p-1 space-x-2", children: [_jsx(Link, { to: "/home/new-releases", children: _jsx(Tab, { index: 0, activeTab: activeTab, setActiveTab: setActiveTab, setPosition: setPosition, setActivePosition: setActivePosition, children: "New Releases" }) }), _jsx(Link, { to: "/home/genre", children: _jsx(Tab, { index: 1, activeTab: activeTab, setActiveTab: setActiveTab, setPosition: setPosition, setActivePosition: setActivePosition, children: "Genre" }) }), _jsx(Link, { to: "/home/movie", children: _jsx(Tab, { index: 2, activeTab: activeTab, setActiveTab: setActiveTab, setPosition: setPosition, setActivePosition: setActivePosition, children: "Mov\u015Fe" }) }), _jsx(Cursor, { position: position })] }));
}
function Tab({ index, children, setActiveTab, setPosition, setActivePosition, onClick, }) {
    const ref = useRef(null);
    const handleMouseEnter = () => {
        if (!ref.current)
            return;
        const { width } = ref.current.getBoundingClientRect();
        setPosition({
            left: ref.current.offsetLeft,
            width,
            opacity: 1,
        });
    };
    const handleClick = () => {
        setActiveTab(index);
        if (!ref.current)
            return;
        const { width } = ref.current.getBoundingClientRect();
        const newPos = {
            left: ref.current.offsetLeft,
            width,
            opacity: 1,
        };
        setPosition(newPos);
        setActivePosition(newPos); // Tıklanan sekmenin konumunu kaydediyoruz
        if (onClick)
            onClick();
    };
    return (_jsx("li", { ref: ref, onMouseEnter: handleMouseEnter, onClick: handleClick, className: "relative z-10 block cursor-pointer px-3 py-1.5 text-xs uppercase text-white mix-blend-difference md:px-5 md:py-2 md:text-base", children: children }));
}
function Cursor({ position }) {
    return (_jsx(motion.li, { animate: {
            ...position,
        }, className: "absolute z-0 h-1 bottom-0 rounded-full bg-white " }));
}
