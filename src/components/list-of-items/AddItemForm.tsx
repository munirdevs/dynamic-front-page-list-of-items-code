import React, { useState, useEffect } from "react";
import { addItem, updateItem } from "../../services/api";

interface AddItemFormProps {
  setItems: (value: any) => void;
  setSelectedItem: (value: any) => void;
  items: any;
  selectedItem: any;
}
const AddItemForm: React.FC<AddItemFormProps> = ({
  setItems,
  items,
  selectedItem,
  setSelectedItem,
}) => {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    description: "",
    image: "",
  });
  useEffect(() => {
    setFormData(selectedItem);
  }, [selectedItem]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      if (formData.id) {
        const updatedItem = await updateItem(parseInt(formData.id), formData);
        const oldItems = [...items];
        const updatedItems = oldItems.map((item) =>
          item.id === formData.id ? updatedItem : item
        );
        setItems(updatedItems);
      } else {
        const newItem = await addItem(formData);

        setItems([...items, newItem]);
      }

      // Clear form fields after successful submission
      ClearFormFields();
      // Optionally, you can trigger a function to update the item list
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };
  const ClearFormFields = () =>
    setFormData({ id: "", name: "", description: "", image: "" });
  return (
    <div className="card">
      <div className="card-header bg-primary text-white p-2">
        <div className="card-title"> Add New Item Form</div>
      </div>

      <div className="card-body">
        <button className="btn btn-outline-primary" onClick={ClearFormFields}>
          New item
        </button>
        <form onSubmit={handleSubmit}>
          <div className="mb-3 row">
            <div className="col-md-6">
              <label htmlFor="name" className="col-sm-2 col-form-label">
                Item name:
              </label>
              <input
                className="form-control"
                type="text"
                id="name"
                name="name"
                placeholder="Enter item name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="description" className="col-sm-2 col-form-label">
                Description:
              </label>
              <input
                className="form-control"
                type="text"
                id="description"
                name="description"
                placeholder="Enter item description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="image" className="col-sm-2 col-form-label">
                Image URL:
              </label>
              <input
                className="form-control"
                type="text"
                id="image"
                name="image"
                placeholder="Enter image url"
                value={formData.image}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-6">
              <button type="submit" className="btn btn-primary mt-4">
                {formData.id ? "Update" : "Add"} Item
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddItemForm;
