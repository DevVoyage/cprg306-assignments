'use client';
import React, { useState } from 'react';

export default function NewItem({ onAddItem = () => {} }) {
    const [quantity, setQuantity] = useState(1);
    const [name, setName] = useState("");
    const [category, setCategory] = useState("produce");

    // Function to generate a unique ID for each item
    const generateId = () => {
        const characters = '0123456789abcdef'; // Characters to choose from
        let result = '';
        const length = 8;
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length); // Random index
            result += characters[randomIndex]; // Append random character to result
        }
        return result;
    };

     // Handle form submission
    const handleSubmission = (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        const item = {
            id: generateId(), // Generate a unique ID
            name,
            category,
            quantity
        };

        onAddItem(item); // Pass the new item to the parent component

        // Reset state variables
        setQuantity(1);
        setName("");
        setCategory("produce");
    };

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
        <div className="flex w-full justify-center items-center">
            <form className="flex justify-center items-center border-2 rounded-lg border-yellow-900 flex-col h-56 mt-7 p-5 w-96" onSubmit={handleSubmission}>
                <input
                    id="item-name"
                    name="item-name"
                    placeholder="Item Name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full rounded-lg p-3 text-black bg-yellow-100"
                />
                
                <div className="flex items-center space-x-12 mt-5">
                    {/* Quantity Display and Buttons for increasing and decreasing quantity */}
                    <div className="border-yellow-900 bg-yellow-100 h-12 rounded-lg p-3 w-25 flex items-center space-x-2 justify-between">
                        <div className="text-lg px-0 py-1 w-8 text-center">{quantity}</div>
                        <button
                            type="button"
                            onClick={(e) => {
                                e.preventDefault();
                                decrement();
                            }}
                            disabled={quantity === 1}
                            className={`px-3 h-6 border rounded-full bg-blue-500 hover:bg-blue-600 ${
                                quantity === 1 ? 'opacity-50' : ''
                            }`}
                        >
                            -
                        </button>

                        <button
                            type="button"
                            onClick={(e) => {
                                e.preventDefault();
                                increment();
                            }}
                            disabled={quantity === 20}
                            className={`px-3 h-6 border rounded-full bg-green-600 hover:bg-green-300 ${
                                quantity === 20 ? 'opacity-50' : ''
                            }`}
                        >
                            +
                        </button>
                    </div>

                    {/* Category Dropdown for type of produce */}
                    <div>
                      <select
                        title='item-category'
                        id="item-category"
                        name="item-category"
                        value={category}
                        onChange={e => setCategory(e.target.value)}
                        className="h-12 rounded-lg text-black border-yellow-900 bg-yellow-100 p-3"
                      >
                        <option value="produce">Produce</option>
                        <option value="dairy">Dairy</option>
                        <option value="bakery">Bakery</option>
                        <option value="meat">Meat</option>
                        <option value="frozen foods">Frozen Foods</option>
                        <option value="canned goods">Canned Goods</option>
                        <option value="dry goods">Dry Goods</option>
                        <option value="beverages">Beverages</option>
                        <option value="snacks">Snacks</option>
                        <option value="household">Household</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                </div>

                <button type="submit" className="bg-blue-700 w-full rounded-lg border-yellow-900 h-14 mt-5">+</button>
            </form>
        </div>
    );
}
