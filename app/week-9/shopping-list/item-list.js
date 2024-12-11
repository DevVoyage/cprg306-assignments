'use client';
import React, { useState } from "react";
import Item from "./item";

const ItemList = ({ items, onItemSelect }) => {
  // Function to group items by a specified key
  const groupBy = (items, key) =>
    items.reduce((acc, item) => {
      const category = item[key]; // Get the category of the item
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(item);
      return acc;
    }, {});

  // State to track sorting method
  const [sortBy, setSortBy] = useState("name");
  let itemList = [...items];

  // Function to capitalize the first letter of a string
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  // Sort the items based on the sortBy state
  if (sortBy === "name") {
    itemList.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortBy === "category") {
    itemList.sort((a, b) => a.category.localeCompare(b.category));
  } else {
    itemList = groupBy(itemList, "category");
  }

  return (
    <div className="mt-4">
      <div className="flex flex-row items-center mb-5">
        <span className="font-bold ml-1 text-yellow-950">Sort by:</span>
        <button
          className={`${sortBy === "name" ? "bg-yellow-100" : "bg-yellow-700"} w-24 h-12 mx-5 border-b font-bold border-orange-500 text-yellow-950 rounded-full`}
          onClick={() => setSortBy("name")}
        >
          Name
        </button>
        <button
          className={`${sortBy === "category" ? "bg-yellow-100" : "bg-yellow-700"} w-24 h-12 border-b font-bold border-orange-500 text-yellow-950 rounded-full`}
          onClick={() => setSortBy("category")}
        >
          Category
        </button>
        <button
          className={`${sortBy === "groupedCategory" ? "bg-yellow-100" : "bg-yellow-700"} w-40 h-12 ml-5 border-b font-bold border-orange-500 text-yellow-950 rounded-full`}
          onClick={() => setSortBy("groupedCategory")}
        >
          Grouped Category
        </button>
      </div>

      {sortBy === "groupedCategory" ? (
        Object.keys(itemList).sort((a, b) => a.localeCompare(b)).map((category) => (
          <div key={category}>
            <h2 className="text-2xl text-yellow-950 font-bold mt-5 pl-5 mb-2">
              {capitalizeFirstLetter(category)}
            </h2>
            <ul>
              {itemList[category].map(item => (
                <Item
                  key={item.id}
                  {...item}
                  onSelect={onItemSelect}
                />
              ))}
            </ul>
          </div>
        ))
      ) : (
        <ul>
          {itemList.map(item => (
            <Item
              key={item.id}
              {...item}
              onSelect={onItemSelect}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default ItemList;
