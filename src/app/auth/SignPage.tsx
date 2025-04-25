// src/pages/SignInPage.tsx
import React, { useState } from "react";
import { redirect, useNavigate } from "react-router-dom";
import { signIn, signUp, fetchUserMe } from "@/api/userapi";
import "./SignPage.css";
import { useAuth } from "@/components/AuthContext";

const SignPage: React.FC = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { user, login, logout } = useAuth();
    document.title = `Sign in - Listopia`;
    if ( user ) {
        redirect("/");
        return;
    }

    const handleLoginSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            // 1) Sign in, get token
            const response  = await signIn(email, password);
            if(response.success){
                const me = await fetchUserMe();
                login(me);
                navigate(`/profile/${encodeURIComponent(me.username)}`);
            }else{
                logout();
                setError(response.message);
            }


        } catch (err: any) {
            setError(err.message || "Giriş yapılırken bir hata oluştu");
        } finally {
            setLoading(false);
        }
    };

    const handleRegisterSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            // 1) Sign up, get token
            const response = await signUp(email, password, firstName, lastName, username);
            if(response.success){
                const me = await fetchUserMe();
                navigate(`/profile/${encodeURIComponent(me.username)}`);
            }else{
                setError(response.message);
            }
            // 2) Redirect to profile page
        } catch (err: any) {
            setError(err.message || "Kayıt olurken bir hata oluştu");
        } finally {
            setLoading(false);
        }
    };

    const toggleForm = () => {
        setIsLogin(!isLogin);
        setError(null);
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <div className="auth-header">
                    <div className="auth-tabs">
                        <button 
                            className={`auth-tab ${isLogin ? 'active' : ''}`} 
                            onClick={() => setIsLogin(true)}
                            type="button"
                        >
                            Sign in
                        </button>
                        <button 
                            className={`auth-tab ${!isLogin ? 'active' : ''}`} 
                            onClick={() => setIsLogin(false)}
                            type="button"
                        >
                            Sign Up
                        </button>
                    </div>
                </div>

                {isLogin ? (
                    <form onSubmit={handleLoginSubmit} className="auth-form">
                        <div className="form-group">
                            <label htmlFor="login-email">Email</label>
                            <input
                                id="login-email"
                                type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                required
                                disabled={loading}
                                placeholder="Email"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="login-password">Password</label>
                            <input
                                id="login-password"
                                type="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                required
                                disabled={loading}
                                placeholder="Password"
                            />
                        </div>

                        {error && <p className="error-message">{error}</p>}

                        <button type="submit" className="auth-button" disabled={loading}>
                            {loading ? "Signing in..." : "Sign In"}
                        </button>
                    </form>
                ) : (
                    <form onSubmit={handleRegisterSubmit} className="auth-form">
                        <div className="form-group">
                            <label htmlFor="reg-email">Email</label>
                            <input
                                id="reg-email"
                                type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                required
                                disabled={loading}
                                placeholder="Email"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="reg-username">Username</label>
                            <input
                                id="reg-username"
                                type="text"
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                                required
                                disabled={loading}
                                placeholder="Username"
                            />
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="reg-firstname">Name</label>
                                <input
                                    id="reg-firstname"
                                    type="text"
                                    value={firstName}
                                    onChange={e => setFirstName(e.target.value)}
                                    required
                                    disabled={loading}
                                    placeholder="Your name"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="reg-lastname">Last Name</label>
                                <input
                                    id="reg-lastname"
                                    type="text"
                                    value={lastName}
                                    onChange={e => setLastName(e.target.value)}
                                    required
                                    disabled={loading}
                                    placeholder="Your last name"
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="reg-password">Password</label>
                            <input
                                id="reg-password"
                                type="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                required
                                disabled={loading}
                                placeholder="Password"
                            />
                        </div>

                        {error && <p className="error-message">{error}</p>}

                        <button type="submit" className="auth-button" disabled={loading}>
                            {loading ? "Signing up..." : "Sign Up"}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default SignPage;
