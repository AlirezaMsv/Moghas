import React from "react";
import { Row, Col, Card, Typography } from "antd";

const { Paragraph } = Typography;

const cardData = [
  {
    category: "کسب و کار",
    title: "بهترین پادکست ایرانی با موضوع کسب‌وکار را بشناسید!",
    image: "path/to/image1.png",
    link: "خرید",
  },
  {
    category: "مدیریت تیم",
    title: "بهترین راهکار افزایش وفاداری مشتری در سازمان چیست؟",
    image: "path/to/image2.png",
    link: "خرید",
  },
  {
    category: "کسب و کار",
    title: "بررسی و مقایسه سرویس‌های ارسال ایمیل تراکنشی",
    image: "path/to/image3.png",
    link: "خرید",
  },
];

const Prices = () => (
  <div className="mx-8">
    <Row gutter={[16, 16]}>
      {cardData.map((card, index) => (
        <Col xs={24} sm={12} lg={8} key={index}>
          <Card hoverable cover={<img alt="example" src={card.image} />}>
            <div className="text-center">
              <div className="font mb-2 px-2 py-1 bg-blue-100 inline-block rounded text-blue-700">
                {card.category}
              </div>
              <h3 className="my-4 font">{card.title}</h3>
              <Paragraph className="text-blue-600 font">
                {card.link} &larr;
              </Paragraph>
            </div>
          </Card>
        </Col>
      ))}
    </Row>
  </div>
);

export default Prices;
