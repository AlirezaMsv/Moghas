import { Modal, ConfigProvider, Tabs } from "antd";
import { UserAddOutlined, SmileOutlined } from "@ant-design/icons";
import SignUp from "./cmps/SignUp";
import Login from "./cmps/Login";
import { useEffect, useState } from "react";
import { isDisabled } from "@testing-library/user-event/dist/utils";

const LSModal = ({ isOpen, close, messageApi }) => {
  const [loginEnable, setLoginEnable] = useState(true);
  const [signupEnable, setSignupEnable] = useState(true);

  useEffect(() => {
    setLoginEnable(true)
    setSignupEnable(true)
  }, [])

  const tabItems = [
    {
      key: "1",
      label: "ورود",
      icon: <SmileOutlined />,
      disabled: !loginEnable,
      children: <Login setSignupEnable={setSignupEnable} messageApi={messageApi} close={close} />,
    },
    {
      key: "2",
      label: "ثبت‌نام",
      icon: <UserAddOutlined />,
      disabled: !signupEnable,
      children: <SignUp setLoginEnable={setLoginEnable} messageApi={messageApi} close={close} />,
    },
  ];

  return (
    <ConfigProvider
      theme={{
        components: {
          Modal: {
            fontFamily: "VazirFD",
          },
          Tabs: {
            fontFamily: "VazirFD",
          },
        },
      }}
    >
        <Modal onCancel={close} open={isOpen} footer={[]}>
          <Tabs
            defaultActiveKey="1"
            type="card"
            size="middle"
            items={tabItems}
            centered
          />
        </Modal>
    </ConfigProvider>
  );
};
export default LSModal;
