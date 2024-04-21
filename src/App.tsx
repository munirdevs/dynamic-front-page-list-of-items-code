import React, { useState } from "react";
// import ItemList from './components/ItemList';
import Header from "./components/Header/Header";
import ItemList from "./components/list-of-items/ItemList";

const App: React.FC = () => {
  const [filterValue, setFilterValue] = useState("");
  const [sortBy, setSortBy] = useState("");

  const handleFilterChange = (value: string) => {
    setFilterValue(value);
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
  };

  return (
    <div className="container">
      <Header
        onFilterChange={handleFilterChange}
        onSortChange={handleSortChange}
      />
      <ItemList filterValue={filterValue} sortBy={sortBy} />
    </div>
  );
};

export default App;
