import React, { useState } from "react";
import { Button, Form, Input } from "antd";
import { putApi } from "../../../hooks/api";

const ChangePass = ({ messageApi, setSelected }) => {
  const [pass, setPass] = useState("");
  const [repeatPass, setRepeatPass] = useState("");

  const handleChange = () => {
    if (validatePasswords()) {
      putApi(
        `api/Profile/profile-update-password?customerId=${localStorage.getItem(
          "customerId"
        )}&newPassword=${pass}`
      )
        .then((data) => {
          setSelected("1");
          messageApi.open({
            type: "success",
            content: "پسورد شما تغییر کرد!",
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
    }
  };

  const validatePasswords = () => {
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

  return (
    <Form
      layout="inline"
      onFinish={handleChange}
      name="basic"
      labelCol={{
        span: 10,
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
    >
      <Form.Item label="New Password" name="pass" className="mx-12">
        <Input.Password
          className="w-48 mx-2"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />
      </Form.Item>

      <Form.Item label="Repeat New Password" name="repeatPass" className="mx-12">
        <Input.Password
          className="w-48 mx-2"
          value={repeatPass}
          onChange={(e) => setRepeatPass(e.target.value)}
        />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 4,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit" className="font w-32">
          تایید
        </Button>
      </Form.Item>
    </Form>
  );
};
export default ChangePass;
