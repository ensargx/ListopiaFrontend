import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

interface TabPosition {
  left: number;
  width: number;
  opacity: number;
}

export default function SlideTabs(): React.ReactElement {
  const router = useRouter();

  // Aktif sekmenin index'ini takip ediyoruz.
  const [activeTab, setActiveTab] = useState<number>(0);
  // Tıklanan sekmenin konum bilgisini saklıyoruz.
  const [activePosition, setActivePosition] = useState<TabPosition>({
    left: 0,
    width: 0,
    opacity: 1,
  });
  // Anlık konumu (hover sırasında güncellenebilir) activePosition'a göre başlatıyoruz.
  const [position, setPosition] = useState<TabPosition>(activePosition);

  const handleClick1 = () => {
    router.push("/home/new-releases");
  };
  const handleClick2 = () => {
    router.push("/home/genre");
  };
  const handleClick3 = () => {
    router.push("/home/movie");
  };

  return (
    <ul
      // Fare sekmelerin dışına çıktığında aktif sekmenin konumunu geri yüklüyoruz.
      onMouseLeave={() => {
        setPosition(activePosition);
      }}
      className="relative mx-auto flex flex-nowrap w-fit rounded-full border-2 border-gray-900 bg-gray-900 p-1 space-x-2"
    >
      <Tab
        index={0}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        setPosition={setPosition}
        setActivePosition={setActivePosition}
        onClick={handleClick1}
      >
        New Releases
      </Tab>
      <Tab
        index={1}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        setPosition={setPosition}
        setActivePosition={setActivePosition}
        onClick={handleClick2}
      >
        Genre
      </Tab>
      <Tab
        index={2}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        setPosition={setPosition}
        setActivePosition={setActivePosition}
        onClick={handleClick3}
      >
        Movie
      </Tab>

      <Cursor position={position} />
    </ul>
  );
}

interface TabProps {
  index: number;
  children: React.ReactNode;
  activeTab: number;
  setActiveTab: React.Dispatch<React.SetStateAction<number>>;
  setPosition: React.Dispatch<React.SetStateAction<TabPosition>>;
  setActivePosition: React.Dispatch<React.SetStateAction<TabPosition>>;
  onClick?: () => void;
}

function Tab({
  index,
  children,
  setActiveTab,
  setPosition,
  setActivePosition,
  onClick,
}: TabProps): React.ReactElement {
  const ref = useRef<HTMLLIElement>(null);

  const handleMouseEnter = () => {
    if (!ref.current) return;
    const { width } = ref.current.getBoundingClientRect();
    setPosition({
      left: ref.current.offsetLeft,
      width,
      opacity: 1,
    });
  };

  const handleClick = () => {
    setActiveTab(index);
    if (!ref.current) return;
    const { width } = ref.current.getBoundingClientRect();
    const newPos = {
      left: ref.current.offsetLeft,
      width,
      opacity: 1,
    };
    setPosition(newPos);
    setActivePosition(newPos); // Tıklanan sekmenin konumunu kaydediyoruz
    if (onClick) onClick();
  };

  return (
    <li
      ref={ref}
      onMouseEnter={handleMouseEnter}
      onClick={handleClick}
      className="relative z-10 block cursor-pointer px-3 py-1.5 text-xs uppercase text-white mix-blend-difference md:px-5 md:py-2 md:text-base"
    >
      {children}
    </li>
  );
}

interface CursorProps {
  position: TabPosition;
}

function Cursor({ position }: CursorProps): React.ReactElement {
  return (
    <motion.li
      animate={{
        ...position,
      }}
      className="absolute z-0 h-1 bottom-0 rounded-full bg-white "
    />
  );
}
