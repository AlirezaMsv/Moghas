import React, { useEffect, useState } from "react";
import { Button, ConfigProvider, Space, Spin, Table, Popconfirm } from "antd";
import FAQModal from "./FAQModal";
import { deleteApi, getApi } from "../../../hooks/api";
import { QuestionCircleOutlined } from "@ant-design/icons";
const { Column } = Table;

const Contact = ({ messageApi }) => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [reFetch, setReFetch] = useState(false);
  const [record, setRecord] = useState(undefined);

  useEffect(() => {
    setLoading(true);
    getApi(
      `api/CustomerSettings/get-setting?customerId=${localStorage.getItem(
        "customerId"
      )}&type=EMAIL`
    )
      .then((res) => {
        setLoading(false);
        const arr = [];
        res.map((q, i) =>
          arr.push({
            key: q.id,
            question: q.key,
            answer: q.value,
          })
        );
        setData(arr);
      })
      .catch((err) => {
        console.log(err);
        setData([]);
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
  }, [reFetch]);

  const handleDelete = (id) => {
    setLoading(true);
    deleteApi(`api/CustomerSettings/delete-setting?settingId=${id}`)
      .then((res) => {
        setLoading(false);
        setReFetch((prev) => !prev);
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
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Table: {
            fontFamily: "VazirFD",
          },
          Popconfirm: {
            fontFamily: "VazirFD",
          },
          Button: {
            fontFamily: "VazirFD",
          },
          Modal: {
            fontFamily: "VazirFD",
          },
          Input: {
            fontFamily: "VazirFD",
          },
        },
      }}
    >
      <Table
        scroll={{
          x: true,
          y: true,
        }}
        pagination={{
          position: ["none"],
        }}
        loading={loading}
        bordered
        dataSource={data}
      >
        <Column title="نام کاربری" dataIndex="question" key="question" />
        <Column title="ایمیل یا شماره تماس" dataIndex="answer" key="answer" />
        <Column
          title="عملیات"
          key="action"
          render={(_, record) => (
            <Popconfirm
              icon={
                <QuestionCircleOutlined
                  style={{
                    color: "red",
                  }}
                />
              }
              title="حذف سوال"
              description="آیا می‌خواهید این مورد را حذف کنید؟"
              onConfirm={() => handleDelete(record.key)}
              okText="حذف"
              okType="danger"
              cancelText="انصراف"
            >
              <Button className="bg-red-600 text-white">حذف</Button>
            </Popconfirm>
          )}
        />
      </Table>
    </ConfigProvider>
  );
};
export default Contact;
