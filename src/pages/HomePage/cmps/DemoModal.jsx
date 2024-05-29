import { Modal, ConfigProvider, message, Button, Input } from "antd";

const DemoModal = ({ isOpen, close }) => {
  const [messageApi, contextHolder] = message.useMessage();

  return (
    <ConfigProvider
      theme={{
        components: {
          Modal: {
            fontFamily: "VazirFD",
          },
        },
      }}
    >
      {contextHolder}
      <Modal
        title={
          <div
            style={{
              textAlign: "center",
              width: "100%",
            }}
          >
            درخواست دمو
          </div>
        }
        onCancel={close}
        open={isOpen}
        footer={[]}
      >
        
      </Modal>
    </ConfigProvider>
  );
};
export default DemoModal;
