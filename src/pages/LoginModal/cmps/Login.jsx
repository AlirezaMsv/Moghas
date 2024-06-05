import React, { useState } from "react";
import { Button, Checkbox, ConfigProvider, Form, Input } from "antd";
import { postApi } from "../../../hooks/api";

const Login = ({ setSignupEnable, messageApi, close }) => {
  const [email, setEmail] = useState("");
  const [forgotEmail, setForgotEmail] = useState("abc");
  const [pass, setPass] = useState("");
  const [showForgot, setShowForgot] = useState(false);
  const [OTP, setOTP] = useState(false);
  const [forgotPass, setforgotPass] = useState("");
  const [repeatForgotPass, setRepeatForgotPass] = useState("");
  const [loadingEmail, setLoadingEmail] = useState(false);
  const [loadingLogin, setLoadingLogin] = useState(false);

  const validateLogin = () => {
    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
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
    // Password validation
    if (pass.length < 8) {
      messageApi.open({
        type: "error",
        content: "رمز عبور حداقل باید 8 کاراکتر باشد!",
        style: {
          fontFamily: "VazirFD",
          direction: "rtl",
        },
      });
      return false;
    }

    return true;
  };

  const validatePasswords = () => {
    // Password validation
    if (forgotPass.length < 8) {
      messageApi.open({
        type: "error",
        content: "رمز عبور حداقل باید 8 کاراکتر باشد!",
        style: {
          fontFamily: "VazirFD",
          direction: "rtl",
        },
      });
      return false;
    }

    // Repeat password validation
    if (repeatForgotPass !== forgotPass) {
      messageApi.open({
        type: "error",
        content: "رمزعبور و تکرار آن برابر نیستند!",
        style: {
          fontFamily: "VazirFD",
          direction: "rtl",
        },
      });
      return false;
    }
    return true;
  };

  const validateEmail = () => {
    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
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


  const handleLogin = () => {
    setLoadingLogin(true);
    postApi("api/CustomerAuthentication/login", {
      email: email,
      password: pass,
    })
      .then((data) => {
        messageApi.open({
          type: "success",
          content: "با موفقیت وارد حساب خود شدید!",
          style: {
            fontFamily: "VazirFD",
            direction: "rtl",
          },
        });
        close();
        setLoadingLogin(false);
      })
      .catch((err) => {
        messageApi.open({
          type: "error",
          // content: "خطایی رخ داد!",
          content: err.response.data,
          style: {
            fontFamily: "VazirFD",
            direction: "rtl",
          },
        });
        setLoadingLogin(false);
      });
  };

  const handleForgot = () => {
    setLoadingEmail(true);
    postApi(
      `api/CustomerAuthentication/create-forgotPassword-token?email=${forgotEmail}`
    )
      .then((data) => {
        postApi(
          `api/CustomerAuthentication/email-forgotPassword-token?email=${forgotEmail}`
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
            setOTP(true);
            setLoadingEmail(false);
          })
          .catch((err) => {
            messageApi.open({
              type: "error",
              // content: "خطایی رخ داد!",
              content: err.response.data,
              style: {
                fontFamily: "VazirFD",
                direction: "rtl",
              },
            });
            setLoadingEmail(false);
          });
      })
      .catch((err) => {
        messageApi.open({
          type: "error",
          // content: "خطایی رخ داد!",
          content: err.response.data,
          style: {
            fontFamily: "VazirFD",
            direction: "rtl",
          },
        });
      });
  };

  const handleVerify = (text) => {
    postApi("api/CustomerAuthentication/reset-password", {
      resetPasswordToken: text,
      password: forgotPass,
      confirmPassword: repeatForgotPass,
    })
      .then((data) => {
        messageApi.open({
          type: "success",
          content: "رمز شما تغییر کرد!",
          style: {
            fontFamily: "VazirFD",
            direction: "rtl",
          },
        });
        setOTP(false);
        setShowForgot(false);
      })
      .catch((err) => {
        messageApi.open({
          type: "error",
          // content: "خطایی رخ داد!",
          content: err.response.data,
          style: {
            fontFamily: "VazirFD",
            direction: "rtl",
          },
        });
      });
  };

  const forgotPassForm = () => {
    if (OTP) {
      return (
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
              value={forgotPass}
              onChange={(e) => {
                setforgotPass(e.target.value);
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
              value={repeatForgotPass}
              onChange={(e) => {
                setRepeatForgotPass(e.target.value);
              }}
            />
          </Form.Item>

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
      );
    }

    return (
      <Form
        name="basic"
        onFinish={handleForgot}
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
      >
        <Form.Item
          label="ایمیل"
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
            value={forgotEmail}
            onChange={(e) => setForgotEmail(e.target.value)}
          />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button
            style={{
              width: "20vh",
            }}
            type="primary"
            htmlType="submit"
            onClick={handleForgot}
            loading={loadingEmail}
          >
            تایید
          </Button>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button
            danger
            onClick={() => {
              setShowForgot(false);
              setSignupEnable(true);
              setForgotEmail("");
            }}
            style={{
              width: "20vh",
              margin: "auto",
            }}
          >
            انصراف
          </Button>
        </Form.Item>
      </Form>
    );
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
      {showForgot ? (
        forgotPassForm()
      ) : (
        <Form
          name="basic"
          onFinish={handleLogin}
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
        >
          <Form.Item
            label="ایمیل"
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
            <Input value={email} onChange={(e) => setEmail(e.target.value)} />
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
              onChange={(e) => setPass(e.target.value)}
            />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 10,
              span: 16,
            }}
          >
            <Button
              type="primary"
              htmlType="submit"
              onClick={handleLogin}
              loading={loadingLogin}
            >
              ورود
            </Button>
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 6,
              span: 10,
            }}
          >
            <Button
              onClick={() => {
                setSignupEnable(false);
                setShowForgot(true);
                setForgotEmail("");
              }}
            >
              رمز عبور خود را فراموش کرده‌اید؟
            </Button>
          </Form.Item>
        </Form>
      )}
    </ConfigProvider>
  );
};

export default Login;
