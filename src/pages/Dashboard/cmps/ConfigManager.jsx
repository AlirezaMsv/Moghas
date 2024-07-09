import { useEffect, useState } from "react";
import { getApi, postApi } from "../../../hooks/api";
import { useCookies } from "react-cookie";
import { Form, Input, Button, ConfigProvider } from "antd";
import style from "./userprofile.module.css";
import jalaali from "jalaali-js";

const ConfigManager = ({ messageApi }) => {
  const [cookies] = useCookies(["user"]);
  const [hasConfig, setHasConfig] = useState(false);
  const [configUsername, setConfigUsername] = useState();
  const [configCreatedAt, setConfigCreatedAt] = useState();
  const [configExpired, setConfiigExpired] = useState();
  const [reFetch, setReFetch] = useState(false);

  const [username, setUsername] = useState("");
  const [pass, setPass] = useState("");
  const [repeatPass, setRepeatPass] = useState("");
  const [loading, setLoading] = useState(false);

  const convertToJalali = (gregorianDate) => {
    const date = new Date(gregorianDate);
    const jalaliDate = jalaali.toJalaali(
      date.getFullYear(),
      date.getMonth() + 1,
      date.getDate()
    );

    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    // Format the Jalali date and time as desired
    return `${hours}:${minutes} - ${jalaliDate.jy}/${jalaliDate.jm}/${jalaliDate.jd}`;
  };

  function getCurrentDateTimeFormatted() {
    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");
    const milliseconds = String(now.getMilliseconds()).padStart(3, "0");
    const microseconds = String(now.getTime() % 1000).padStart(3, "0"); // Assuming microseconds are derived from milliseconds

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}${microseconds}`;
  }

  useEffect(() => {
    getApi(`api/Config/get-config?browserToken=${cookies.sessionId}`)
      .then((data) => {
        if (data.configExpires < getCurrentDateTimeFormatted()) {
          setHasConfig(false);
          return;
        }
        if (data.configCreatedAt) {
          setHasConfig(true);
          setConfigUsername(data.configUsername);
          setConfigCreatedAt(convertToJalali(data.configCreatedAt));
          setConfiigExpired(convertToJalali(data.configExpires));
        }
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
      });
  }, [reFetch]);

  const handleSubmit = () => {
    if (validateInputs()) {
      setLoading(true);
      postApi(`api/Config/config-register`, {
        browserToken: cookies.sessionId,
        username: username,
        password: pass,
        confirmPassword: repeatPass,
      })
        .then((data) => {
          messageApi.open({
            type: "success",
            content: "کانفیگ شما با موفیت ساخته شد!",
            style: {
              fontFamily: "VazirFD",
              direction: "rtl",
            },
          });
          setReFetch((prev) => !prev);
          setLoading(false);
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
  };

  const validateInputs = () => {
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
    return true;
  };

  return hasConfig ? (
    <div className={style.informations}>
      <div className={style.box}>
        <p>{`نام کاربری بسته: ${configUsername}`}</p>
      </div>
      <div className={style.box}>
        <p>{`تاریخ ایجاد بسته: ${configCreatedAt}`}</p>
      </div>
      <div className={style.box}>
        <p>{`تاریخ پایان بسته: ${configExpired}`}</p>
      </div>
    </div>
  ) : (
    <ConfigProvider
      theme={{
        components: {
          Button: {
            fontFamily: "VazirFD",
          },
        },
      }}
    >
      <Form
        disabled={loading}
        onFinish={handleSubmit}
        labelCol={{
          span: 6,
        }}
        wrapperCol={{
          span: 14,
        }}
        className="w-1/2 mx-auto"
        initialValues={{
          remember: false,
        }}
      >
        <Form.Item
          label="نام کاربری"
          name="username"
          style={{
            direction: "ltr",
          }}
        >
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Item>

        <Form.Item
          label="رمز عبور"
          name="password"
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
          label="تکرار رمز عبور"
          name="repeatPassword"
          style={{
            direction: "ltr",
          }}
        >
          <Input.Password
            value={repeatPass}
            onChange={(e) => setRepeatPass(e.target.value)}
          />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 7,
            span: 16,
          }}
        >
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            className="w-48"
          >
            تایید
          </Button>
        </Form.Item>
      </Form>
    </ConfigProvider>
  );
};

export default ConfigManager;
