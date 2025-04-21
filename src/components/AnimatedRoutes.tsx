import React, { useRef } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import HomePage from '@/features/home/HomePage';
import GenrePage from '@/features/genre/GenrePage';
import MoviePage from '@/features/movie/MoviePage';
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
                timeout={{ exit: 100, enter: 500 }}
            >
                {/* attach the ref here */}
                <div ref={nodeRef} className="fade-wrapper">
                    <Routes location={location}>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/genres" element={<GenrePage />} />
                        <Route path="/genres/:genre" element={<GenrePage />} />
                        <Route path="/movies/:movieId" element={<MoviePage />} />
                        {/* …other routes… */}
                    </Routes>
                </div>
            </CSSTransition>
        </TransitionGroup>
    );
};

export default AnimatedRoutes;
