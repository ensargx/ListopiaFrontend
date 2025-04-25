import { jsx as _jsx } from "react/jsx-runtime";
import './SearchBar.css';
export const SearchBar = ({ value, onChange }) => (_jsx("div", { className: "search-bar", children: _jsx("input", { type: "text", placeholder: "Search movies...", value: value, onChange: e => onChange(e.target.value) }) }));
