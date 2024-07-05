import { CarOutlined, CloseOutlined, SendOutlined } from "@ant-design/icons";
import { ProChat } from "@ant-design/pro-chat";
import { Button, Input, Space, Tooltip } from "antd";
import { useEffect, useState } from "react";
import { getApi, postApi } from "../../../hooks/api";

const Chat = ({
  chatId,
  messageApi,
  selectedChatUsername,
  setShowChat,
  setShowTourModal,
  setSeletedTour,
  selectedTour,
  tourName,
  setTourName,
}) => {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const [messageLoading, setMessageLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [lastMessageId, setLastMessageId] = useState();
  const [intervalId, setIntervalId] = useState();

  const handleSendMessage = () => {
    setMessageLoading(true);
    console.log(text);
    postApi(`api/Chat/send-customer-message?chatId=${chatId}&message=${text}`)
      .then((data) => {
        // Adding the new message to the messages array
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            role: "system", // Assuming it's the system sending the message
            content: text,
            loading: false,
            id: data,
          },
        ]);
        setText("");
        setLastMessageId(data);
        setMessageLoading(false);
      })
      .catch((err) => {
        setMessageLoading(false); // Corrected from setLoading to setMessageLoading
        console.log(err);
        messageApi.open({
          type: "error",
          content: "خطایی رخ داد!",
          style: {
            fontFamily: "VazirFD",
            direction: "rtl",
          },
        });
      });
  };

  const listenForNewMessage = () => {
    getApi(`api/Chat/get-last-message?chatId=${chatId}`)
      .then((data) => {
        if (
          data.id !== lastMessageId &&
          !loading &&
          !messageLoading &&
          data.sender === selectedChatUsername
        ) {
          setLoading(true);
          setMessages((prevMessages) => [
            ...prevMessages,
            {
              role: "user",
              content: data.text,
              loading: false,
              id: data.id,
            },
          ]);
          setLastMessageId(data.id);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    // send tour
    if (selectedTour) {
      setMessageLoading(true);
      postApi(
        `api/Chat/send-customer-message?chatId=${chatId}&message=${
          "tour" + tourName + selectedTour
        }`
      )
        .then((data) => {
          // Adding the new message to the messages array
          setMessages((prevMessages) => [
            ...prevMessages,
            {
              role: "system", // Assuming it's the system sending the message
              content: "```tour\n" + tourName + "\n```",
              loading: false,
              id: data,
            },
          ]);
          setText("");
          setLastMessageId(data);
          setMessageLoading(false);
          messageApi.open({
            type: "info",
            content: "تور ارسال شد",
            style: {
              fontFamily: "VazirFD",
              direction: "rtl",
            },
          });
          setSeletedTour(null);
        })
        .catch((err) => {
          setMessageLoading(false); // Corrected from setLoading to setMessageLoading
          console.log(err);
          messageApi.open({
            type: "error",
            content: "خطا در ارسال تور!",
            style: {
              fontFamily: "VazirFD",
              direction: "rtl",
            },
          });
          setSeletedTour(null);
        });
    }
  }, [selectedTour]);

  useEffect(() => {
    if (!loading) {
      setIntervalId(setInterval(listenForNewMessage, 1000));
      // Cleanup function to clear the interval when the component unmounts or dependencies change
      return () => clearInterval(intervalId);
    }
  }, [loading, chatId, lastMessageId]); // Add lastMessageId to the dependency array

  const getContent = (x) => {
    if (x.startsWith("tour")) {
      return "```tour\n" + x.slice(4, x.indexOf("[")) + "\n```";
    } else {
      return x;
    }
  };
  // load previous messages
  useEffect(() => {
    if (chatId) {
      setLoading(true);
      getApi(`api/Chat/get-all-messages?chatId=${chatId}`)
        .then((data) => {
          const arr = [];
          data.map((m, i) => {
            if (i === data.length - 1) {
              setLastMessageId(m.id);
            }
            arr.push({
              role: m.sender === selectedChatUsername ? "user" : "system",
              content: getContent(m.message),
              loading: false,
              id: m.id,
            });
          });
          setMessages(arr);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
          messageApi.open({
            type: "error",
            content: "خطایی رخ داد!",
            style: {
              fontFamily: "VazirFD",
              direction: "rtl",
            },
          });
        });
    }
  }, [chatId]);

  const closeChat = () => {
    clearInterval(intervalId);
    setShowChat(false);
  };

  return (
    <div>
      <ProChat
        loading={loading}
        helloMessage="بفرمایید!"
        chats={messages}
        style={{
          height: "100vh",
        }}
        inputRender={() => {
          return (
            <Input.TextArea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="پیام خود را بنویسید"
            />
          );
        }}
        sendButtonRender={() => {
          return (
            <Space size="small">
              <Tooltip title="ارسال پیام">
                <Button
                  loading={messageLoading}
                  onClick={handleSendMessage}
                  className="mx-2"
                  icon={
                    <SendOutlined
                      rotate={180}
                      className="hover:text-green-500"
                    />
                  }
                />
              </Tooltip>
              <Tooltip title="بستن چت">
                <Button
                  onClick={closeChat}
                  className="mx-2"
                  icon={<CloseOutlined className="hover:text-red-500" />}
                />
              </Tooltip>
              <Tooltip title="ارسال تور">
                <Button
                  onClick={() => setShowTourModal(true)}
                  className="mx-2"
                  icon={<CarOutlined className="hover:text-blue-500" />}
                />
              </Tooltip>
            </Space>
          );
        }}
      />
    </div>
  );
};

export default Chat;
