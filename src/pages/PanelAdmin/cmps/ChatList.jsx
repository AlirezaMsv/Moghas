import React from "react";
import { Avatar, Badge, List } from "antd";
const data = [
  {
    title: "احمد محسن",
  },
  {
    title: "محمد",
  },
  {
    title: "علی",
  },
  {
    title: "نیوشا",
  },
];
const ChatList = () => (
  <List
    itemLayout="horizontal"
    dataSource={data}
    bordered
    className="m-2"
    renderItem={(item, index) => (
      <List.Item>
        <List.Item.Meta
          className="font hover:bg-gray-100 rounded-xl cursor-pointer"
          avatar={
            <Badge count={index} offset={[-50, 6]}>
              <Avatar
                src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`}
                className="w-14 h-full"
              />
            </Badge>
          }
          title={
            <a className="font" href="#">
              {item.title}
            </a>
          }
          description="آخرین پیام"
        />
      </List.Item>
    )}
  />
);
export default ChatList;
