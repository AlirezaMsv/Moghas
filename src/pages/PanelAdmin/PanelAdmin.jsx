import {} from "@ant-design/icons";
import { render } from "@testing-library/react";
import { Badge, ConfigProvider, Layout, Tabs } from "antd";
import { useState } from "react";
import ChatList from "./cmps/ChatList";
// import { ProChat } from "@ant-design/pro-chat";
const { Header, Content, Footer, Sider } = Layout;



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
  const [collapsed, setCollapsed] = useState(false);
  const [selectedTab, setSelectedTab] = useState("1");

  const chatCategory = [
    {
      key: "1",
      label: (
        <Badge count={4} offset={[-74, 0]}>
          <p style={{ color: selectedTab === "1" ? "#f39c12" : "#000" }}>چت‌های باز</p>
        </Badge>
      ),
      children: <ChatList />,
    },
    {
      key: "2",
      label: "چت‌های پایان یافته",
      children: <ChatList />,
    },
    {
      key: "3",
      label: "همه چت‌ها",
      children: <ChatList />,
    },
  ];

  const onTabSelect = (e) => {
    setSelectedTab(e)
  }

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
        },
      }}
    >
      <Layout
        style={{
          minHeight: "100vh",
          direction: "rtl",
        }}
        // style={layoutStyle}
      >
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          trigger={null}
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
      </Layout>
    </ConfigProvider>
  );
};

export default PanelAdmin;