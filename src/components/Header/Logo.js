import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Separator } from "../../components/ui/separator";
export default function Logo() {
    return (_jsx("div", { className: 'text-2xl font-bold', children: _jsxs("div", { className: "flex items-center space-x-1", children: [_jsx("h6", { className: "text-white logo-font", style: { fontSize: '34px' }, children: "Listopia" }), _jsx(Separator, { orientation: 'vertical', className: 'bg-white/20 h-[20px]' }), _jsx("img", { src: "/listopia.svg", alt: "Logo", width: 30, height: 30 })] }) }));
}
;
