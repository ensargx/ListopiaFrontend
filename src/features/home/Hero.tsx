import { useEffect, useState } from 'react';
import { movies, Movie } from '@/components/utils/image_urls';

/*
// Generic shuffleArray fonksiyonu, her türden dizi ile çalışır.
const shuffleArray = <T,>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
};
*/

export default function HeroBanner() {
    const [displayedImage, setDisplayedImage] = useState<Movie>(movies[0]);

    useEffect(() => {
        // const shuffled = shuffleArray<Movie>(movies);
        // setDisplayedImage(shuffled[0]);
        setDisplayedImage(movies[Math.floor((Math.random()*movies.length))])
    }, []);

    return (
        <div className="relative w-full h-100 overflow-hidden">
            {/* Arka plan resmi */}
            <img
                src={displayedImage.url}  // Movie nesnesinin url özelliğini kullanıyoruz.
                alt="Hero Image"
                className="object-cover object-center w-full h-full"
                loading="lazy"  // Lazy loading, görüntülerin kullanıcı görünümüne girmesiyle yüklenmesini sağlar.
                width="100%" // Genişliği tam olarak belirliyoruz.
                height="100%" // Yüksekliği de belirliyoruz.
            />
            {/* Karartma katmanı, resmi daha “sinema” havasına büründürür */}
            <div className="absolute inset-0 bg-opacity-40" />
        </div>
    );
}
