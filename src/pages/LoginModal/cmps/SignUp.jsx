import React, { useCallback, useState } from "react";
import { Button, ConfigProvider, Form, Input } from "antd";
import { postApi } from "../../../hooks/api";
import { useCookies } from "react-cookie";

const SignUp = ({ setLoginEnable, messageApi, close }) => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [repeatPass, setrepeatPass] = useState("");
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingOTP, setLoadingOTP] = useState(false);
  const [setCookie] = useCookies(["user"]);

  const [OTP, setOTP] = useState(false);
  const [token, setToken] = useState("");

  const handleVerify = (text) => {
    setLoadingOTP(true);
    postApi(`api/CustomerAuthentication/verify?verificationToken=${text}`)
      .then((data) => {
        messageApi.open({
          type: "success",
          content: "اکانت شما تایید شد!",
          style: {
            fontFamily: "VazirFD",
            direction: "rtl",
          },
        });
        setLoadingOTP(false);
        // login
        setTimeout(() => {
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
              localStorage.setItem("customerId", data.split(" ")[0]);
              setCookie("sessionId", data.split(" ")[1], { path: "/" });
              setLoadingOTP(false);
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
            });
        }, 1000);
        // end
      })
      .catch((err) => {
        messageApi.open({
          type: "error",
          content: "کد وارد شده درست نیست!",
          style: {
            fontFamily: "VazirFD",
            direction: "rtl",
          },
        });
        setLoadingOTP(false);
      });
  };

  const resetForm = useCallback(() => {
    setEmail("");
    setOTP(false);
    setPass("");
    setrepeatPass("");
    setToken("");
    setUrl("");
  }, []);

  const validateInputs = () => {
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

    // Repeat password validation
    if (repeatPass !== pass) {
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

    const urlPattern =
      /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(:\d+)?(\/.*)?$/;
    if (!urlPattern.test(url)) {
      messageApi.open({
        type: "error",
        content: "آدرس سایت معتبر نیست!",
        style: {
          fontFamily: "VazirFD",
          direction: "rtl",
        },
      });
      return false;
    }
    return true;
  };

  const handleRegiter = () => {
    setLoading(true);
    if (validateInputs()) {
      postApi("api/CustomerAuthentication/register", {
        email: email,
        password: pass,
        confirmPassword: repeatPass,
        websiteLink: url,
      })
        .then((data) => {
          postApi(
            `api/CustomerAuthentication/email-verification-token?email=${email}`
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
              setLoginEnable(false);
              setOTP(true);
              setLoading(false);
            })
            .catch((err) => {
              messageApi.open({
                type: "error",
                // content: err.data,
                content: "خطایی رخ داد. دوباره تلاش کنید!",
                style: {
                  fontFamily: "VazirFD",
                  direction: "rtl",
                },
              });
              setLoading(false);
            });
        })
        .catch((err) => {
          messageApi.open({
            type: "error",
            // content: "خطایی رخ داد!",
            content: err.response.data  || "خطایی رخ داد!",
            style: {
              fontFamily: "VazirFD",
              direction: "rtl",
            },
          });
          console.log(err);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
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
                setOTP(false);
                setLoginEnable(true);
                setToken("");
              }}
              style={{
                width: "20vh",
              }}
            >
              انصراف
            </Button>
          </Form.Item>
        </Form>
      ) : (
        <Form
          disabled={loading}
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
              offset: 8,
              span: 16,
            }}
          >
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="w-32"
            >
              ثبت‌نام
            </Button>
          </Form.Item>
        </Form>
      )}
    </ConfigProvider>
  );
};
export default SignUp;
