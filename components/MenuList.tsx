// MenuList.tsx

import React from "react";

export const MenuList: React.FC = () => (
  <div className="flex flex-col space-y-2 bg-gray-900 p-4 rounded-lg shadow-lg">
    <div className="flex items-center px-3 py-2 text-gray-300 hover:bg-gray-800 rounded transition cursor-pointer">
      <i className="bi bi-search text-lg mr-2"></i>
      <span>Search</span>
    </div>
    <div className="flex items-center px-3 py-2 text-gray-300 hover:bg-gray-800 rounded transition cursor-pointer">
      <i className="bi bi-house-door text-lg mr-2"></i>
      <span>Home</span>
    </div>
    <div className="flex items-center px-3 py-2 text-white bg-gray-800 rounded font-semibold shadow-md">
      <i className="bi bi-graph-up-arrow text-lg mr-2"></i>
      <span>New Popular</span>
    </div>
    <div className="flex items-center px-3 py-2 text-gray-300 hover:bg-gray-800 rounded transition cursor-pointer">
      <i className="bi bi-tv text-lg mr-2"></i>
      <span>TV Shows</span>
    </div>
    <div className="flex items-center px-3 py-2 text-gray-300 hover:bg-gray-800 rounded transition cursor-pointer">
      <i className="bi bi-film text-lg mr-2"></i>
      <span>Movies</span>
    </div>
    <div className="flex items-center px-3 py-2 text-gray-300 hover:bg-gray-800 rounded transition cursor-pointer">
      <i className="bi bi-plus-lg text-lg mr-2"></i>
      <span>My List</span>
    </div>
  </div>
);

export default MenuList;
