'use client';

import React, { useState } from 'react';

const NewItem = () => {
  const [quantity, setQuantity] = useState(1);

  const increment = () => {
    if (quantity < 20) {
      setQuantity(quantity + 1);
    }
  };

  const decrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="border-orange-500 bg-yellow-100 rounded-lg p-6 w-64 flex items-center justify-between">
      <div className="text-2xl font-bold">{quantity}</div>
      <div className="flex space-x-2">
        
        <button
          onClick={decrement}
          disabled={quantity === 1}
          className={`px-4 py-2 border rounded bg-blue-500 hover:bg-blue-600 ${
            quantity === 1 ? 'opacity-50' : ''
          }`}
        >
          -
        </button>


        <button
          onClick={increment}
          disabled={quantity === 20}
          className={`px-4 py-2 border rounded bg-green-600 hover:bg-green-300 ${
            quantity === 20 ? 'opacity-50' : ''
          }`}
        >
          +
        </button>
      

      </div>
    </div>
  );
};

export default NewItem;
