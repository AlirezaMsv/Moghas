import React from "react";
import { Row, Col, Card } from "antd";
import {
  SyncOutlined,
  AppstoreAddOutlined,
  TeamOutlined,
  ShareAltOutlined,
} from "@ant-design/icons";

const cardData = [
  {
    icon: <SyncOutlined style={{ fontSize: "24px", color: "#1890ff" }} />,
    title: "تسکولو را با سایر ابزارها یکپارچه‌سازی کنید",
    description:
      "با وصل کردن تسکولو به سایر ابزارهای مورد استفاده، به همه اطلاعات خود در یک میزکار دسترسی داشته باشید.",
  },
  {
    icon: (
      <AppstoreAddOutlined style={{ fontSize: "24px", color: "#1890ff" }} />
    ),
    title: "دیدی همه جانبه به پروژه‌ها داشته باشید",
    description:
      "دید همه‌جانبه به مدیریت کارها و کنترل پروژه داشته باشید. با تعریف اهداف کوتاه یا بلند مدت، دسته‌بندی کارها و تعیین سررسید، بازدهی را افزایش دهید.",
  },
  {
    icon: <TeamOutlined style={{ fontSize: "24px", color: "#1890ff" }} />,
    title: "همکاری تیمی آنلاین را به معنای واقعی تجربه کنید",
    description:
      "به صورت هماهنگ فعالیت کنید و گفتگوی درون تیمی داشته باشید. گفتگوهای تیمی را ضبط کرده و ارتباط موثر با افراد تیم خود داشته باشید.",
  },
  {
    icon: <ShareAltOutlined style={{ fontSize: "24px", color: "#1890ff" }} />,
    title: "با هر تیمی در هر صنعتی کار کنید",
    description:
      "فرقی نمی‌کند از تسکولو برای مدیریت کارهای شخصی یا شرکتی با صداها کارمند استفاده کنید. بستر مناسب برای تمامی آن‌ها فراهم است.",
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
              <h3 className="my-4 font">{card.title}</h3>
              <p className="font">{card.description}</p>
            </div>
          </Card>
        </Col>
      ))}
    </Row>
  </div>
);

export default CardSection;
