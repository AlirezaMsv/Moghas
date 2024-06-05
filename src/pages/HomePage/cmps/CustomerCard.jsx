import React from 'react';
import { Card, Avatar } from 'antd';

const { Meta } = Card;

const CustomerCard = ({ name, title, image, description }) => (
  <Card className="w-full my-4">
    <Meta
      avatar={<Avatar src={image} />}
      title={name}
      description={(
        <>
          <div>{title}</div>
          <div>{description}</div>
        </>
      )}
    />
  </Card>
);

export default CustomerCard;
