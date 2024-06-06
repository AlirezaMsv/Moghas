import React from "react";

const CustomerCard = ({ name, title, image, description }) => (
  <div className="bg-white m-4 rounded-2xl p-1.5">
    <img src={image} />
  </div>
);

export default CustomerCard;
