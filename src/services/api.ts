import axios from "axios";

const API_URL = "https://dynamic-front-page-list-of-items-api.onrender.com"; // Replace with your API endpoint
// const API_URL = "http://localhost:3001"; // Replace with your API endpoint

export const getItems = async () => {
  try {
    const response = await axios.get(`${API_URL}/items`);
    return response.data;
  } catch (error) {
    console.error("Error fetching items:", error);
    throw error;
  }
};

export const addItem = async (itemData: any) => {
  try {
    // Fetch the current items to determine the maximum ID
    const response = await axios.get(`${API_URL}/items`);
    const items = response.data;

    // Find the maximum ID
    const maxId = items.reduce(
      (max: number, item: { id: number }) => (item.id > max ? item.id : max),
      0
    );

    // Set the ID of the new item to one more than the maximum ID
    itemData.id = maxId + 1;

    // Send the request to create the new item
    const createResponse = await axios.post(`${API_URL}/items`, itemData);
    return createResponse.data;
  } catch (error) {
    console.error("Error adding item:", error);
    throw error;
  }
};

// Update an existing item
export const updateItem = async (itemId: number, updatedItem: any) => {
  try {
    const response = await axios.put(`${API_URL}/items/${itemId}`, updatedItem);
    return response.data; // Updated item
  } catch (error) {
    console.error("Error updating item:", error);
  }
};

// Delete an item
export const deleteItem = async (itemId: number) => {
  try {
    const response = await axios.delete(`${API_URL}/items/${itemId}`);
    return response.data; // Item deleted
  } catch (error) {
    console.error("Error deleting item:", error);
  }
};
