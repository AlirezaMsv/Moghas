import { LogoutOutlined } from "@ant-design/icons";
import { Badge, Button, ConfigProvider, Layout, Tabs, message } from "antd";
import { useEffect, useState } from "react";
import ChatList from "./cmps/ChatList";
import { getApi } from "../../hooks/api";
import { useCookies } from "react-cookie";
import Chat from "./cmps/Chat";
import TourModal from "./cmps/ToursModal";

const { Content, Sider } = Layout;

const headerStyle = {
  textAlign: "center",
  color: "#fff",
  height: 64,
  paddingInline: 48,
  lineHeight: "64px",
  backgroundColor: "#4096ff",
};

const contentStyle = {
  textAlign: "center",
  minHeight: 120,
  lineHeight: "120px",
  color: "#fff",
  backgroundColor: "#0958d9",
};

const siderStyle = {
  textAlign: "center",
  lineHeight: "120px",
  color: "#e67e22",
  //   color: "#fff",
  //   backgroundColor: "#f39c12",
  backgroundColor: "#FFFFFF",
};

const footerStyle = {
  textAlign: "center",
  color: "#fff",
  backgroundColor: "#4096ff",
};

const layoutStyle = {
  borderRadius: 8,
  overflow: "hidden",
  width: "calc(50% - 8px)",
  maxWidth: "calc(50% - 8px)",
};

