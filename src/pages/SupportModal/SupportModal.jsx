import { Modal, ConfigProvider, message, Button, Input } from "antd";
import { CopyOutlined } from "@ant-design/icons";

const SupportModal = ({ isOpen, close }) => {
  const email = "moqasSupport@moqas-chat.ir";
  const text =
    "ما همیشه آماده شنیدن نظرات، پیشنهادات و سوالات شما هستیم. برای ارتباط با ما می‌توانید از طریق ایمیل زیر اقدام کنید:";
  const [messageApi, contextHolder] = message.useMessage();

  const copyLink = () => {
    navigator.clipboard
      .writeText(email)
      .then(() => {
        messageApi.open({
          type: "success",
          content: "کپی شد!",
          style: {
            fontFamily: "VazirFD",
            direction: "rtl",
          },
        });
      })
      .catch(() => {
        messageApi.open({
          type: "error",
          content: "خطایی رخ داد!",
          style: {
            fontFamily: "VazirFD",
            direction: "rtl",
          },
        });
      });
  };

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
            ارتباط با ما
          </div>
        }
        onCancel={close}
        open={isOpen}
        footer={[]}
      >
        <div className="flex items-center justify-center">
          <div className="border-4 border-blue-100 rounded-lg p-2 bg-white shadow-lg">
            <p className="text-justify text-gray-800">{text}</p>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            margin: "2rem 0 0 0"
          }}
        >
          <Button>
            <CopyOutlined onClick={copyLink} />
          </Button>
          <Input
            style={{ margin: "0 0.75rem", direction: "ltr" }}
            readOnly
            value={email}
          />
        </div>
      </Modal>
    </ConfigProvider>
  );
};
export default SupportModal;
