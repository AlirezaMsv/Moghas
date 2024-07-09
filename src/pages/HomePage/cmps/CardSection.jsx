import React from "react";
import { Row, Col, Card } from "antd";
import {
  TeamOutlined,
  CustomerServiceOutlined,
  BuildOutlined,
  NodeIndexOutlined,
} from "@ant-design/icons";

const cardData = [
  {
    icon: (
      <CustomerServiceOutlined style={{ fontSize: "36px", color: "#e74c3c" }} />
    ),
    title: "گفتگوی آنلاین",
    description:
      "یک ارتباط ایمن و ساده را با کاربران سایت خود ایجاد کنید و از پشتیبانی خدمات و محصولاتتان در محیط جذاب سامانه گفتینو لذت ببرید!",
  },
  {
    icon: <TeamOutlined style={{ fontSize: "36px", color: "#8e44ad" }} />,
    title: "جذب مشتریان",
    description:
      "هر بازدیدکننده سایت یک فرصت برای تبدیل شدن به مشتری است. اکثر بازدید کنندگان بدون اینکه با خدمات یا محصولات شما آشنایی داشته باشند وب سایت را ترک می کنند، با آنها گفتگو و به مشتری وفادار تبدیلشان کنید.",
  },
  {
    icon: <NodeIndexOutlined style={{ fontSize: "36px", color: "#16a085" }} />,
    title: "سامانه هدفمند",
    description:
      "با ارسال پیام‌های خودکار هدفمند به مشتریان و کاربران خود ، سر صحبت را در زمان و مکان مناسب با آنها باز کنید.",
  },
  {
    icon: <BuildOutlined style={{ fontSize: "36px", color: "#1890ff" }} />,
    title: "تنظیمات اختصاصی",
    description:
      "به راحتی می توانید طبق سلیقه و نیازتان ، ابزارک گفتگو در سایت خود را شامل رنگ بندی ، آیکون ، نوشته ها و ... شخصی سازی کنید.",
  },
];

const CardSection = () => (
  <div className="mx-8">
    <Row gutter={[16, 16]}>
      {cardData.map((card, index) => (
        <Col xs={24} sm={12} lg={6} key={index}>
          <Card hoverable className="h-60">
            <div className="text-center">
              {card.icon}
              <h3 className="my-4 font font-bold text-lg">{card.title}</h3>
              <p className="font text-gray-400">{card.description}</p>
            </div>
          </Card>
        </Col>
      ))}
    </Row>
  </div>
);

export default CardSection;
