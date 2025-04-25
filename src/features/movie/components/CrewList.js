import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import './CrewList.css';
const CrewList = ({ crews }) => {
    const [expanded, setExpanded] = useState(false);
    const limit = 5;
    const toShow = expanded ? crews : crews.slice(0, limit);
    return (_jsxs("section", { className: "crew-list", children: [_jsx("h3", { children: "Crew" }), _jsx("ul", { children: toShow.map((c, idx) => (_jsxs("li", { children: [_jsx("strong", { children: c.originalName }), " \u2014 ", c.department, ", ", c.job] }, `${c.personId ?? 'noid'}-${c.job}-${idx}`))) }), crews.length > limit && (_jsx("button", { className: "crew-expand-btn", onClick: () => setExpanded(!expanded), children: expanded ? 'Show less' : '… Show all' }))] }));
};
export default CrewList;
