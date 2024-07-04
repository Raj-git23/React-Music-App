import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";

const SearchBar = () => {  
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

  navigate(`/search/${searchTerm}`);
  };
  return (
      <form
      autoComplete="off"
      className="p-2 text-white/60 focus-within:text-white-600"
      onSubmit={handleSubmit}
    >
      <label htmlFor="search-field" className="sr-only">
        Search all songs
      </label>
      <div className="flex flex-row justify-start items-center">
        <FiSearch className="w-5 h-5 ml-4" />
        <input
          name="search-field"
          autoComplete="off"
          id="search-field"
          placeholder="Search"
          type="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 bg-transparent border-none focus-within:border-b outline-none placeholder-white-500 text-base text-white p-4"
        />
      </div>
    </form>
  );
}

export default SearchBar;
