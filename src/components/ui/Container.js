import { jsx as _jsx } from "react/jsx-runtime";
import { cn } from "../../lib/utils";
export default function Container({ className, children }) {
    return (_jsx("div", { className: cn("w-full h-full", className), children: children }));
}
