import React, { useState, useEffect } from "react";
import { Button, ConfigProvider, message } from "antd";
import AppMenu from "./cmps/AppMenu";
import style from "./HomePage.module.css";
import LSModal from "../LoginModal/LSModal";
import CardSection from "./cmps/CardSection";
import DonateModal from "../DonateModal/DonateModal";
import SupportModal from "../SupportModal/SupportModal";
import DemoModal from "./cmps/DemoModal";
import back1 from "../../assets/homepage/back1.png";
import OurCustomers from "./cmps/OurCustomers";
import quote from "../../assets/homepage/c1.svg";
import Footer from "./cmps/Footer";
import { useCookies } from "react-cookie";

const Homepage = () => {
  const [showLS, setShowLS] = useState(false);
  const [showDonate, setShowDonate] = useState(false);
  const [showSupport, setShowSupport] = useState(false);
  const [showDemo, setShowDemo] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [cookies] = useCookies(["user"]);

  useEffect(() => {
    if (localStorage.getItem("customerId" && cookies.sessionId)) {
      window.location.replace("/dashboard");
    }
  }, []);

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
      {contextHolder}
      {showLS && (
        <LSModal isOpen={showLS} close={closeLS} messageApi={messageApi} />
      )}
      {showDonate && (
        <DonateModal
          isOpen={showDonate}
          close={closeDonate}
          messageApi={messageApi}
        />
      )}
      {showSupport && (
        <SupportModal
          isOpen={showSupport}
          close={closeSupport}
          messageApi={messageApi}
        />
      )}
      {showDemo && (
        <DemoModal
          isOpen={showDemo}
          close={closeDemo}
          messageApi={messageApi}
        />
      )}
      <AppMenu
        openLS={openLS}
        openDonate={openDonate}
        openSupport={openSupport}
        openDemo={openDemo}
        messageApi={messageApi}
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
        <div className="flex justify-center">
          <img id="mySvg" src={quote} />
          <h1
            style={{
              color: "#1e3a58",
            }}
            className="m-8 text-3xl font-extrabold"
          >
            کسب و کارهایی که به ما اعتماد کرده‌اند
          </h1>
          <img src={quote} />
        </div>
        <OurCustomers />
      </div>
      <Footer />
    </div>
  );
};

export default Homepage;
