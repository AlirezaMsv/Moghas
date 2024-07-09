// src/Footer.js
import React from "react";
import { Space } from "antd";
import {
  MailOutlined,
  InstagramOutlined,
  LinkedinOutlined,
  SendOutlined,
  WhatsAppOutlined,
} from "@ant-design/icons";

const Footer = () => {
  return (
    <div style={{backgroundColor: "#f5f8fe"}} className="p-4 text-center">
      <Space size="large">
        <a>
          <MailOutlined className="text-2xl text-gray-600 hover:text-gray-800" />
        </a>
        <a>
          <InstagramOutlined className="text-2xl text-gray-600 hover:text-gray-800" />
        </a>
        <a>
          <LinkedinOutlined className="text-2xl text-gray-600 hover:text-gray-800" />
        </a>
        <a>
          <SendOutlined className="text-2xl text-gray-600 hover:text-gray-800" />
        </a>
        <a>
          <WhatsAppOutlined className="text-2xl text-gray-600 hover:text-gray-800" />
        </a>
      </Space>
      <p style={{ direction: "rtl" }} className="text-gray-600 mt-4">
        کلیه حقوق مادی و معنوی این وب‌سایت متعلق به موقاس چت می‌باشد.
      </p>
    </div>
  );
};

export default Footer;
