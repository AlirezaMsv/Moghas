import { Modal, ConfigProvider, QRCode, Input, Button, message } from "antd";
import { SmileFilled, CopyOutlined } from "@ant-design/icons";
import logo from "../../assets/logos/favicon-32x32.png";

const SupportModal = ({ isOpen, close }) => {
  const link = "https://sibmo.ir/moqas";
  const tnks = "عزیزان گرامی،  با تشکر فراوان از شما که قصد دارید از پروژه ما حمایت مالی کنید. قدردان همراهی و حمایت شما هستیم و باور داریم که با کمک‌های ارزشمند شما، می‌توانیم گام‌های مؤثری در جهت تحقق اهداف و توسعه این پروژه برداریم.    پشتیبانی شما نه تنها به ادامه فعالیت‌های ما کمک می‌کند، بلکه نشان‌دهنده اعتماد و ارزشی است که برای کار ما قائل هستید. ما متعهد هستیم که این اعتماد را با بهبود مستمر خدمات و تلاش برای ارائه بهترین‌ها، پاسخ دهیم.  با سپاس بیکران"
  const [messageApi, contextHolder] = message.useMessage();

  const copyLink = () => {
    navigator.clipboard
      .writeText(link)
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
            حمایت از موقاس{" "}
            <SmileFilled
              style={{
                color: "#f39c12",
              }}
            />
          </div>
        }
        onCancel={close}
        open={isOpen}
        footer={[]}
      >
        {tnks}
        <div>
          <QRCode
            style={{ margin: "1rem auto" }}
            errorLevel="H"
            value={link}
            icon={logo}
          />
          <div
            style={{
              display: "flex",
            }}
          >
            <Button>
              <CopyOutlined onClick={copyLink} />
            </Button>
            <Input
              style={{ margin: "0 0.75rem", direction: "ltr" }}
              disabled
              value={link}
            />
          </div>
        </div>
      </Modal>
    </ConfigProvider>
  );
};
export default SupportModal;
