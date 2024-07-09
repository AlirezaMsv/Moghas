import { Footer } from "antd/es/layout/layout";
import AppMenu from "./HomePage/cmps/AppMenu";
import { Button, ConfigProvider, message } from "antd";
import { useState } from "react";
import LSModal from "./LoginModal/LSModal";
import DonateModal from "./DonateModal/DonateModal";
import SupportModal from "./SupportModal/SupportModal";
import DemoModal from "./HomePage/cmps/DemoModal";

const NotFound = () => {
  const [showLS, setShowLS] = useState(false);
  const [showDonate, setShowDonate] = useState(false);
  const [showSupport, setShowSupport] = useState(false);
  const [showDemo, setShowDemo] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
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
    <ConfigProvider
      theme={{
        components: {
          Button: {
            fontFamily: "VazirFD",
          },
        },
      }}
    >
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
      <div className="flex flex-col items-center justify-center my-12 text-center bg-white font">
        <h1 className="text-9xl font-bold mb-4">۴۰۴</h1>
        <p className="text-xl mb-8">
          به نظر می‌رسد که شما در بین صفحات گم شده اید. ما به شما کمک می‌کنیم تا
          از اینجا به بیرون بروید
        </p>
        <Button
          type="primary"
          href="/"
          className="text-base"
          onClick={() => {
            window.location.replace("/");
          }}
        >
          مشاهده صفحه اصلی
        </Button>
      </div>
    </ConfigProvider>
  );
};

export default NotFound;
