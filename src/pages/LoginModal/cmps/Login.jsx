import React from "react";
import { Button, Checkbox, ConfigProvider, Form, Input } from "antd";
const onFinish = (values) => {
  console.log("Success:", values);
};
const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};
const Login = ({setSignupEnable}) => (
  <ConfigProvider
    theme={{
      components: {
        Button : {
          fontFamily: "VazirFD",
        },
      },
    }}
  >
    <Form
      name="basic"
      labelCol={{
        span: 6,
      }}
      wrapperCol={{
        span: 14,
      }}
      style={{
        width: '80vh',
      }}
      initialValues={{
        remember: false,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="نام کاربری"
        name="username"
        rules={[
          {
            required: true,
            message: "Please input your username!",
          },
        ]}
        style={{
          direction: 'ltr'
        }}
      >
        <Input />
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
          direction: 'ltr'
        }}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 10,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          ورود
        </Button>
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 6,
          span: 10,
        }}
      >
        <Button htmlType="submit">
          رمز عبور خود را فراموش کرده‌اید؟
        </Button>
      </Form.Item>
    </Form>
  </ConfigProvider>
);
export default Login;
