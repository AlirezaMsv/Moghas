import React from 'react';

const PaginationDots = ({ total, current }) => (
  <div className="flex justify-center space-x-2 mt-4">
    {Array.from({ length: total }, (_, index) => (
      <span
        key={index}
        className={`w-2 h-2 rounded-full ${current === index ? 'bg-gray-700' : 'bg-gray-300'}`}
      />
    ))}
  </div>
);

export default PaginationDots;
