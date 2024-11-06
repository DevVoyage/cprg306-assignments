import React from 'react';

const Item = ({ name, quantity, category, onSelect }) => {
  const handleClick = () => {
    onSelect(name); // Trigger the onSelect function with the item name
  };

  return (
    <li
      className="flex flex-col p-2 border-b border-orange-500 bg-yellow-100 rounded-full shadow-sm mb-2 text-center cursor-pointer"
      onClick={handleClick}
    >
      <span className="font-bold text-yellow-950">{name}</span>
      <span className="text-yellow-950">Buy {quantity} in {category}</span>
    </li>
  );
};

export default Item;
