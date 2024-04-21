import React, { useState, useEffect } from "react";
import { getItems, deleteItem } from "../../services/api";
import AddItemForm from "./AddItemForm";

interface Item {
  id: number;
  name: string;
  description: string;
  image: string;
}

interface ItemListProps {
  filterValue: string;
  sortBy: string;
}
const pager = [
  {
    label: "5",
    value: 5,
  },
  {
    label: "10",
    value: 10,
  },
  {
    label: "20",
    value: 20,
  },
  {
    label: "50",
    value: 50,
  },
  {
    label: "100",
    value: 100,
  },
];

const ItemList: React.FC<ItemListProps> = ({ filterValue, sortBy }) => {
  const [items, setItems] = useState<Item[]>([]);
  const [selectedItem, setSelectedItem] = useState({});
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(5);
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const data = await getItems();
        setItems(data);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchItems();
  }, []);

  const handleDeleteItem = async (itemId: number) => {
    try {
      await deleteItem(itemId);
      const remainingItems = items.filter((x) => x.id != itemId);
      setItems(remainingItems);
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(filterValue.toLowerCase())
  );

  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sortBy === "id") {
      return a.id - b.id;
    } else {
      return a.name.localeCompare(b.name);
    }
    // Add more sorting options if needed
  });

  // Calculate the index of the first and last items to display on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedItems.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  return (
    <div className="mt-4">
      <AddItemForm
        setItems={setItems}
        items={items}
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
      />
      <div className="card mt-4">
        <div className="card-header bg-success text-white p-2">
          <div className="card-title"> Item List</div>
        </div>
        <div className="card-body">
          <div className="card mb-2">
            <ul className="list-group">
              {currentItems.map((item) => (
                <li className="list-group-item" key={item.id}>
                  <div className="row g-0">
                    <div className="col-md-2">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="img-fluid rounded-start"
                      />
                    </div>
                    <div className="col-md-10">
                      <div className="card-body">
                        <h5 className="card-title">{item.name}</h5>
                        <p className="card-text">{item.description}</p>
                        <div className="btn-group btn-group-sm">
                          <button
                            className="btn btn-warning"
                            onClick={() => setSelectedItem(item)}>
                            Edit
                          </button>
                          <button
                            className="btn btn-danger"
                            onClick={() => handleDeleteItem(item.id)}>
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="row">
            <div className="col-md-1">
              <select
                onChange={(e) =>
                  setItemsPerPage(parseInt(e.currentTarget.value))
                }
                defaultValue={itemsPerPage}
                className="form-select"
                aria-label="items per page">
                {pager.map((item, i) => (
                  <option key={i} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-auto">
              {Array.from(
                { length: Math.ceil(items.length / itemsPerPage) },
                (_, index) => (
                  <button
                    className={
                      "btn btn-outline-primary btn-sm " +
                      `${index + 1 == currentPage ? "active" : ""}`
                    }
                    key={index + 1}
                    onClick={() => paginate(index + 1)}>
                    {index + 1}
                  </button>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemList;
