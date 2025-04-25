// src/pages/SignInPage.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signIn, signUp, fetchUserMe } from "@/app/api_/userapi";
import "./SignPage.css";

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

    const handleLoginSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            // 1) Sign in, get token
            const response  = await signIn(email, password);
            if(response.success){
                const me = await fetchUserMe();
                navigate(`/profile/${encodeURIComponent(me.username)}`);
            }else{
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
                    <h1>{isLogin ? "Giriş Yap" : "Kayıt Ol"}</h1>
                    <div className="auth-tabs">
                        <button 
                            className={`auth-tab ${isLogin ? 'active' : ''}`} 
                            onClick={() => setIsLogin(true)}
                            type="button"
                        >
                            Giriş
                        </button>
                        <button 
                            className={`auth-tab ${!isLogin ? 'active' : ''}`} 
                            onClick={() => setIsLogin(false)}
                            type="button"
                        >
                            Kayıt
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
                                placeholder="Email adresiniz"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="login-password">Şifre</label>
                            <input
                                id="login-password"
                                type="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                required
                                disabled={loading}
                                placeholder="Şifreniz"
                            />
                        </div>

                        {error && <p className="error-message">{error}</p>}

                        <button type="submit" className="auth-button" disabled={loading}>
                            {loading ? "Giriş yapılıyor..." : "Giriş Yap"}
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
                                placeholder="Email adresiniz"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="reg-username">Kullanıcı Adı</label>
                            <input
                                id="reg-username"
                                type="text"
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                                required
                                disabled={loading}
                                placeholder="Kullanıcı adınız"
                            />
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="reg-firstname">Ad</label>
                                <input
                                    id="reg-firstname"
                                    type="text"
                                    value={firstName}
                                    onChange={e => setFirstName(e.target.value)}
                                    required
                                    disabled={loading}
                                    placeholder="Adınız"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="reg-lastname">Soyad</label>
                                <input
                                    id="reg-lastname"
                                    type="text"
                                    value={lastName}
                                    onChange={e => setLastName(e.target.value)}
                                    required
                                    disabled={loading}
                                    placeholder="Soyadınız"
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="reg-password">Şifre</label>
                            <input
                                id="reg-password"
                                type="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                required
                                disabled={loading}
                                placeholder="Şifreniz"
                            />
                        </div>

                        {error && <p className="error-message">{error}</p>}

                        <button type="submit" className="auth-button" disabled={loading}>
                            {loading ? "Kayıt olunuyor..." : "Kayıt Ol"}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default SignPage;
