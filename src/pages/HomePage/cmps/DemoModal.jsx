import {
  Modal,
  ConfigProvider,
  message,
  Button,
  Input,
  Radio,
  Form,
  Row,
  Col,
} from "antd";
import { useState } from "react";

const DemoModal = ({ isOpen, close, messageApi }) => {
  const [contactType, setContactType] = useState("phone");
  const [contactValue, setContactValue] = useState("");

  const handleContactTypeChange = (e) => {
    setContactType(e.target.value);
    setContactValue("");
  };

  const handleSend = () => {
    if (contactValue == "") {
      messageApi.open({
        type: "warning",
        content: "مقداری وارد نشده‌است!",
        style: {
          fontFamily: "VazirFD",
          direction: "rtl",
        },
      });
    } else {
      messageApi.open({
        type: "success",
        content: "ارسال شد!",
        style: {
          fontFamily: "VazirFD",
          direction: "rtl",
        },
      });
      close();
    }
  };

  const handleInputChange = (e) => {
    const { value } = e.target;
    if (contactType === "phone") {
      // Only allow numeric values
      if (/^\d*$/.test(value)) {
        setContactValue(value);
      }
    } else {
      setContactValue(value);
    }
  };

  const text =
    "لطفاً ایمیل یا شماره تماس خود را در فرم زیر وارد کنید. همکاران ما در اسرع وقت با شما تماس خواهند گرفت تا هماهنگی‌های لازم برای جلسه را انجام دهند.";

  return (
    <>
      <ConfigProvider
        theme={{
          components: {
            Modal: {
              fontFamily: "VazirFD",
            },
            Radio: {
              fontFamily: "VazirFD",
            },
            Button: {
              fontFamily: "VazirFD",
            },
            Input: {
              fontFamily: contactType === "phone" ? "VazirFD" : "",
            },
          },
        }}
      >
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
          <div className="flex items-center justify-center">
            <div className="border-4 border-blue-100 rounded-lg p-2 bg-white shadow-lg">
              <p className="text-justify text-gray-800">{text}</p>
            </div>
          </div>
          <Form
            style={{ margin: "2rem 0 0 0", direction: "ltr" }}
            layout="vertical"
            onSubmitCapture={handleSend}
          >
            <Form.Item>
              <Row align="middle">
                <Col span={5}>
                  <label className="font">
                    {contactType === "phone" ? "شماره تماس" : "آدرس ایمیل"}:
                  </label>
                </Col>
                <Col span={18}>
                  <Input
                    className={
                      contactType === "phone" ? "font" : "fontPlaceholder"
                    }
                    value={contactValue}
                    onChange={handleInputChange}
                    count={
                      contactType === "phone"
                        ? {
                            show: true,
                            max: 11,
                          }
                        : {}
                    }
                    placeholder={
                      contactType === "phone"
                        ? "شماره تماس خود را وارد کنید"
                        : "آدرس ایمیل خود را وارد کنید"
                    }
                    type={contactType === "phone" ? "tel" : "email"}
                  />
                </Col>
              </Row>
            </Form.Item>

            <Form.Item
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Radio.Group
                onChange={handleContactTypeChange}
                value={contactType}
              >
                <Radio value="phone">شماره تماس</Radio>
                <Radio value="email">ایمیل</Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Button type="primary" size="medium" onClick={handleSend}>
                درخواست دمو
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </ConfigProvider>
    </>
  );
};
export default DemoModal;