const PanelAdmin = () => {
  const [selectedTab, setSelectedTab] = useState("1");
  const [chats, setChats] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();
  const [cookies] = useCookies(["user"]);
  const [chatListLoading, setChatListLoading] = useState(false);
  const [unread, setUnread] = useState(0);
  const [showChat, setShowChat] = useState(false);
  const [selectedChat, setSelectedChat] = useState(null);
  const [selectedChatUsername, setSelectedChatUsername] = useState("");
  const [showTourModal, setShowTourModal] = useState(false);
  const [selectedTour, setSeletedTour] = useState();
  const [tourName, setTourName] = useState();

  useEffect(() => {
    if (!(localStorage.getItem("customerId") && cookies.sessionId))
      window.location.replace("/");
  }, []);

  useEffect(() => {
    if (selectedChat) {
      setShowChat(true);
    } else {
      setShowChat(false);
    }
  }, [selectedChat]);

  const chatCategory = [
    {
      key: "1",
      label: (
        <Badge count={unread} offset={[-74, 0]}>
          <p style={{ color: selectedTab === "1" ? "#f39c12" : "#000" }}>
            چت‌های باز
          </p>
        </Badge>
      ),
      children: (
        <ChatList
          data={chats}
          loading={chatListLoading}
          setChatId={setSelectedChat}
          setSelectedChatUsername={setSelectedChatUsername}
          chatId={selectedChat}
        />
      ),
    },
    {
      key: "2",
      label: "چت‌های پایان یافته",
      children: (
        <ChatList
          data={chats}
          loading={chatListLoading}
          setChatId={setSelectedChat}
          setSelectedChatUsername={setSelectedChatUsername}
          chatId={selectedChat}
        />
      ),
    },
    {
      key: "3",
      label: "همه چت‌ها",
      children: (
        <ChatList
          data={chats}
          loading={chatListLoading}
          setChatId={setSelectedChat}
          setSelectedChatUsername={setSelectedChatUsername}
          chatId={selectedChat}
        />
      ),
    },
  ];

  const onTabSelect = (e) => {
    setSelectedTab(e);
  };

  useEffect(() => {
    switch (selectedTab) {
      // open
      case "1":
        setChatListLoading(true);
        getApi(
          `api/ChatList/get-unfinished-chats?customerId=${localStorage.getItem(
            "customerId"
          )}`
        )
          .then((data) => {
            setUnread(data.length);
            const promises = data.map((c) => {
              return getApi(`api/Chat/get-last-message?chatId=${c.id}`).then(
                (CData) => ({
                  id: c.id,
                  title: c.userName,
                  lastMessage: CData.text,
                })
              );
            });

            Promise.all(promises)
              .then((chats) => {
                setChats(chats);
                setChatListLoading(false);
              })
              .catch((err) => {
                console.log(err);
                setChatListLoading(false);
                messageApi.open({
                  type: "error",
                  content: "خطایی رخ داد!",
                  style: {
                    fontFamily: "VazirFD",
                    direction: "rtl",
                  },
                });
              });
          })
          .catch((err) => {
            console.log(err);
            setChatListLoading(false);
            messageApi.open({
              type: "error",
              content: "خطایی رخ داد!",
              style: {
                fontFamily: "VazirFD",
                direction: "rtl",
              },
            });
          });

        break;
      // finished
      case "2":
        setChatListLoading(true);
        getApi(
          `api/ChatList/get-finished-chats?customerId=${localStorage.getItem(
            "customerId"
          )}`
        )
          .then((data) => {
            const promises = data.map((c) => {
              return getApi(`api/Chat/get-last-message?chatId=${c.id}`).then(
                (CData) => ({
                  id: c.id,
                  title: c.userName,
                  lastMessage: CData.text,
                })
              );
            });

            Promise.all(promises)
              .then((chats) => {
                setChats(chats);
                setChatListLoading(false);
              })
              .catch((err) => {
                console.log(err);
                setChatListLoading(false);
                messageApi.open({
                  type: "error",
                  content: "خطایی رخ داد!",
                  style: {
                    fontFamily: "VazirFD",
                    direction: "rtl",
                  },
                });
              });
          })
          .catch((err) => {
            console.log(err);
            setChatListLoading(false);
            messageApi.open({
              type: "error",
              content: "خطایی رخ داد!",
              style: {
                fontFamily: "VazirFD",
                direction: "rtl",
              },
            });
          });

        break;
      //all
      case "3":
        setChatListLoading(true);
        getApi(
          `api/ChatList/get-all-chats?customerId=${localStorage.getItem(
            "customerId"
          )}`
        )
          .then((data) => {
            const promises = data.map((c) => {
              return getApi(`api/Chat/get-last-message?chatId=${c.id}`).then(
                (CData) => ({
                  id: c.id,
                  title: c.userName,
                  lastMessage: CData.text,
                })
              );
            });

            Promise.all(promises)
              .then((chats) => {
                setChats(chats);
                setChatListLoading(false);
              })
              .catch((err) => {
                console.log(err);
                setChatListLoading(false);
                messageApi.open({
                  type: "error",
                  content: "خطایی رخ داد!",
                  style: {
                    fontFamily: "VazirFD",
                    direction: "rtl",
                  },
                });
              });
          })
          .catch((err) => {
            console.log(err);
            setChatListLoading(false);
            messageApi.open({
              type: "error",
              content: "خطایی رخ داد!",
              style: {
                fontFamily: "VazirFD",
                direction: "rtl",
              },
            });
          });

        break;
    }
  }, [selectedTab]);

  return (
    <ConfigProvider
      theme={{
        components: {
          Tabs: {
            fontFamily: "VazirFD",
            itemSelectedColor: "#f39c12",
            itemHoverColor: "#ecf0f1",
            cardPadding: "8px 24px",
            cardGutter: 2,
          },
          Badge: {
            fontFamily: "VazirFD",
          },
          Button: {
            fontFamily: "VazirFD",
          },
          Tooltip: {
            fontFamily: "VazirFD",
          },
        },
      }}
    >
      {contextHolder}
      {showTourModal && (
        <TourModal
          isOpen={showTourModal}
          close={() => setShowTourModal(false)}
          messageApi={messageApi}
          setSeletedTour={setSeletedTour}
          setTourName={setTourName}
        />
      )}
      <Layout
        style={{
          minHeight: "100vh",
          direction: "rtl",
        }}
        // style={layoutStyle}
      >
        <Sider
          collapsed={false}
          collapsible
          trigger={
            <Button
              className=""
              icon={<LogoutOutlined />}
              onClick={() => {
                window.location.replace("/dashboard");
              }}
            >
              بازگشت به داشبورد
            </Button>
          }
          width="30%"
          style={siderStyle}
        >
          <Tabs
            defaultActiveKey="1"
            centered
            items={chatCategory}
            type="card"
            onChange={onTabSelect}
          />
        </Sider>
        <Content>
          {showChat && (
            <Chat
              chatId={selectedChat}
              messageApi={messageApi}
              selectedChatUsername={selectedChatUsername}
              setShowChat={setShowChat}
              setShowTourModal={setShowTourModal}
              selectedTour={selectedTour}
              setSeletedTour={setSeletedTour}
              tourName={tourName}
              setTourName={setTourName}
            />
          )}
        </Content>
      </Layout>
    </ConfigProvider>
  );
};

export default PanelAdmin;
