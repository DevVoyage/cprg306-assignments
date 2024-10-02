import React from 'react';
import ItemList from './item-list';

const Page = () => {
  return (
    <main className="p-4 max-w-lg">
      <h1 className="text-2xl font-bold mb-4 text-yellow-950 text-left">Shopping List</h1>
      <div className="text-left">
        <ItemList />
      </div>
    </main>
  );
};

export default Page;
