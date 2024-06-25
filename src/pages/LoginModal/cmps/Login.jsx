import React, { useState } from "react";
import { Button, ConfigProvider, Form, Input } from "antd";
import { postApi } from "../../../hooks/api";
import { useCookies } from "react-cookie";

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
  const [loadingPassword, setLoadingPassword] = useState(false);
  const [cookies, setCookie] = useCookies(["user"]);

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
    if (!emailPattern.test(forgotEmail)) {
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
    if (validateLogin()) {
      setLoadingLogin(true);
      postApi("api/CustomerAuthentication/login", {
        email: email,
        password: pass,
      })
        .then((data) => {
          // set cookie and customr ID
          setLoadingLogin(false);
          localStorage.setItem("customerId", data.split(" ")[0]);
          setCookie("sessionId", data.split(" ")[1], { path: "/" });
          messageApi.open({
            type: "success",
            content: "با موفقیت وارد حساب خود شدید!",
            style: {
              fontFamily: "VazirFD",
              direction: "rtl",
            },
          });
          setTimeout(() => {
            window.location.replace("/dashboard");
          }, 1000);
          close();
        })
        .catch((err) => {
          console.log(err);
          setLoadingLogin(false);
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

  const handleForgot = () => {
    setLoadingEmail(true);
    if (validateEmail()) {
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
            content: err.response.data || "خطایی رخ داد!",
            style: {
              fontFamily: "VazirFD",
              direction: "rtl",
            },
          });
          setLoadingEmail(false);
        });
    } else {
      setLoadingEmail(false);
    }
  };

  const handleVerify = (text) => {
    setLoadingPassword(true);
    if (validatePasswords()) {
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
          setLoadingPassword(false);
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
          setLoadingPassword(false);
        });
    } else {
      setLoadingPassword(false);
    }
  };

  const forgotPassForm = () => {
    if (OTP) {
      return (
        <Form
          disabled={loadingPassword}
          name="basic"
          labelCol={{
            span: 6,
          }}
          wrapperCol={{
            span: 20,
          }}
          style={{
            direction: "ltr",
          }}
          className="mx-auto"
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
        disabled={loadingEmail}
        name="basic"
        onFinish={handleForgot}
        labelCol={{
          span: 6,
        }}
        wrapperCol={{
          span: 14,
        }}
        className="mx-auto"
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
              setEmail("");
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
          disabled={loadingLogin}
          onFinish={handleLogin}
          labelCol={{
            span: 6,
          }}
          wrapperCol={{
            span: 14,
          }}
          className="mx-auto"
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
              offset: 8,
              span: 16,
            }}
          >
            <Button
              type="primary"
              htmlType="submit"
              loading={loadingLogin}
              className="w-32"
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
