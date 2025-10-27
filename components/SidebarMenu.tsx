import React from "react";
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

type SidebarMenuProps = {
  focused: boolean;
};

export const SidebarMenu: React.FC<SidebarMenuProps> = ({ focused }) => {
  const menuItems = [
    { label: "Search", icon: <MagnifyingGlassIcon className="w-6 h-6 mr-4" /> },
    { label: "Home", icon: <HomeIcon className="w-6 h-6 mr-4" /> },
    { label: "New & Popular", icon: <FireIcon className="w-6 h-6 mr-4" />, active: true },
    { label: "TV Shows", icon: <TvIcon className="w-6 h-6 mr-4" /> },
    { label: "Movies", icon: <FilmIcon className="w-6 h-6 mr-4" /> },
    { label: "My List", icon: <PlusIcon className="w-6 h-6 mr-4" /> }
  ];

  return (
    <div
      className="w-72 min-h-screen p-4 flex flex-col fixed left-0 top-0 h-full transition-all duration-500 z-30"
      style={
        focused
          ? { background: "linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 15%, rgba(0,212,255,0) 100%)" }
          : { background: "#18181b" }
      }
    >
      {/* Profile Section */}
      <div
        className={`mb-8 transition-all duration-300 ${
          focused ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-6"
        }`}
        style={{ transitionDelay: focused ? "0.05s" : "0s" }}
      >
        <div className="flex items-center mb-4">
          <img
            src="https://occ-0-2705-2706.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABfjwXqIYd3kCEU6KWsiHSHvkft8VhZg0yyD50a_pHXku4dz9VgxWwfA2ontwogStpj1NE9NJMt7sCpSKFEY2zmgqqQfcw1FMWwB9.png?r=229"
            alt="User Profile"
            className="w-12 h-12 rounded-full mr-3"
          />
          <div>
            <span className="text-white font-bold">Rachid</span>
            <div className="text-sm text-gray-400 cursor-pointer hover:underline">
              Switch Profiles
            </div>
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
      <nav className="flex-1">
        <div className="flex flex-col space-y-2">
          {menuItems.map((item, idx) => (
            <SidebarItem
              key={item.label}
              icon={item.icon}
              label={item.label}
              active={item.active}
              focused={focused}
              delay={0.05 * (idx + 2)}
            />
          ))}
        </div>
      </nav>
      {/* Settings Section */}
      <div
        className={`mt-8 transition-all duration-300 ${
          focused ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-6"
        }`}
        style={{ transitionDelay: focused ? '0.45s' : '0s' }}
      >
        <ul className="space-y-2">
          <li>
            <a
              href="#"
              className="flex items-center px-3 py-2 text-gray-300 hover:bg-gray-800 rounded transition-all duration-300 cursor-pointer"
            >
              <Cog6ToothIcon className="w-6 h-6 mr-4" />
              <span>Settings</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center px-3 py-2 text-gray-300 hover:bg-gray-800 rounded transition-all duration-300 cursor-pointer"
            >
              <ArrowRightOnRectangleIcon className="w-6 h-6 mr-4" />
              <span>Exit Netflix</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

type SidebarItemProps = {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  focused?: boolean;
  delay?: number;
};

const SidebarItem: React.FC<SidebarItemProps> = ({
  icon,
  label,
  active,
  focused,
  delay
}) => (
  <div
    className={`flex items-center px-3 py-2 rounded transition-all duration-300 font-semibold
      ${active ? "text-white bg-gray-800 shadow-md" : "text-gray-300 hover:bg-gray-800"}
      ${focused ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-6"}
    `}
    style={{
      transitionDelay: focused ? `${delay}s` : "0s"
    }}
  >
    {icon}
    <span>{label}</span>
  </div>
);

export default SidebarMenu;
