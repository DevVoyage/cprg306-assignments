'use client';

import React, { useState } from 'react';

const NewItem = () => {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [category, setCategory] = useState('Produce');

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

  const handleSubmit = (event) => {
    event.preventDefault();
    
    const item = { name, quantity, category };
    console.log(item);
    alert(`Added Item: ${name}, quantity: ${quantity}, category: ${category}`);
    
    // Reset state variables
    setName('');
    setQuantity(1);
    setCategory('Produce');
  };

  return (
    <div className="max-w-md mx-auto p-6 border-orange-500 bg-yellow-100 rounded-lg flex items-center justify-between">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Row 1: Item Name */}
        <div>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="  Item Name"
            required
            className="mt-1 block w-full h-10 border-orange-500 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            style={{ minWidth: '350px' }}
          />
        </div>

        {/* Row 2: Quantity and Category for type of produce */}
        <div className="flex items-center space-x-12">
            {/* Quantity Display and Buttons for increasing and decreasing quantity */}
            <div className="border-orange-500 bg-white h-8 rounded-lg p-5 w-25 flex items-center space-x-2 justify-between">
                <div className="text-lg px-2 py-1 w-8 text-center">{quantity}</div>
                    <button
                    onClick={(e) => {
                        e.preventDefault();
                        decrement();
                      }}
                    disabled={quantity === 1}
                    className={`px-4 h-6 border rounded-full bg-blue-500 hover:bg-blue-600 ${
                    quantity === 1 ? 'opacity-50' : ''
                    }`}
                    >
                    -
                    </button>


                    <button
                    onClick={(e) => {
                        e.preventDefault();
                        increment();
                      }}
                    disabled={quantity === 20}
                    className={`px-4 h-6 border rounded-full bg-green-600 hover:bg-green-300 ${
                    quantity === 20 ? 'opacity-50' : ''
                    }`}
                    >
                    +
                    </button>
            </div>

            {/* Category Dropdown for type of produce */}
            <div className="flex-1">
                <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="mt-1 block w-full h-10 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                >
                <option value="Produce">Produce</option>
                <option value="Dairy">Dairy</option>
                <option value="Bakery">Bakery</option>
                <option value="Meat">Meat</option>
                <option value="Frozen Foods">Frozen Foods</option>
                <option value="Canned Goods">Canned Goods</option>
                <option value="Dry Goods">Dry Goods</option>
                <option value="Beverages">Beverages</option>
                <option value="Snacks">Snacks</option>
                <option value="Household">Household</option>
                <option value="Other">Other</option>
                </select>
            </div>
        </div>

        {/* Row 3: Submit Button */}
        <button
          type="submit"
          className="w-full h-10 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 flex items-center justify-center"
        >
          <span className="text-lg">+</span>
        </button>
      </form>
    </div>
  );
};

export default NewItem;
