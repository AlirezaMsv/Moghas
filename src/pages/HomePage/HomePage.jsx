import React, { useState } from "react";
import { Button, ConfigProvider, Typography } from "antd";
import AppMenu from "./cmps/AppMenu";
import style from "./HomePage.module.css";
import LSModal from "../LoginModal/LSModal";
import CardSection from "./cmps/CardSection";
import Prices from "./cmps/Prices";

const Homepage = () => {
  const [showLS, setShowLS] = useState(false);

  const openLS = () => {
    setShowLS(true);
  };

  const closeLS = () => {
    setShowLS(false);
  };

  return (
    <div className={style.homepage}>
      {showLS && <LSModal isOpen={showLS} close={closeLS} />}
      <AppMenu show={openLS} />
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
      <div className="text-center py-24 bg-white">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          یک میز کار کامل در اختیار شماست
        </h1>
        <p
          style={{
            direction: "rtl",
          }}
          className="text-lg text-gray-400 mb-8"
        >
          بر روی اهداف، پروژه‌ها و کارهای روزمره خود متمرکز شوید.
        </p>
        <CardSection />
      </div>
      <div>
        <Prices />
      </div>
    </div>
  );
};

export default Homepage;
