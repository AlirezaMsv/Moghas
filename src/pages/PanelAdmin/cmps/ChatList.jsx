import React from "react";
import { Avatar, List } from "antd";
const ChatList = ({
  data,
  loading,
  setChatId,
  setSelectedChatUsername,
  chatId,
}) => {
  const getContent = (x) => {
    if (x?.startsWith("tour")) {
      return x.slice(4, x.indexOf("["));
    } else {
      return x;
    }
  };
  return (
    <List
      itemLayout="horizontal"
      dataSource={data}
      bordered
      className="m-2"
      loading={loading}
      renderItem={(item, index) => (
        <List.Item
          onClick={() => {
            setChatId(item.id);
            setSelectedChatUsername(item.title);
          }}
          className={chatId === item.id ? "bg-gray-100" : ""}
        >
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
            description={getContent(item.lastMessage)}
          />
        </List.Item>
      )}
    />
  );
};
export default ChatList;
