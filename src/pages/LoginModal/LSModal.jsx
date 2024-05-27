import { Modal, ConfigProvider, Tabs } from "antd";
import { UserAddOutlined, SmileOutlined } from "@ant-design/icons";
import SignUp from "./cmps/SignUp";
import Login from "./cmps/Login";

const LSModal = ({ isOpen, close }) => {
  const tabItems = [
    {
      key: "1",
      label: "ورود",
      icon: <SmileOutlined />,
      children: <Login />,
    },
    {
      key: "2",
      label: "ثبت‌نام",
      icon: <UserAddOutlined />,
      children: <SignUp />,
    },
  ];

  return (
    <ConfigProvider
      theme={{
        components: {
          Modal: {
            fontFamily: "VazirFD",
          },
          Tabs:{
            fontFamily: "VazirFD",
          }
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
