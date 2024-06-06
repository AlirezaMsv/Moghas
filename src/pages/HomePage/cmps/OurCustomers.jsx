import React, { useState } from "react";
import CustomerCard from "./CustomerCard";
import PaginationDots from "./PaginationDots";
import { LeftCircleOutlined, RightCircleOutlined } from "@ant-design/icons";
import cl1 from '../../../assets/homepage/cl1.png'
import cl2 from '../../../assets/homepage/cl2.png'
import cl3 from '../../../assets/homepage/cl3.png'
import cl4 from '../../../assets/homepage/cl4.png'
import cl5 from '../../../assets/homepage/cl5.png'
import cl6 from '../../../assets/homepage/cl6.png'
import cl7 from '../../../assets/homepage/cl7.png'
import cl8 from '../../../assets/homepage/cl8.png'
import cl9 from '../../../assets/homepage/cl9.png'

const customers = [
  {
    image: cl1,
  },
  {
    image: cl2,
  },
  {
    image: cl3,
  },
  {
    image: cl4,
  },
  {
    image: cl5,
  },
  {
    image: cl6,
  },
  {
    image: cl7,
  },
  {
    image: cl8,
  },
  {
    image: cl9,
  },
];

const customersPerPage = 5;

const OurCustomers = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = Math.ceil(customers.length / customersPerPage);

  const handleNext = () => {
    setCurrentPage((prevPage) => (prevPage + 1) % totalPages);
  };

  const handlePrev = () => {
    setCurrentPage((prevPage) => (prevPage - 1 + totalPages) % totalPages);
  };

  const startIndex = currentPage * customersPerPage;
  const currentCustomers = customers.slice(
    startIndex,
    startIndex + customersPerPage
  );

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex flex-wrap justify-center -mx-2">
        {currentCustomers.map((customer, index) => (
          <CustomerCard key={index} {...customer} />
        ))}
      </div>
      <PaginationDots total={totalPages} current={currentPage} />
      <div className="flex justify-between mt-4">
        <LeftCircleOutlined onClick={handlePrev} className="text-4xl" />
        <RightCircleOutlined onClick={handleNext} className="text-4xl" />
      </div>
    </div>
  );
};

export default OurCustomers;
