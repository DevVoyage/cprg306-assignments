'use client';

import React, { useState } from "react";
import ItemList from "./item-list";
import NewItem from "./new-item";
import MealIdeas from "./meal-ideas"; // Import the MealIdeas component
import itemsList from "./items.json";

const Page = () => {
  const [items, setItems] = useState(itemsList);
  const [selectedItemName, setSelectedItemName] = useState(""); // State to store selected item name

  // Handle adding a new item to the list
  const handleAddItem = (item) => {
    setItems((prevItems) => [...prevItems, item]);
  };

  // Handle clearing the entire list
  const handleClearItems = () => {
    setItems([]); // Clear the item list
    setSelectedItemName(''); // Clear selected item name (meal ideas)
  };

  // Handle item selection (click)
  const handleItemSelect = (itemName) => {
    // Clean up the item name before sending to the API (removes extra stuff like emoji, quantity, etc.)
    const cleanedName = itemName.split(',')[0].trim().replace(/[^\w\s]/g, ''); 
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
            <ItemList items={items} onItemSelect={handleItemSelect}/> {/* Pass the handleItemSelect function */}
            
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
