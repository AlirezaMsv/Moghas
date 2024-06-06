import React, { useEffect, useState } from "react";
import {
  DesktopOutlined,
  PoweroffOutlined,
  LeftCircleOutlined,
  PieChartOutlined,
  RightCircleOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme, message } from "antd";
import DashHeader from "./cmps/DashHeader";
import DonateModal from "../DonateModal/DonateModal";
import SupportModal from "../SupportModal/SupportModal";

const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem("اطلاعات کاربری", "1", <DesktopOutlined />),
  getItem("پنل ادمین", "2", <DesktopOutlined />),
  getItem("ویرایش اطلاعات", "3", <UserOutlined />, [
    getItem("تغییر ایمیل", "3_1"),
    getItem("تغییر پسورد", "3_2"),
  ]),
  getItem("گزارش‌گیری", "4", <PieChartOutlined />),
  getItem("مدیریت ماژول", "5", <TeamOutlined />, [
    getItem("سوالات پرتکرار", "5_1"),
    getItem("تنظیمات ظاهری", "5_2"),
    getItem("مدیریت تورها", "5_3"),
  ]),
  getItem("خروج", "6", <PoweroffOutlined />),
];

const Dashboard = () => {
  const [breadItems, setBreadItems] = useState([]);
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [messageApi, contextHolder] = message.useMessage();
  const [showDonate, setShowDonate] = useState(false);
  const [showSupport, setShowSupport] = useState(false);

  const handleMenuClick = (mi) => {
    const arr = [];
    const root = items.filter(
      (i) => i.key === mi.keyPath[mi.keyPath.length - 1]
    );
    const rootName = root[0].label;
    arr.push(rootName);
    if (mi.keyPath.length > 1) {
      const child = root[0].children.filter((i) => i.key === mi.keyPath[0]);
      const childName = child[0].label;
      arr.push(childName);
    }
    setBreadItems(arr);
  };

  useEffect(() => {
    setBreadItems(["اطلاعات کاربری"]);
  }, []);

  return (
    <Layout
      style={{
        minHeight: "100vh",
        direction: "rtl",
      }}
    >
      {contextHolder}
      {showDonate && (
        <DonateModal
          isOpen={showDonate}
          close={() => setShowDonate(false)}
          messageApi={messageApi}
        />
      )}
      {showSupport && (
        <SupportModal
          isOpen={showSupport}
          close={() => setShowSupport(false)}
          messageApi={messageApi}
        />
      )}
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        trigger={
          collapsed ? (
            <LeftCircleOutlined className="text-2xl" />
          ) : (
            <RightCircleOutlined className="text-2xl" />
          )
        }
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
          onClick={handleMenuClick}
        />
      </Sider>
      <Layout>
        {/* header */}
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <DashHeader
            messageApi={messageApi}
            openDonate={() => setShowDonate(true)}
            openSupport={() => setShowSupport(true)}
          />
        </Header>
        {/* content */}
        <Content
          style={{
            margin: "0 16px",
          }}
        >
          <Breadcrumb
            style={{
              margin: "16px 0",
            }}
          >
            {breadItems.map((b) => (
              <Breadcrumb.Item className="font">{b}</Breadcrumb.Item>
            ))}
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          ></div>
        </Content>
        {/* footer */}
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Moghas Chat ©{new Date().getFullYear()}
        </Footer>
      </Layout>
    </Layout>
  );
};
export default Dashboard;
