"use client";

import React, { useState } from "react";
import ItemList from "./item-list";
import NewItem from "./new-item";
import itemsList from "./items.json";

const Page = () => {
  const [items, setItems] = useState(itemsList);

  const handleAddItem = (item) => {
    setItems((prevItems) => [...prevItems, item]);
  };

  const handleClearItems = () => {
    setItems([]); // Clear the item list
  };

  return (
    <main className="p-4 max-w-lg">
      <h1 className="text-4xl mb-4 text-yellow-950 text-center font-extrabold">Shopping List</h1>
      <div className="text-left">
        <NewItem onAddItem={handleAddItem} />
        <div className="relative">
          <ItemList items={items} />
          {/* Clear List Button at the bottom right of the ItemList */}
          <button
            type ="reset"
            onClick={handleClearItems} 
            className="absolute bottom-150 right-1 w-35 h-12 bg-yellow-700 border-b font-bold border-orange-500 text-yellow-950 px-4 py-2 rounded-full hover:bg-yellow-100 transition-colors duration-200"
          >
            Clear List
          </button>
        </div>
      </div>
    </main>
  );
};

export default Page;
