import React, { useState } from "react";
import { Button, Form, Input } from "antd";
import { postApi, putApi } from "../../../hooks/api";

const ChangeEmail = ({ messageApi, setSelected }) => {
  const [loadingEmail, setLoadingEmail] = useState(false);
  const [OTP, setOTP] = useState(false);
  const [loadingOTP, setLoadingOTP] = useState(false);
  const [newEmail, setNewEmail] = useState("");

  const validateEmail = () => {
    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(newEmail)) {
      messageApi.open({
        type: "error",
        content: "ایمیل وارد شده درست نیست!",
        style: {
          fontFamily: "VazirFD",
          direction: "rtl",
        },
      });
      return false;
    }
    return true;
  };

  const handleVerify = (text) => {
    setLoadingOTP(true);
    postApi(
      `api/Profile/profile-update-email-verify?verificationToken=${text}&newEmail=${newEmail}`
    )
      .then((data) => {
        setLoadingOTP(false);
        setSelected("1");
        messageApi.open({
          type: "success",
          content: "ایمیل شما تغییر کرد!",
          style: {
            fontFamily: "VazirFD",
            direction: "rtl",
          },
        });
      })
      .catch((err) => {
        console.log(err);
        messageApi.open({
          type: "error",
          content: err.response.data || "خطایی رخ داد!",
          style: {
            fontFamily: "VazirFD",
            direction: "rtl",
          },
        });
      });
    setLoadingOTP(false);
  };

  const handleChange = () => {
    if (validateEmail()) {
      setLoadingEmail(true);
      putApi(
        `api/Profile/profile-update-email?customerId=${
          localStorage.getItem("customerID") || -1
        }&newEmail=${newEmail}`
      )
        .then((data) => {
          postApi(
            `api/Profile/email-verification-code?customerId=${
              localStorage.getItem("customerID") || -1
            }&newEmail=${newEmail}`
          )
            .then((data) => {
              messageApi.open({
                type: "success",
                content: "کد تایید به ایمیل شما ارسال شد!",
                style: {
                  fontFamily: "VazirFD",
                  direction: "rtl",
                },
              });
              setLoadingEmail(false);
              setOTP(true);
            })
            .catch((err) => {
              console.log(err);
              messageApi.open({
                type: "error",
                content: err.response.data || "خطایی رخ داد!",
                style: {
                  fontFamily: "VazirFD",
                  direction: "rtl",
                },
              });
            });
        })
        .catch((err) => {
          setLoadingEmail(false);
          console.log(err);
          messageApi.open({
            type: "error",
            content: err.response.data || "خطایی رخ داد!",
            style: {
              fontFamily: "VazirFD",
              direction: "rtl",
            },
          });
        });
    }
  };

  return (
    <div className="w-full flex justify-center">
      {OTP ? (
        <Form
          disabled={loadingOTP}
          name="basic"
          labelCol={{
            span: 6,
          }}
          wrapperCol={{
            span: 20,
          }}
          style={{
            width: "80vh",
            direction: "ltr",
          }}
          initialValues={{
            remember: false,
          }}
        >
          <Form.Item
            wrapperCol={{
              offset: 0,
              span: 16,
            }}
            label="کد تایید"
            name="otp"
          >
            <Input.OTP length={8} onChange={(text) => handleVerify(text)} />
          </Form.Item>
        </Form>
      ) : (
        <Form
          name="basic"
          disabled={loadingEmail}
          onFinish={handleChange}
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            direction: "ltr",
          }}
          initialValues={{
            remember: false,
          }}
          autoComplete="off"
          layout="inline"
        >
          <Form.Item className="w-96" label="Email" name="email">
            <Input
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
            />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button
              loading={loadingEmail}
              type="primary"
              htmlType="submit"
              className="font w-32"
            >
              تایید
            </Button>
          </Form.Item>
        </Form>
      )}
    </div>
  );
};
export default ChangeEmail;
