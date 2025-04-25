import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Card, CardAction, CardContent } from "../ui/card";
import { TruncatedTitle } from "../utils/TruncatedTitle";
import { CircleCheck, CirclePlus, Eye, EyeClosed } from "lucide-react";
export function HomeCard({ id, title, rating, description, url }) {
    const [watchLater, setWatchLater] = useState(false);
    const [addList, setAddList] = useState(false);
    const handleWatchLater = () => {
        console.log("Watch Later önce:", watchLater);
        setWatchLater(prev => !prev);
        console.log("Watch Later sonra:", !watchLater);
    };
    const handleAddList = () => {
        console.log("Add List önce:", addList);
        setAddList(prev => !prev);
        console.log("Add List sonra:", !addList);
    };
    return (_jsxs(Card, { children: [_jsxs(CardContent, { className: "flex flex-col items-center justify-center text-center p-5", children: [_jsx("img", { loading: "lazy", src: url, alt: `Poster ${id + 1}`, width: 200, height: 300, className: "object-cover rounded-md shadow-lg border-gray-900" }), _jsx(TruncatedTitle, { title: title, maxLength: 90 }), _jsx("p", { className: "text-gray-600", children: description }), _jsxs("div", { className: "mt-2 flex items-center justify-center", children: [_jsx("span", { className: "text-yellow-500", children: "\u2B50" }), _jsx("span", { className: "ml-1", children: rating })] })] }), _jsxs(CardAction, { className: "flex m-5 gap-5", children: [_jsxs("button", { onClick: handleWatchLater, children: [watchLater ? _jsx(Eye, {}) : _jsx(EyeClosed, {}), watchLater ? "Added" : "Watch Later"] }), _jsxs("button", { onClick: handleAddList, children: [addList ? _jsx(CircleCheck, {}) : _jsx(CirclePlus, {}), addList ? "Added" : "Add List"] })] })] }));
}
