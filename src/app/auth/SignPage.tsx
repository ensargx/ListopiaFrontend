// src/pages/SignInPage.tsx
import React, { useEffect, useState } from "react";
import { redirect, useNavigate } from "react-router-dom";
import { signIn, signUp, fetchUserMe } from "@/api/userapi";
import "./style/SignPage.css";
import { useAuth } from "@/app/auth/hooks/AuthContext";
import { useReCaptcha } from "./hooks/useReCaptcha";
import {toast} from "react-toastify";

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
    const { loaded, execute } = useReCaptcha()

    if ( user ) {
        redirect("/");
        return;
    }
    
    const handleLoginSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        const token = await execute("login");
        if (!token) {
            setError("Recaptcha token not generated");
            setLoading(false);
            return;
        }
        
        try {
            // 1) Sign in, get token
            const response  = await signIn(username, password, token);
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

        const token = await execute("register");
        if (!token) {
            setError("Recaptcha token not generated");
            setLoading(false);
            return;
        }

        try {
            // 1) Sign up, get token
            const response = await signUp(email, password, firstName, lastName, username, token);
            if(response.success){
                toast.success('Succesfully registered. Please check your mail immediately expires 15 min');
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

    return (
        <div className="auth-container">
            <div className="auth-card">
                <div className="auth-header">
                    <h1>{isLogin ? "Sign In" : "Sign Up"}</h1>
                    <div className="auth-tabs">
                        <button 
                            className={`auth-tab ${isLogin ? 'active' : ''}`} 
                            onClick={() => setIsLogin(true)}
                            type="button"
                        >
                            Sign In
                        </button>
                        <button 
                            className={`auth-tab ${!isLogin ? 'active' : ''}`} 
                            onClick={() => setIsLogin(false)}
                            type="button"
                        >
                            Register
                        </button>
                    </div>
                </div>

                {isLogin ? (
                    <form onSubmit={handleLoginSubmit} className="auth-form">
                        <div className="form-group">
                            <label htmlFor="login-email">Username</label>
                            <input
                                id="login-username"
                                // type="email"
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                                required
                                disabled={loading || !loaded}
                                placeholder="Username"
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
                                disabled={loading || !loaded}
                                placeholder="Password"
                            />
                        </div>

                        {error && <p className="error-message">{error}</p>}

                        <button type="submit" className="auth-button" disabled={loading}>
                            {loading ? "Signing In..." : "Sign In"}
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
                                placeholder="Email Address"
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
                                    placeholder="Name"
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
                                    placeholder="Last Name"
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
                            {loading ? "Signing Up..." : "Sign Up"}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default SignPage;
