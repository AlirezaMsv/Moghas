import React, { useCallback, useEffect, useState } from "react";
import {
  DesktopOutlined,
  PoweroffOutlined,
  LeftCircleOutlined,
  PieChartOutlined,
  RightCircleOutlined,
  TeamOutlined,
  UserOutlined,
  MailOutlined,
  SafetyOutlined,
  ShareAltOutlined,
  SettingFilled,
  CarOutlined,
  InfoCircleOutlined,
  WechatOutlined,
  CoffeeOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme, message } from "antd";
import DashHeader from "./cmps/DashHeader";
import DonateModal from "../DonateModal/DonateModal";
import SupportModal from "../SupportModal/SupportModal";
import UserInfo from "./cmps/UserInfo";
import Report from "./cmps/Report";
import ChangeEmail from "./cmps/ChangeEmail";
import ChangePass from "./cmps/ChangePass";
import ConfigManager from "./cmps/ConfigManager";
import { useCookies } from "react-cookie";
import { deleteCookie, putApi } from "../../hooks/api";
import FAQ from "./cmps/FAQ";
import UI from "./cmps/UI";
import TOUR from "./cmps/TOUR";
import { getApi } from "../../hooks/api";
import Contact from "./cmps/Contact";

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
  getItem("پنل ادمین", "2", <WechatOutlined />),
  getItem("ویرایش اطلاعات", "3", <UserOutlined />, [
    getItem("تغییر ایمیل", "3_1", <MailOutlined />),
    getItem("تغییر پسورد", "3_2", <SafetyOutlined />),
  ]),
  getItem("گزارش‌گیری", "4", <PieChartOutlined />),
  getItem("مدیریت بسته", "7", <InfoCircleOutlined />),
  getItem("مدیریت ماژول", "5", <TeamOutlined />, [
    getItem("سوالات پرتکرار", "5_1", <ShareAltOutlined />),
    getItem("تنظیمات واسط کاربری", "5_2", <SettingFilled />),
    getItem("مدیریت تورها", "5_3", <CarOutlined />),
    getItem("اطلاعات تماس", "5_4", <CoffeeOutlined />),
  ]),
  getItem("خروج", "6", <PoweroffOutlined />),
];

const Dashboard = () => {
  const [breadItems, setBreadItems] = useState([]);
  const [selected, setSelected] = useState("1");
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [messageApi, contextHolder] = message.useMessage();
  const [showDonate, setShowDonate] = useState(false);
  const [showSupport, setShowSupport] = useState(false);
  const [cookies] = useCookies(["user"]);
  const [hasConfig, setHasConfig] = useState(false);

  const handleMenuClick = (mi) => {
    // set bread items
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
    // handle click
    setSelected(mi.keyPath[0]);
  };

  useEffect(() => {
    if (!(localStorage.getItem("customerId") && cookies.sessionId))
      window.location.replace("/");
    setBreadItems(["اطلاعات کاربری"]);
  }, []);

  useEffect(() => {
    getApi(`api/Config/get-config?browserToken=${cookies.sessionId}`)
      .then((data) => {
        if (data.configExpires < getCurrentDateTimeFormatted()) {
          setHasConfig(false);
        } else {
          setHasConfig(true);
        }
      })
      .catch((err) => {
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
  }, [selected]);

  function getCurrentDateTimeFormatted() {
    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");
    const milliseconds = String(now.getMilliseconds()).padStart(3, "0");
    const microseconds = String(now.getTime() % 1000).padStart(3, "0"); // Assuming microseconds are derived from milliseconds

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}${microseconds}`;
  }

  const getContent = useCallback(() => {
    switch (selected) {
      // userInfo
      case "1":
        return <UserInfo messageApi={messageApi} />;
      // admin panel
      case "2":
        if (!hasConfig) {
          messageApi.open({
            type: "info",
            content: "ابتدا یک بسته بسازید",
            style: {
              fontFamily: "VazirFD",
              direction: "rtl",
            },
          });
        } else {
          messageApi.open({
            type: "info",
            content: "برووو بریییم!",
            style: {
              fontFamily: "VazirFD",
              direction: "rtl",
            },
          });
          setTimeout(() => {
            window.location.replace("/admin");
          }, 1000);
        }
        break;
      // change email
      case "3_1":
        return (
          <ChangeEmail messageApi={messageApi} setSelected={setSelected} />
        );
      // change pass
      case "3_2":
        return <ChangePass messageApi={messageApi} setSelected={setSelected} />;
      // report
      case "4":
        if (!hasConfig) {
          messageApi.open({
            type: "info",
            content: "ابتدا یک بسته بسازید",
            style: {
              fontFamily: "VazirFD",
              direction: "rtl",
            },
          });
        } else return <Report messageApi={messageApi} />;
      // faq
      case "5_1":
        if (!hasConfig) {
          messageApi.open({
            type: "info",
            content: "ابتدا یک بسته بسازید",
            style: {
              fontFamily: "VazirFD",
              direction: "rtl",
            },
          });
        } else return <FAQ messageApi={messageApi} />;
      // ui
      case "5_2":
        if (!hasConfig) {
          messageApi.open({
            type: "info",
            content: "ابتدا یک بسته بسازید",
            style: {
              fontFamily: "VazirFD",
              direction: "rtl",
            },
          });
        } else return <UI messageApi={messageApi} />;
      // tour
      case "5_3":
        if (!hasConfig) {
          messageApi.open({
            type: "info",
            content: "ابتدا یک بسته بسازید",
            style: {
              fontFamily: "VazirFD",
              direction: "rtl",
            },
          });
        } else return <TOUR messageApi={messageApi} />;
      // contact
      case "5_4":
        if (!hasConfig) {
          messageApi.open({
            type: "info",
            content: "ابتدا یک بسته بسازید",
            style: {
              fontFamily: "VazirFD",
              direction: "rtl",
            },
          });
        } else return <Contact messageApi={messageApi} />;
      // config manager
      case "7":
        return <ConfigManager messageApi={messageApi} />;
      // logout
      case "6":
        localStorage.removeItem("customerId");
        deleteCookie("sessionId");
        putApi(
          `api/CustomerAuthentication/logout?browserToken=${cookies.sessionId}`
        )
          .then((data) => {
            messageApi.open({
              type: "info",
              content: "از حساب خود خارج شدید!",
              style: {
                fontFamily: "VazirFD",
                direction: "rtl",
              },
            });
            setTimeout(() => {
              window.location.replace("/");
            }, 1000);
          })
          .catch((err) => {
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
        break;
    }
  }, [selected]);

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
        width="20%"
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
          defaultSelectedKeys={selected}
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
            {breadItems.map((b, i) => (
              <Breadcrumb.Item className="font" key={i}>
                {b}
              </Breadcrumb.Item>
            ))}
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {getContent()}
          </div>
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
