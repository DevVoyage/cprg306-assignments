import React from 'react';
import ItemList from './item-list';

const Page = () => {
  return (
    <main className="p-4 max-w-lg">
      <h1 className="text-4xl mb-4 text-yellow-950 text-center font-extrabold">Shopping List</h1>
      <div className="text-left">
        <ItemList />
      </div>
    </main>
  );
};

export default Page;