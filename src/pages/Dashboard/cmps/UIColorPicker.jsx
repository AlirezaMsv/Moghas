import React from "react";
import { ColorPicker as AntColorPicker, Space } from "antd";
const UIColorPicker = ({ record, get, set }) => {
  return (
    <Space direction="vertical">
      <AntColorPicker
        style={{ fontFamily: "monospace" }}
        value={get}
        onChange={(_, h) => {
          record.newValue = h
          set(h)
        }}
        showText
      />
    </Space>
  );
};
export default UIColorPicker;
