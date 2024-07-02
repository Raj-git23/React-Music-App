import React from 'react';
import { FiSearch } from 'react-icons/fi';

function SearchBar() {  

  return (
    <div className="relative flex">
      <div className="flex items-center bg-transparent w-[60rem] p-3 m-3 ml-8">
        <FiSearch className="text-gray-500 mr-2" />
        <input
          id="searchField"
          className="bg-transparent w-full outline-none border-b-2 p-2 border-transparent focus:border-[#a2a0a3] hover:border-[#a2a0a3]"
          type="text"
          placeholder="Search..."
        />
      </div>
      {/* <div className="absolute right-0 mt-4 mr-8  ">
          <img src="../images/avatar2.jpg" className="rounded-full h-12 w-12" />
      </div> */}
    </div>
  );
}

export default SearchBar;
