import { Routes, Route } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import HomePage from '@/features/home/HomePage';
// import MovieDetailPage from '@/features/movie/MovieDetailPage';
// import ReviewsPage from '@/features/reviews/ReviewsPage';
// import ProfilePage from '@/features/profile/ProfilePage';

const AppRoutes = () => {
    return (
        <Routes>
            <Route element={<MainLayout />}>
                <Route path="/" element={<HomePage />} />
                {/*<Route path="/movie/:id" element={<MovieDetailPage />} />*/}
                {/*<Route path="/reviews" element={<ReviewsPage />} />*/}
                {/*<Route path="/profile" element={<ProfilePage />} />*/}
            </Route>
        </Routes>
    );
};

export default AppRoutes;
