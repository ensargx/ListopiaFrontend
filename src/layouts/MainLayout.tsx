// src/layouts/MainLayout.tsx

import React from "react";
import { Link } from "react-router-dom";

export default function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-black text-white">
            {/* Navbar */}
            <header className="w-full px-4 md:px-10 py-4 flex items-center justify-between border-b border-gray-800 bg-zinc-900">
                <Link to="/" className="text-2xl font-bold text-white flex items-center gap-2">
                    <span role="img" aria-label="icon">📚</span> Listopia
                </Link>

                <nav className="flex gap-6 text-sm sm:text-base">
                    <Link to="/" className="hover:underline">Anasayfa</Link>
                    <Link to="/genre" className="hover:underline">Türler</Link>
                    <Link to="/comments" className="hover:underline">Yorumlar</Link>
                    <Link to="/profile" className="hover:underline">Profil</Link>
                </nav>
            </header>

            {/* Sayfa içeriği */}
            <main className="max-w-screen-xl mx-auto w-full">{children}</main>
        </div>
    );
}
