import React, { useState } from "react";
import { Menu, Button, ConfigProvider } from "antd";
import { DownOutlined, LockFilled } from "@ant-design/icons";
import { TinyColor } from "@ctrl/tinycolor";
import "./AppMenu.module.css";
import icon from "../../../assets/logos/icon.png";
import style from "./AppMenu.module.css";

const { SubMenu } = Menu;

const AppMenu = () => {
  const [submenuOpen, setSubmenuOpen] = useState(false);

  const handleSubmenuChange = (openKeys) => {
    setSubmenuOpen(openKeys.includes("sub1"));
  };
  const colors3 = ["#40e495", "#30dd8a", "#2bb673"];
  const getHoverColors = (colors) =>
    colors.map((color) => new TinyColor(color).lighten(5).toString());
  const getActiveColors = (colors) =>
    colors.map((color) => new TinyColor(color).darken(5).toString());

  return (
    <Menu
      mode="horizontal"
      className="items-center bg-gray-100 p-4"
      style={{
        direction: "rtl",
      }}
    >
      <img className="w-14 mx-32" src={icon} />
      <Menu
        mode="horizontal"
        className="basis-5/6 flex justify-center"
        onOpenChange={handleSubmenuChange}
      >
        <SubMenu
          key="sub1"
          title={
            <span>
              چرا موقاس؟
              <DownOutlined
                className={`${style.transition_transform} ${
                  submenuOpen ? style.rotate_180 : ""
                }`}
              />
            </span>
          }
        >
          <Menu.ItemGroup title="بررسی اجمالی">
            <Menu.Item key="overview">بررسی اجمالی تسکولو</Menu.Item>
          </Menu.ItemGroup>
          <Menu.ItemGroup title="ویژگی‌ها و امکانات">
            <Menu.Item key="feature1">مدیریت کارها</Menu.Item>
            <Menu.Item key="feature2">برگزاری جلسات آنلاین</Menu.Item>
            <Menu.Item key="feature3">تحلیلگر</Menu.Item>
            <Menu.Item key="feature4">سایر ویژگی های تسکولو</Menu.Item>
          </Menu.ItemGroup>
        </SubMenu>
        <Menu.Item key="2">راهکارها</Menu.Item>
        <Menu.Item key="3">موارد استفاده</Menu.Item>
        <Menu.Item key="4">قیمت‌ها</Menu.Item>
        <Menu.Item key="5">وبلاگ</Menu.Item>
        <Menu.Item key="6">پشتیبانی</Menu.Item>
      </Menu>
      <div className="mx-8 flex items-center gap-4">
        {/* login button */}
        <ConfigProvider
          theme={{
            components: {
              Button: {
                fontFamily: "VazirFD",
                colorPrimary: `linear-gradient(116deg,  ${colors3.join(", ")})`,
                colorPrimaryHover: `linear-gradient(116deg, ${getHoverColors(
                  colors3
                ).join(", ")})`,
                colorPrimaryActive: `linear-gradient(116deg, ${getActiveColors(
                  colors3
                ).join(", ")})`,
                lineWidth: 0,
              },
            },
          }}
        >
          <Button type="primary" size="large" icon={<LockFilled />}>
            وارد شوید
          </Button>
        </ConfigProvider>
        {/* start free */}
        <ConfigProvider
          theme={{
            components: {
              Button: {
                fontFamily: "VazirFD",
                lineWidth: 0,
              },
            },
          }}
        >
          <Button type="primary" size="large">
            رایگان شروع کنید
          </Button>
        </ConfigProvider>
      </div>
    </Menu>
  );
};

export default AppMenu;
