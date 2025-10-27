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

export const SidebarMenu: React.FC = () => (
  <div className="w-72 bg-gray-900 min-h-screen p-4 flex flex-col top-0 left-0 fixed">
    {/* Profile Section */}
    <div className="mb-8">
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
    <nav className="flex-1">
      <div className="flex flex-col space-y-2">
        <SidebarItem icon={<MagnifyingGlassIcon className="w-6 h-6 mr-4" />} label="Search" />
        <SidebarItem icon={<HomeIcon className="w-6 h-6 mr-4" />} label="Home" />
        <SidebarItem icon={<FireIcon className="w-6 h-6 mr-4" />} label="New & Popular" active />
        <SidebarItem icon={<TvIcon className="w-6 h-6 mr-4" />} label="TV Shows" />
        <SidebarItem icon={<FilmIcon className="w-6 h-6 mr-4" />} label="Movies" />
        <SidebarItem icon={<PlusIcon className="w-6 h-6 mr-4" />} label="My List" />
      </div>
    </nav>

    {/* Settings Section */}
    <div className="mt-8">
      <ul className="space-y-2">
        <li>
          <a href="#" className="flex items-center px-3 py-2 text-gray-300 hover:bg-gray-800 rounded transition cursor-pointer">
            <Cog6ToothIcon className="w-6 h-6 mr-4" />
            <span>Settings</span>
          </a>
        </li>
        <li>
          <a href="#" className="flex items-center px-3 py-2 text-gray-300 hover:bg-gray-800 rounded transition cursor-pointer">
            <ArrowRightOnRectangleIcon className="w-6 h-6 mr-4" />
            <span>Exit Netflix</span>
          </a>
        </li>
      </ul>
    </div>
  </div>
);

type SidebarItemProps = {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
};

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label, active }) => (
  <div
    className={`flex items-center px-3 py-2 rounded transition cursor-pointer ${
      active
        ? "text-white bg-gray-800 font-semibold shadow-md"
        : "text-gray-300 hover:bg-gray-800"
    }`}
  >
    {icon}
    <span>{label}</span>
  </div>
);

export default SidebarMenu;
