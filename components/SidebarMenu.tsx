import React, { useState, useRef, useEffect } from "react";
import {
  MagnifyingGlassIcon,
  HomeIcon,
  FireIcon,
  TvIcon,
  FilmIcon,
  PlusIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon
} from "@heroicons/react/24/outline";

export const AppSidebarMenu: React.FC = () => {
  const [focused, setFocused] = useState(false);
  const [activeIdx, setActiveIdx] = useState<number | null>(null); // which menu/settings item is active
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setFocused(false);
        setActiveIdx(null);
      }
    };
    if (focused) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [focused]);

  return (
    <SidebarMenu
      focused={focused}
      setFocused={setFocused}
      activeIdx={activeIdx}
      setActiveIdx={setActiveIdx}
      sidebarRef={sidebarRef}
    />
  );
};

type SidebarMenuProps = {
  focused: boolean;
  setFocused: (f: boolean) => void;
  activeIdx: number | null;
  setActiveIdx: (idx: number | null) => void;
  sidebarRef: React.RefObject<HTMLDivElement>;
};

const menuItems = [
  { label: "Search", icon: <MagnifyingGlassIcon className="w-6 h-6" /> },
  { label: "Home", icon: <HomeIcon className="w-6 h-6" /> },
  { label: "New & Popular", icon: <FireIcon className="w-6 h-6" /> },
  { label: "TV Shows", icon: <TvIcon className="w-6 h-6" /> },
  { label: "Movies", icon: <FilmIcon className="w-6 h-6" /> },
  { label: "My List", icon: <PlusIcon className="w-6 h-6" /> }
];

const settingsItems = [
  { label: "Settings", icon: <Cog6ToothIcon className="w-6 h-6" /> },
  { label: "Exit Netflix", icon: <ArrowRightOnRectangleIcon className="w-6 h-6" /> }
];

export const SidebarMenu: React.FC<SidebarMenuProps> = ({
  focused,
  setFocused,
  activeIdx,
  setActiveIdx,
  sidebarRef
}) => (
  <div
    ref={sidebarRef}
    className={`w-full min-h-screen p-4 flex flex-col fixed top-0 left-0 justify-between z-50 transition-all duration-700
      ${focused ? "w-full bg-[linear-gradient(90deg,_#000_0%,_#000_15%,_rgba(0,212,255,0)_100%)]" : "w-20 bg-transparent"}
    `}
  >
    {/* Profile Section */}
    <div
      className={`transition-all duration-500 ${
        focused ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
      }`}
      style={{ transitionDelay: focused ? "0.1s" : "0s" }}
    >
      <div className="flex items-center mb-4">
        <img
          src="https://occ-0-2705-2706.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABfjwXqIYd3kCEU6KWsiHSHvkft8VhZg0yyD50a_pHXku4dz9VgxWwfA2ontwogStpj1NE9NJMt7sCpSKFEY2zmgqqQfcw1FMWwB9.png?r=229"
          alt="User Profile"
          className="w-12 h-12 rounded-full mr-3"
        />
        <div>
          <span className="text-white font-bold">Rachid</span>
          <div className="text-sm text-gray-400 cursor-pointer hover:underline">Switch Profiles</div>
        </div>
      </div>
      <div className="flex items-center">
        <img
          src="https://occ-0-2705-2706.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABVTEUhowgYLWmAWhLf3T4LpDKKxcZ_2RQ8LxQX6O8P2cMTPrWRA55i83sngeLg0ltKmAE6fdZRj0sbs-jFmfjImayS4MPAiPkQ0f2Kwnll4ypLf4GeeBnVP1ojjVFFgmz0IKEQ9327tKXYT7BMk.png?r=9df"
          alt="Kids Profile"
          className="w-12 h-12 rounded-full mr-3"
        />
        <span className="text-white font-bold">Nizar</span>
      </div>
    </div>

    {/* Menu List */}
    <nav className="flex mt-6">
      <div className="flex flex-col space-y-2">
        {menuItems.map((item, idx) => (
          <SidebarItem
            key={item.label}
            icon={item.icon}
            label={item.label}
            active={activeIdx === idx}
            focused={focused}
            delay={0.15 + 0.05 * idx}
            onIconClick={() => {
              setFocused(!focused);
              setActiveIdx(idx);
            }}
          />
        ))}
      </div>
    </nav>

    {/* Settings Section */}
    <div
      className={`mt-8 transition-all duration-500 ${
        focused ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
      }`}
      style={{ transitionDelay: focused ? "0.7s" : "0s" }}
    >
      <ul className="space-y-2">
        {settingsItems.map((item, idx) => (
          <SidebarItem
            key={item.label}
            icon={item.icon}
            label={item.label}
            active={activeIdx === menuItems.length + idx}
            focused={focused}
            delay={0.75 + 0.05 * idx}
            isLink
            onIconClick={() => {
              setFocused(!focused);
              setActiveIdx(menuItems.length + idx);
            }}
          />
        ))}
      </ul>
    </div>
  </div>
);

type SidebarItemProps = {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  focused?: boolean;
  delay?: number;
  isLink?: boolean;
  onIconClick?: () => void;
};

const SidebarItem: React.FC<SidebarItemProps> = ({
  icon,
  label,
  active,
  focused,
  delay,
  isLink,
  onIconClick
}) => {
  const baseClasses =
    "flex items-center px-3 py-2 rounded transition-all duration-500 font-semibold";
  // Use full active styles again
  const stateClasses = active
    ? "text-white"
    : "text-gray-300";
    const cursorClass = "cursor-pointer";
  return isLink ? (
    <li className={`${baseClasses} ${stateClasses} ${cursorClass}`}>
      <span className="mr-2" onClick={onIconClick}>{icon}</span>
      <span
        className="transition-all duration-500 ml-2"
        style={{
          opacity: focused ? 1 : 0,
          transform: focused ? "translateX(0)" : "translateX(-2.5rem)",
          transitionDelay: focused ? `${delay ?? 0}s` : "0s",
          display: "inline-block",
        }}
      >
        {label}
      </span>
    </li>
  ) : (
    <div className={`${baseClasses} ${stateClasses} ${cursorClass}`} onClick={onIconClick}>
      <span
        className={`mr-2 ${
          active ? "border-b-[0.3rem] border-b-[#c00] border-solid" : ""
        }`}
        
      >
        {icon}
      </span>
      <span
        className="transition-all duration-500"
        style={{
          opacity: focused ? 1 : 0,
          transform: focused ? "translateX(0)" : "translateX(-2.5rem)",
          transitionDelay: focused ? `${delay ?? 0}s` : "0s",
          display: "inline-block",
        }}
      >
        {label}
      </span>
    </div>
  );
};

export default AppSidebarMenu;
