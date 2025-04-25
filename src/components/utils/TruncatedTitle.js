import { jsx as _jsx } from "react/jsx-runtime";
import { CardDescription } from "../ui/card";
export const TruncatedTitle = ({ title, maxLength }) => {
    const truncatedTitle = title.length > maxLength ? title.slice(0, maxLength) + '...' : title;
    return (_jsx(CardDescription, { className: "flex text-xl font-bold m-2 px-6 w-full truncate justify-items-center", children: truncatedTitle }));
};
