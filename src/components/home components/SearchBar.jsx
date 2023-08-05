import React, { useState } from "react";
import "./SearchBar.css";
import { Link, useNavigate } from "react-router-dom";

function SearchBar() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <div className="searchbar-wrapper">
      <div className="search-left-content">
        <h1 className="searchbar-title">
          Find A <span>Job</span> That <span>Matches</span> Your Passion
        </h1>
        <p>
          Hand-picked opportunities to work from home remotely, freelance,
          full-time, part-time, contract and internship
        </p>
        <form
          className="searchbar"
          onSubmit={(event) => {
            event.preventDefault();
            if (searchTerm.trim().length > 0) navigate(`/search/${searchTerm}`);
          }}
        >
          <input
            type="text"
            placeholder="Search by job title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
      </div>
    </div>
  );
}

export default SearchBar;
