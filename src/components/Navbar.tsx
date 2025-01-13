import React from "react";
import "./Navbar.css";

interface NavbarProps {
  searchQuery: string;
  selectedCategory: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCategoryChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Navbar: React.FC<NavbarProps> = ({
  searchQuery,
  selectedCategory,
  onSearchChange,
  onCategoryChange,
  
}) => {
  return (
    <header className="navbar">
      <div className="navbar-content">
        <h1 className="navbar-title">News-Aggregator</h1>
        <div className="navbar-filters">
          <input
            type="text"
            className="search-input"
            placeholder="Search news by title or author..."
            value={searchQuery}
            onChange={onSearchChange}

          />
          <select
            className="category-select"
            value={selectedCategory}
            onChange={onCategoryChange}
          >
            <option value="all">All</option>
            <option value="business">Business</option>
            <option value="technology">Technology</option>
            <option value="sports">Sports</option>
          </select>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
