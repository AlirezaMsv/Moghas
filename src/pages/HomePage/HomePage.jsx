import React, { useState } from "react";
import { Button, ConfigProvider } from "antd";
import AppMenu from "./cmps/AppMenu";
import style from "./HomePage.module.css";
import LSModal from "../LoginModal/LSModal";
import CardSection from "./cmps/CardSection";
import Prices from "./cmps/Prices";
import DonateModal from "../DonateModal/DonateModal";
import SupportModal from "../SupportModal/SupportModal";
import DemoModal from "./cmps/DemoModal";
import back1 from "../../assets/homepage/back1.png";

const Homepage = () => {
  const [showLS, setShowLS] = useState(false);
  const [showDonate, setShowDonate] = useState(false);
  const [showSupport, setShowSupport] = useState(false);
  const [showDemo, setShowDemo] = useState(false);

  const openLS = () => {
    setShowLS(true);
  };

  const closeLS = () => {
    setShowLS(false);
  };

  const openDonate = () => {
    setShowDonate(true);
  };

  const closeDonate = () => {
    setShowDonate(false);
  };

  const openSupport = () => {
    setShowSupport(true);
  };

  const closeSupport = () => {
    setShowSupport(false);
  };

  const openDemo = () => {
    setShowDemo(true);
  };

  const closeDemo = () => {
    setShowDemo(false);
  };

  return (
    <div className={style.homepage}>
      {showLS && <LSModal isOpen={showLS} close={closeLS} />}
      {showDonate && <DonateModal isOpen={showDonate} close={closeDonate} />}
      {showSupport && (
        <SupportModal isOpen={showSupport} close={closeSupport} />
      )}
      {showDemo && (
        <DemoModal isOpen={showDemo} close={closeDemo} />
      )}
      <AppMenu
        openLS={openLS}
        openDonate={openDonate}
        openSupport={openSupport}
        openDemo={openDemo}
      />
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
          با موقاس خیلی ساده با مشتریان خود مستقیم صحبت کنید و از این ابزار
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
          <Button type="primary" size="large" onClick={openDemo}>
            درخواست دمو
          </Button>
        </ConfigProvider>
      </div>
      <img src={back1} />
      <div id="usage" className="text-center py-24 bg-white">
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
      <div id="customers">
        <Prices />
      </div>
    </div>
  );
};

export default Homepage;
