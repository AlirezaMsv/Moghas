import React from "react";
import { Button, ConfigProvider } from "antd";
import AppMenu from "./cmps/AppMenu";
import style from "./HomePage.module.css";

const Homepage = () => {
  return (
    <div className={style.homepage}>
      <AppMenu />
      <div className="text-center py-24 bg-white">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          گفتگوی آنلاین با مشتریان
        </h1>
        <p
          style={{
            direction: "rtl",
          }}
          className="text-lg text-gray-400 mb-8"
        >
          با گفتینو خیلی ساده با مشتریان خود مستقیم صحبت کنید و از این ابزار
          پشتیبانی کارآمد، برای توسعه کسب و کارتان استفاده کنید!
        </p>
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
    </div>
  );
};

export default Homepage;
