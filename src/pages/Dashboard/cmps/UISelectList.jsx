import React from "react";
import { Select } from "antd";

const UISelectList = ({ options, record, h, get, set }) => {

  const handleChange = (value) => {
    record.newValue = value
    set(value)
  };

  return <Select className={"w-1/2 text-center" + (h ? ` h-${h}` : "")} value={get} onChange={handleChange} options={options} />;
};
export default UISelectList;
