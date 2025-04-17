// src/routes.tsx veya App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import  Navbar  from '@/components/Navbar'
import { HomePage } from '@/features/home/HomePage'

export function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                {/* diğer rotalar */}
            </Routes>
        </BrowserRouter>
    )
}
