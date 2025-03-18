"use client"

import { Button } from "@/components/ui/button"
import { AnimatePresence, motion } from "framer-motion"
import { useRouter } from "next/navigation"  // Next.js yönlendirme hook'u
import ImageAnimation from "./ImageAnimation"
import Image from 'next/image';

function FloatingPaths({ position }: { position: number }) {
  const paths = Array.from({ length: 36 }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
      380 - i * 5 * position
    } -${89 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
      152 - i * 5 * position
    } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
      684 - i * 5 * position
    } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
    color: `rgba(15,23,42,${0.1 + i * 0.03})`,
    width: 0.5 + i * 0.03,
  }))

  return (
    <div className="absolute inset-0 pointer-events-none">
      <svg
        className="w-full h-full text-white dark:text-slate-950"
        viewBox="0 0 669 316"
        fill="none"
      >
        <title>Listopia</title>
        {paths.map((path) => (
          <motion.path
            key={path.id}
            d={path.d}
            stroke="currentColor"
            strokeWidth={path.width}
            strokeOpacity={0.1 + path.id * 0.03}
            initial={{ pathLength: 0.3, opacity: 0.6 }}
            animate={{
              pathLength: 1,
              opacity: [0.3, 0.6, 0.3],
              pathOffset: [0, 1, 0],
            }}
            transition={{
              duration: 20 + Math.random() * 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        ))}
      </svg>
    </div>
  )
}

export default function GetStartedPage({
  title = "Listopia",
  logo = <Image src="/listopia.svg" alt="Logo" width={150} height={50} className="mx-auto w-auto h-auto" />,
  description = "Track films you've watched. Save those you want to watch. Share with your friends what's good.",
}: {
  title?: string
  description?: string
  logo?: React.ReactNode
}) {
  const router = useRouter() // useRouter hook'unu kullanıyoruz
  const words = title.split(" ")

  // Yönlendirmek istediğiniz URL'i belirleyin
  const handleClick = () => {
    router.push("/home")  // Örneğin: "/dashboard" ya da başka bir route
  }
  return (
    <AnimatePresence mode="wait" >
<motion.div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-gray-900 dark:bg-white"
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.5 }}
    >

      <div className="fixed inset-0 blur-sm opacity-50">
        <ImageAnimation/>
        <ImageAnimation/>

      </div>
      <div>
      <FloatingPaths position={0.5} />
      <FloatingPaths position={-1} />
      </div>
      <div className="relative z-10 container mx-auto px-4 md:px-6 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="max-w-4xl mx-auto"
        >
          {/* Logo */}
          <motion.span
            className="mb-4"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, type: "spring", stiffness: 150, damping: 25 }}
          >
            {logo}
          </motion.span>

          <motion.h1
            whileHover={{ filter: "drop-shadow(0 0 1px rgba(255, 255, 255, 0.8))" }}
            transition={{ duration: 0.3 }}
            className="logo-font cursor-pointer text-5xl sm:text-7xl md:text-8xl font-bold mb-8 tracking-tighter"
          >
            {words.map((word, wordIndex) => (
              <span key={wordIndex} className="inline-block">
                {word.split("").map((letter, letterIndex) => (
                  <motion.span
                    key={`${wordIndex}-${letterIndex}`}
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      delay: wordIndex * 0.1 + letterIndex * 0.03,
                      type: "spring",
                      stiffness: 150,
                      damping: 25,
                    }}
                    className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-white to-white/80 dark:from-neutral-900 dark:to-neutral-700/80"
                  >
                    {letter}
                  </motion.span>
                ))}
              </span>
            ))}
          </motion.h1>

          {/* Description */}
          <p className="logo-font mb-8 text-lg text-white dark:text-black ">
            {description}
          </p>

          {/* Button */}
          <div
            className="inline-block group relative bg-gradient-to-b from-black/10 to-white/60 dark:from-white/20 dark:to-black/10 p-px rounded-2xl backdrop-blur-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <Button
              variant="ghost"
              onClick={handleClick}  // Butona tıklanınca yönlendirme işlemi gerçekleşecek
              className="rounded-[1.15rem] px-8 py-6 text-lg font-semibold backdrop-blur-md bg-white/95 hover:bg-white/100 dark:bg-black/95 dark:hover:bg-black/100 text-black dark:text-white transition-all duration-300 group-hover:-translate-y-0.5 border border-black/10 dark:border-white/10 hover:shadow-md dark:hover:shadow-neutral-800/50"
            >
              <span className="native-font opacity-90 group-hover:opacity-80 transition-opacity">
                Get Started
              </span>
              <span
                className="ml-3 opacity-70 group-hover:opacity-100 group-hover:translate-x-1.5 transition-all duration-300"
              >
                →
              </span>
            </Button>
          </div>
        </motion.div>
      </div>
    </motion.div>
    </AnimatePresence>

  )
}
