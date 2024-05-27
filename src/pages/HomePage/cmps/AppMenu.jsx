import React, { lazy, useState } from "react";
import { Menu, Button, ConfigProvider } from "antd";
import { LockFilled, SmileFilled } from "@ant-design/icons";
import { TinyColor } from "@ctrl/tinycolor";
import "./AppMenu.module.css";
import icon from "../../../assets/logos/icon.png";
import style from "./AppMenu.module.css";

const { SubMenu } = Menu;

const AppMenu = ({ openLS, openSupport }) => {
  const colors2 = ["#fc6076", "#ff9a44", "#ef9d43", "#e75516"];
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
        className="basis-5/6 flex justify-center rounded-2xl"
      >
        <Menu.Item key="1">چرا موقاس؟</Menu.Item>
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
          <Button
            onClick={openLS}
            type="primary"
            size="large"
            icon={<LockFilled />}
          >
            وارد شوید
          </Button>
        </ConfigProvider>
        {/* start free */}
        <ConfigProvider
          theme={{
            components: {
              Button: {
                fontFamily: "VazirFD",
                colorPrimary: `linear-gradient(116deg,  ${colors2.join(", ")})`,
                colorPrimaryHover: `linear-gradient(116deg, ${getHoverColors(
                  colors2
                ).join(", ")})`,
                colorPrimaryActive: `linear-gradient(116deg, ${getActiveColors(
                  colors2
                ).join(", ")})`,
                lineWidth: 0,
              },
            },
          }}
        >
          <Button type="primary" size="large" onClick={openSupport} icon={<SmileFilled />}>
            حمایت از موقاس
          </Button>
        </ConfigProvider>
      </div>
    </Menu>
  );
};

export default AppMenu;
