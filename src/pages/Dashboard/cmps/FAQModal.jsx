import React, { useEffect, useState } from "react";
import { Modal as AntModal, Button, Flex, Input } from "antd";
import { postApi, putApi } from "../../../hooks/api";

function FAQModal({
  isOpen,
  close,
  showData = false,
  data,
  messageApi,
  setReFetch,
}) {
  const { TextArea } = Input;

  const [question, setQuestion] = useState("");
  const [ans, setAns] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddFAQ = () => {
    if (showData) {
      // edit
      if (question === data.question && ans === data.answer) {
        messageApi.open({
          type: "warning",
          content: "تغییری ایجاد نشده‌است!",
          style: {
            fontFamily: "VazirFD",
            direction: "rtl",
          },
        });
      } else {
        setLoading(true);
        putApi(`api/CustomerSettings/update-key-value?settingId=${data.id}`, {
          key: question,
          value: ans,
        })
          .then((data) => {
            setLoading(false);
            messageApi.open({
              type: "success",
              content: "با موفقیت ویرایش شد!",
              style: {
                fontFamily: "VazirFD",
                direction: "rtl",
              },
            });
            setReFetch((prev) => !prev);
            close();
          })
          .catch((err) => {
            console.log(err);
            messageApi.open({
              type: "error",
              content: "خطایی رخ داد!",
              style: {
                fontFamily: "VazirFD",
                direction: "rtl",
              },
            });
            setLoading(false);
          });
      }
    } else {
      // add
      if (question !== "" && ans !== "") {
        setLoading(true);
        postApi(`api/CustomerSettings/insert-setting`, {
          customerId: localStorage.getItem("customerId"),
          type: "FAQ",
          key: question,
          value: ans,
        })
          .then((data) => {
            setLoading(false);
            messageApi.open({
              type: "success",
              content: "با موفقیت درج شد!",
              style: {
                fontFamily: "VazirFD",
                direction: "rtl",
              },
            });
            setReFetch((prev) => !prev);
            close();
          })
          .catch((err) => {
            console.log(err);
            messageApi.open({
              type: "error",
              content: "خطایی رخ داد!",
              style: {
                fontFamily: "VazirFD",
                direction: "rtl",
              },
            });
            setLoading(false);
          });
      }
    }
  };

  useEffect(() => {
    if (showData) {
      setQuestion(data.question);
      setAns(data.answer);
    } else {
      setQuestion("");
      setAns("");
    }
  }, []);

  return (
    <AntModal
      centered
      closable={false}
      footer={[
        <Button key="back" onClick={close} disabled={loading}>
          انصراف
        </Button>,
        <Button
          loading={loading}
          key="submit"
          onClick={handleAddFAQ}
          type="primary"
        >
          {showData ? "ویرایش" : "ذخیره"}
        </Button>,
      ]}
      title={showData ? "ویرایش سوال" : "اضافه کردن سوال"}
      open={isOpen}
      onCancel={close}
    >
      <Flex vertical gap={20}>
        <Input
          placeholder="متن سوال"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <TextArea
          rows={5}
          placeholder="پاسخ سوال"
          style={{ maxHeight: "15rem" }}
          value={ans}
          onChange={(e) => setAns(e.target.value)}
        />
      </Flex>
    </AntModal>
  );
}

export default FAQModal;
