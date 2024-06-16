import React from 'react';

function Categories() {
  return (
    <div className="py-8">
      <h2 className="text-3xl font-bold mb-4">Categories</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gray-200 p-4 rounded-lg">Category 1</div>
        <div className="bg-gray-200 p-4 rounded-lg">Category 2</div>
        <div className="bg-gray-200 p-4 rounded-lg">Category 3</div>
        <div className="bg-gray-200 p-4 rounded-lg">Category 4</div>
      </div>
    </div>
  );
}

export default Categories;
