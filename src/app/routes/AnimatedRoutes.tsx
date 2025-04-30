import React, { useRef } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import HomePage from '@/app/home/HomePage';
import GenrePage from '@/app/genre/GenrePage';
import MoviePage from '@/app/movie/MoviePage';
import ProfilePage from '@/app/profile/ProfilePage';
import SignPage from '@/app/auth/SignPage';
import DashboardPage from '@/app/dashboard/AdminDashboardPage';

import './AnimatedRoutes.css';

const AnimatedRoutes: React.FC = () => {
    const location = useLocation();

    // Create a ref for CSSTransition to use instead of findDOMNode
    const nodeRef = useRef<HTMLDivElement>(null);

    return (
        <TransitionGroup component={null}>
            <CSSTransition
                key={location.pathname}
                nodeRef={nodeRef}
                classNames="fade"
                timeout={{ exit: 100, enter: 600 }}
            >
                {/* attach the ref here */}
                <div ref={nodeRef} className="fade-wrapper">
                    <Routes location={location}>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/genres" element={<GenrePage />} />
                        <Route path="/genres/:genre" element={<GenrePage />} />
                        <Route path="/movies/:movieSlug" element={<MoviePage />} />
                        <Route path="/profile/:username" element={<ProfilePage/>}/>
                        <Route path="/signin" element={<SignPage/>}/>
                        <Route path="/login" element={<SignPage/>}/>
                        <Route path="/register" element={<SignPage/>}/>
                        <Route path="/admin/dashboard" element={<DashboardPage/>}/>
                        {/* …other routes… */}
                    </Routes>
                </div>
            </CSSTransition>
        </TransitionGroup>
    );
};

export default AnimatedRoutes;
