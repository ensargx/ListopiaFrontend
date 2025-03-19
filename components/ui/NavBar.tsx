import React, { useRef, useState, useEffect } from 'react';
import Container from '@/components/ui/Container';
import Logo from '@/components/header/Logo';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import SlideTabs from './SlideTabs';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';

const searchMessage = [
  "Search for anything...",
  "What are you looking for today?",
  "Type to search...",
  "Enter your query here...",
  "Search for movies, actors, or genres...",
  "Find your next favorite film...",
  "Type a movie title here...",
  "Discover trending movies..."
];

export default function NavBar() {
  const searchInputRef = useRef(null);
  const [showSearch, setShowSearch] = useState(false);
  const [showMenus, setShowMenus] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();

  // Rastgele placeholder mesajı seçme
  const randomIndex = Math.floor(Math.random() * searchMessage.length);
  const randomMessage = searchMessage[randomIndex];

  const handleClick = () => {
    router.push("/home");
  };

  const handleSearchIconClick = () => {
    // Arama inputunun görünürlüğünü toggle et
    setShowSearch(prev => !prev);
    console.log('Search icon clicked');
  };

  // Pencere boyutuna göre isMobile durumunu ayarla
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 860);
      // Eğer genişlik desktop boyutuna dönerse, animasyonlu menüyü kapat.
      if (window.innerWidth >= 860) {
        setShowMenus(false);
      }
    };

    // İlk kontrol
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Mobilde animasyonlu menüyü toggle eden fonksiyon
  const handleNavBar = () => {
    if (window.innerWidth < 800) {
      setShowMenus(prev => !prev);
      console.log('Mobil menü toggle edildi');
    }
  };

  return (
    <Container className=" relative bg-gray-900 h-20 backdrop-blur-md p-4 flex items-center justify-between">
      {/* Sol kısım: Logo */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        onClick={handleClick}
      >
        <Logo />
      </motion.button>

      {/* Sağ kısım: Arama, menü ve profil ikonları */}
      <div className="flex items-center ml-auto space-x-6 text-white">
        <Separator orientation="vertical" className=" h-5" />

        {/* Eğer mobil değilsek, SlideTabs her zaman gösterilsin */}
        {!isMobile ? (
          <SlideTabs />
        ) : (
          <>
            {/* Mobilde hamburger menü butonu */}
            <button onClick={handleNavBar} className="focus:outline-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="cursor-pointer"
              >
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
            {/* Mobilde animasyonlu SlideTabs */}
            <AnimatePresence>
              {showMenus && (
                <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 200, opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute right-0 top-full mt-2 ml-8 overflow-auto max-h-[calc(160vh-80px)]"

                >
                  <SlideTabs />
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}

        <Separator orientation="vertical" className="bg-white/20 h-5" />

        <AnimatePresence>
          {showSearch && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 200, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <Input
                ref={searchInputRef}
                type="search"
                placeholder={randomMessage}
                className="flex-grow"
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Arama İkonu */}
        <button onClick={handleSearchIconClick} className="focus:outline-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="cursor-pointer"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
        </button>

        {/* Profil İkonu */}
        <Button className="w-8 h-8 p-0">
          <Image
            src="/user-circle.svg"
            alt="Profile Icon"
            width={32}
            height={32}
            onClick={() => alert('Profile Icon Clicked')}
            className="w-8 h-8 object-contain align-middle"
          />
        </Button>
      </div>
    </Container>
  );
}
