import React, { useState } from "react";
import {
  Button,
  Checkbox,
  ConfigProvider,
  Form,
  Input,
} from "antd";
import { postApi } from "../../../hooks/api";

const SignUp = ({ setLoginEnable }) => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [repeatPass, setrepeatPass] = useState("");
  const [url, setUrl] = useState("");

  const [OTP, setOTP] = useState(false);
  const [token, setToken] = useState("");

  const resetSignupForm = () => {
    setEmail("");
    setPass("");
    setrepeatPass("");
    setUrl("");
  };

  const handleVerify = (text) => {
    alert(text);
  };

  const handleRegiter = () => {
    // postApi("api/CustomerAuthentication/register", {
    //   email: email,
    //   password: pass,
    //   confirmPassword: repeatPass,
    //   websiteLink: url,
    // })
    //   .then((data) => {
    //     console.log(data);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    console.log(email, pass, repeatPass, url)
    // setLoginEnable(false);
    // setOTP(true);
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Button: {
            fontFamily: "VazirFD",
          },
          Input: {
            fontFamily: "VazirFD",
          },
        },
      }}
    >
      {OTP ? (
        <Form
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
            <Input.OTP
              value={token}
              length={8}
              onChange={(text) => handleVerify(text)}
            />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 10,
              span: 16,
            }}
          >
            <Button
              danger
              onClick={() => {
                resetSignupForm();
                setOTP(false);
                setLoginEnable(true);
                setToken("");
              }}
            >
              انصراف
            </Button>
          </Form.Item>
        </Form>
      ) : (
        <Form
          name="basic"
          labelCol={{
            span: 6,
          }}
          wrapperCol={{
            span: 14,
          }}
          style={{
            width: "80vh",
          }}
          initialValues={{
            remember: false,
          }}
          onFinish={handleRegiter}
        >
          <Form.Item
            label="آدرس ایمیل"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
            style={{
              direction: "ltr",
            }}
          >
            <Input
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </Form.Item>

          <Form.Item
            label="رمز عبور"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
            style={{
              direction: "ltr",
            }}
          >
            <Input.Password
              value={pass}
              onChange={(e) => {
                setPass(e.target.value);
              }}
            />
          </Form.Item>

          <Form.Item
            label="تکرار رمز عبور"
            name="repeatPass"
            rules={[
              {
                required: true,
                message: "Please repeat your password correctly!",
              },
            ]}
            style={{
              direction: "ltr",
            }}
          >
            <Input.Password
              value={repeatPass}
              onChange={(e) => {
                setrepeatPass(e.target.value);
              }}
            />
          </Form.Item>

          <Form.Item
            label="آدرس سایت"
            name="url"
            rules={[
              {
                required: true,
                message: "Please input your website url!",
              },
            ]}
            style={{
              direction: "ltr",
            }}
          >
            <Input
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
              }}
            />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 10,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              ثبت‌نام
            </Button>
          </Form.Item>
        </Form>
      )}
    </ConfigProvider>
  );
};
export default SignUp;
