import React, { useState } from "react";
import CustomerCard from "./CustomerCard";
import PaginationDots from "./PaginationDots";
import { LeftCircleOutlined, RightCircleOutlined } from "@ant-design/icons";

const customers = [
  {
    name: "شرکت بهار ارتباط گستر (بهارتل)",
    title: "دکتر مهدی مظلوم",
    image: "path_to_image_1",
    description: "طرح تجاری تسکولو به سازمان کمک کرده است...",
  },
  {
    name: "تجارت بین الملل دانا سپند",
    title: "سعید محبوب",
    image: "path_to_image_2",
    description: "ما در بخش بازاریابی شرکت تجاریمان از تسکولو...",
  },
  {
    name: "شرکت بهار ارتباط گستر (بهارتل)",
    title: "دکتر مهدی مظلوم",
    image: "path_to_image_1",
    description: "طرح تجاری تسکولو به سازمان کمک کرده است...",
  },
  {
    name: "تجارت بین الملل دانا سپند",
    title: "سعید محبوب",
    image: "path_to_image_2",
    description: "ما در بخش بازاریابی شرکت تجاریمان از تسکولو...",
  },
  // Add more customers as needed
];

const customersPerPage = 2;

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
      <div className="flex flex-wrap -mx-2">
        {currentCustomers.map((customer, index) => (
          <CustomerCard key={index} {...customer} />
        ))}
      </div>
      <PaginationDots total={totalPages} current={currentPage} />
      <div className="flex justify-between mt-4">
        <LeftCircleOutlined
          onClick={handlePrev}
          className="text-4xl"
        />
        <RightCircleOutlined
          onClick={handleNext}
          className="text-4xl"
        />
      </div>
    </div>
  );
};

export default OurCustomers;
