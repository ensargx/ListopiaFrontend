import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/pages/SignInPage.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signIn, signUp, fetchUserMe } from "@/app/api_/userapi";
import "./SignPage.css";
const SignPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        try {
            // 1) Sign in, get token
            const response = await signIn(email, password);
            if (response.success) {
                const me = await fetchUserMe();
                navigate(`/profile/${encodeURIComponent(me.username)}`);
            }
            else {
                setError(response.message);
            }
        }
        catch (err) {
            setError(err.message || "Giriş yapılırken bir hata oluştu");
        }
        finally {
            setLoading(false);
        }
    };
    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        try {
            // 1) Sign up, get token
            const response = await signUp(email, password, firstName, lastName, username);
            if (response.success) {
                const me = await fetchUserMe();
                navigate(`/profile/${encodeURIComponent(me.username)}`);
            }
            else {
                setError(response.message);
            }
            // 2) Redirect to profile page
        }
        catch (err) {
            setError(err.message || "Kayıt olurken bir hata oluştu");
        }
        finally {
            setLoading(false);
        }
    };
    const toggleForm = () => {
        setIsLogin(!isLogin);
        setError(null);
    };
    return (_jsx("div", { className: "auth-container", children: _jsxs("div", { className: "auth-card", children: [_jsxs("div", { className: "auth-header", children: [_jsx("h1", { children: isLogin ? "Giriş Yap" : "Kayıt Ol" }), _jsxs("div", { className: "auth-tabs", children: [_jsx("button", { className: `auth-tab ${isLogin ? 'active' : ''}`, onClick: () => setIsLogin(true), type: "button", children: "Giri\u015F" }), _jsx("button", { className: `auth-tab ${!isLogin ? 'active' : ''}`, onClick: () => setIsLogin(false), type: "button", children: "Kay\u0131t" })] })] }), isLogin ? (_jsxs("form", { onSubmit: handleLoginSubmit, className: "auth-form", children: [_jsxs("div", { className: "form-group", children: [_jsx("label", { htmlFor: "login-email", children: "Email" }), _jsx("input", { id: "login-email", type: "email", value: email, onChange: e => setEmail(e.target.value), required: true, disabled: loading, placeholder: "Email adresiniz" })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { htmlFor: "login-password", children: "\u015Eifre" }), _jsx("input", { id: "login-password", type: "password", value: password, onChange: e => setPassword(e.target.value), required: true, disabled: loading, placeholder: "\u015Eifreniz" })] }), error && _jsx("p", { className: "error-message", children: error }), _jsx("button", { type: "submit", className: "auth-button", disabled: loading, children: loading ? "Giriş yapılıyor..." : "Giriş Yap" })] })) : (_jsxs("form", { onSubmit: handleRegisterSubmit, className: "auth-form", children: [_jsxs("div", { className: "form-group", children: [_jsx("label", { htmlFor: "reg-email", children: "Email" }), _jsx("input", { id: "reg-email", type: "email", value: email, onChange: e => setEmail(e.target.value), required: true, disabled: loading, placeholder: "Email adresiniz" })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { htmlFor: "reg-username", children: "Kullan\u0131c\u0131 Ad\u0131" }), _jsx("input", { id: "reg-username", type: "text", value: username, onChange: e => setUsername(e.target.value), required: true, disabled: loading, placeholder: "Kullan\u0131c\u0131 ad\u0131n\u0131z" })] }), _jsxs("div", { className: "form-row", children: [_jsxs("div", { className: "form-group", children: [_jsx("label", { htmlFor: "reg-firstname", children: "Ad" }), _jsx("input", { id: "reg-firstname", type: "text", value: firstName, onChange: e => setFirstName(e.target.value), required: true, disabled: loading, placeholder: "Ad\u0131n\u0131z" })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { htmlFor: "reg-lastname", children: "Soyad" }), _jsx("input", { id: "reg-lastname", type: "text", value: lastName, onChange: e => setLastName(e.target.value), required: true, disabled: loading, placeholder: "Soyad\u0131n\u0131z" })] })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { htmlFor: "reg-password", children: "\u015Eifre" }), _jsx("input", { id: "reg-password", type: "password", value: password, onChange: e => setPassword(e.target.value), required: true, disabled: loading, placeholder: "\u015Eifreniz" })] }), error && _jsx("p", { className: "error-message", children: error }), _jsx("button", { type: "submit", className: "auth-button", disabled: loading, children: loading ? "Kayıt olunuyor..." : "Kayıt Ol" })] }))] }) }));
};
export default SignPage;
