import React from "react";
import { Avatar, List } from "antd";
const ChatList = ({ data, loading }) => (
  <List
    itemLayout="horizontal"
    dataSource={data}
    bordered
    className="m-2"
    loading={loading}
    renderItem={(item, index) => (
      <List.Item>
        <List.Item.Meta
          className="font hover:bg-gray-100 rounded-xl cursor-pointer"
          avatar={
            // <Badge count={index} offset={[-50, 6]}>
              <Avatar
                src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`}
                className="w-14 h-full"
              />
            // </Badge>
          }
          title={<a>{item.title}</a>}
          description={item.lastMessage}
        />
      </List.Item>
    )}
  />
);
export default ChatList;
