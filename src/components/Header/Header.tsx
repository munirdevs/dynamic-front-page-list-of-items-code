import React, { useState } from "react";

interface HeaderProps {
  onFilterChange: (value: string) => void;
  onSortChange: (value: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onFilterChange, onSortChange }) => {
  const [filterValue, setFilterValue] = useState("");

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setFilterValue(value);
    onFilterChange(value);
  };

  const handleSortChange = (value: string) => {
    onSortChange(value);
  };

  return (
    <header>
      <nav className="navbar navbar-expand-sm bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Dynamic Front Page
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={filterValue}
              onChange={handleFilterChange}
            />
            <button
              type="button"
              className="btn btn-sm btn-outline-primary"
              onClick={() => handleSortChange("name")}>
              Sort by Name
            </button>
            <button
              type="button"
              className="btn btn-sm btn-outline-primary"
              onClick={() => handleSortChange("id")}>
              Sort by ID
            </button>
          </form>
        </div>
      </nav>
    </header>
  );
};

export default Header;
