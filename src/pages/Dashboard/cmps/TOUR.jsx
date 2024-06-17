import React, { useEffect, useState } from "react";
import {
  Button,
  ConfigProvider,
  Space,
  Steps,
  Table,
  Popconfirm,
  Breadcrumb,
  Tooltip,
} from "antd";
import { deleteApi, getApi } from "../../../hooks/api";
import { QuestionCircleOutlined } from "@ant-design/icons";
import TOURModal from "./TOURModal";
const { Column } = Table;

const TOUR = ({ messageApi }) => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [reFetch, setReFetch] = useState(false);
  const [record, setRecord] = useState(undefined);

  useEffect(() => {
    // load data
    setLoading(true);
    getApi(
      `api/CustomerSettings/get-setting?customerId=${localStorage.getItem(
        "customerId"
      )}&type=TOUR`
    )
      .then((res) => {
        setLoading(false);
        const arr = [];
        res.map((q, i) =>
          arr.push({
            key: q.id,
            name: q.key,
            queue: q.value,
          })
        );
        setData(arr);
      })
      .catch((err) => {
        console.log(err);
        setData([]);
        messageApi.open({
          type: "error",
          // content: "خطایی رخ داد!",
          content: err.response.data || "خطایی رخ داد!",
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
          // content: "خطایی رخ داد!",
          content: err.response.data || "خطایی رخ داد!",
          style: {
            fontFamily: "VazirFD",
            direction: "rtl",
          },
        });
        setLoading(false);
      });
  };

  const handleSteps = (q) => {
    return (
      <Steps
        direction="vertical"
        size="small"
        style={{
          direction: "ltr",
        }}
        items={q}
      />
    );
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
          Steps: {
            fontFamily: "VazirFD",
          },
          Breadcrumb: {
            fontFamily: "VazirFD",
          },
          Tooltip: {
            fontFamily: "VazirFD",
          },
        },
      }}
    >
      <Button
        onClick={() => {
          setRecord(undefined);
          setShowModal(true);
        }}
        className="bg-lime-300 mb-4"
      >
        اضافه کردن رکورد
      </Button>
      {showModal && (
        <TOURModal
          isOpen={showModal}
          setReFetch={setReFetch}
          close={() => setShowModal(false)}
          messageApi={messageApi}
          data={record}
          showData={record ? true : false}
        />
      )}
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
        expandable={{
          expandedRowRender: (record) => (
            <p
              style={{
                margin: 0,
              }}
            >
              {handleSteps(JSON.parse(record.queue))}
            </p>
          ),
          rowExpandable: (record) => record.name !== "Not Expandable",
        }}
      >
        <Column title="نام تور" dataIndex="name" key="name" />
        <Column
          title="محتویات تور"
          dataIndex="queue"
          key="queue"
          render={(_, record) => {
            function itemRender(currentRoute) {
              return (
                <Tooltip
                  overlayInnerStyle={{ direction: "rtl" }}
                  color="cyan"
                  title={
                    <>
                      <div>شناسه: {currentRoute.subTitle}</div>
                      <div>نام مرحله: {currentRoute.title}</div>
                      <div>توضیحات مرحله: {currentRoute.description}</div>
                    </>
                  }
                >
                  <span>{currentRoute.title}</span>
                </Tooltip>
              );
            }

            return (
              <Breadcrumb
                separator=">"
                items={JSON.parse(record.queue)}
                itemRender={itemRender}
              />
            );
          }}
        />
        <Column
          title="عملیات"
          key="action"
          render={(_, record) => (
            <Space size="middle">
              <Button
                onClick={() => {
                  setRecord({
                    id: record.key,
                    name: record.name,
                    queue: record.queue,
                  });
                  setShowModal(true);
                }}
                className="bg-cyan-700 text-white"
              >
                ویرایش
              </Button>
              <Popconfirm
                icon={
                  <QuestionCircleOutlined
                    style={{
                      color: "red",
                    }}
                  />
                }
                title="حذف سوال"
                description="آیا می‌خواهید این تور را حذف کنید؟"
                onConfirm={() => handleDelete(record.key)}
                okText="حذف"
                okType="danger"
                cancelText="انصراف"
              >
                <Button className="bg-red-600 text-white">حذف</Button>
              </Popconfirm>
            </Space>
          )}
        />
      </Table>
    </ConfigProvider>
  );
};
export default TOUR;
