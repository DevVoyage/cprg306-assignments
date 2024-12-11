'use client';

import React, { useState, useEffect } from "react";
import { getItems, addItem, clearItems } from "../_services/shopping-list-service.js"; // Import service functions
import { useUserAuth } from "../_utils/auth-context"; // Assuming you have auth-context for user
import ItemList from "./item-list";
import NewItem from "./new-item";
import MealIdeas from "./meal-ideas";

const Page = () => {
  const { user } = useUserAuth(); // Get the current user
  const [items, setItems] = useState([]); // Initially empty since we're fetching items
  const [selectedItemName, setSelectedItemName] = useState(""); // State to store selected item name

  // Load shopping list items
  const loadItems = async () => {
    try {
      if (user) {
        const fetchedItems = await getItems(user.uid); // Fetch items for the current user
        setItems(fetchedItems); // Update state with fetched items
      }
    } catch (error) {
      console.error("Error loading items:", error);
    }
  };

  // Add the useEffect hook
  useEffect(() => {
    loadItems(); // Call loadItems when the component mounts
  }, [user]); // Depend on the user to reload items if the user changes

  // Handle adding a new item to the list
  const handleAddItem = async (item) => {
    try {
      if (user) {
        const newItemId = await addItem(user.uid, item); // Add item using the service
        const newItem = { ...item, id: newItemId }; // Create a new item object with the returned ID
        setItems((prevItems) => [...prevItems, newItem]); // Update state with the new item
      }
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  // Handle clearing the entire list
  const handleClearItems = async () => {
    try {
      if (user) {
        await clearItems(user.uid); // Clear items in the database
        setItems([]); // Clear the local state
        setSelectedItemName(""); // Clear selected item name (meal ideas)
      }
    } catch (error) {
      console.error("Error clearing items:", error);
    }
  };

  // Handle item selection (click)
  const handleItemSelect = (itemName) => {
    // Clean up the item name before sending to the API (removes extra stuff like emoji, quantity, etc.)
    const cleanedName = itemName.split(",")[0].trim().replace(/[^\w\s]/g, "");
    setSelectedItemName(cleanedName); // Set the selected item name
  };

  return (
    <main className="p-4 max-w-screen-lg mx-0 flex justify-between space-x-6">
      {/* Left side: Shopping list section */}
      <div className="w-2/7">
        <h1 className="text-4xl mb-4 text-yellow-950 text-center font-extrabold">Shopping List</h1>
        <div className="text-left">
          <NewItem onAddItem={handleAddItem} />
          <div className="relative">
            <ItemList items={items} onItemSelect={handleItemSelect} /> {/* Pass the handleItemSelect function */}

            {/* Clear List Button */}
            <button
              type="reset"
              onClick={handleClearItems}
              className="absolute bottom-150 right-1 w-35 h-12 bg-yellow-700 border-b font-bold border-orange-500 text-yellow-950 px-4 py-2 rounded-full hover:bg-yellow-100 transition-colors duration-200"
            >
              Clear List
            </button>
          </div>
        </div>
      </div>

      {/* Right side: Meal ideas section */}
      <div className="w-2/5">
        {/* Render MealIdeas component only if there's a selected ingredient */}
        {selectedItemName && <MealIdeas ingredient={selectedItemName} />}
      </div>
    </main>
  );
};

export default Page;
