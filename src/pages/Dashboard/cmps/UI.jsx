import React, { useEffect, useState } from "react";
import { Button, ConfigProvider, Space, Table, Popconfirm, Input } from "antd";
import { getApi, putApi } from "../../../hooks/api";
import {
  CommentOutlined,
  DingtalkOutlined,
  DiscordOutlined,
  QuestionCircleOutlined,
  RedditOutlined,
  TwitchOutlined,
  TwitterOutlined,
  WechatOutlined,
  WhatsAppOutlined,
} from "@ant-design/icons";
import UIColorPicker from "./UIColorPicker";
import UISelectList from "./UISelectList";
const { Column } = Table;
const TextArea = Input.TextArea;

const UI = ({ messageApi }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [reFetch, setReFetch] = useState(false);

  const [icon_backgroundColor, setIcon_backgroundColor] = useState("#8e44ad");
  const [icon, setIcon] = useState("CommentOutlined");
  const [iconColor, setIconColor] = useState("#ecf0f1");
  const [size, setSize] = useState("medium");
  const [position, setPosition] = useState("left");
  const [shape, setShape] = useState("circle");
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("");
  const [intro, setIntro] = useState("");
  const [showFaqFirst, setShowFaqFirst] = useState("true");
  const [requireUsername, setRequireUsername] = useState("false");
  const [requirePhone, setRequirePhone] = useState("false");
  const [chat_background, setChat_background] = useState("#8e44ad");

  useEffect(() => {
    // load data
    setLoading(true);
    getApi(
      `api/CustomerSettings/get-setting?customerId=${localStorage.getItem(
        "customerId"
      )}&type=UI`
    )
      .then((res) => {
        setLoading(false);
        const arr = [];
        res.map((q, i) => {
          switch (q.key) {
            case "icon_backgroundColor":
              setIcon_backgroundColor(q.value);
              break;

            case "icon":
              setIcon(q.value);
              break;

            case "iconColor":
              setIconColor(q.value);
              break;

            case "size":
              setSize(q.value);
              break;

            case "position":
              setPosition(q.value);
              break;

            case "shape":
              setShape(q.value);
              break;

            case "title":
              setTitle(q.value);
              break;

            case "status":
              setStatus(q.value);
              break;

            case "intro":
              setIntro(q.value);
              break;

            case "showFaqFirst":
              setShowFaqFirst(q.value);
              break;

            case "requireUsername":
              setRequireUsername(q.value);
              break;

            case "requirePhone":
              setRequirePhone(q.value);
              break;

            case "chat_background":
              setChat_background(q.value);
              break;
          }
          arr.push({
            key: q.id,
            name: q.key,
            value: q.value,
            newValue: q.value,
          });
        });
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

  const getDefault = (title) => {
    switch (title) {
      case "icon_backgroundColor":
        return "#8e44ad";

      case "icon":
        return "CommentOutlined";

      case "iconColor":
        return "#ecf0f1";

      case "size":
        return "medium";

      case "position":
        return "left";

      case "shape":
        return "circle";

      case "title":
        return "";

      case "status":
        return "";

      case "intro":
        return "";

      case "showFaqFirst":
        return "true";

      case "requireUsername":
        return "false";

      case "requirePhone":
        return "false";

      case "chat_background":
        return "#ecf0f1";
    }
  };

  const handleEdit = (record, reset) => {
    setLoading(true);
    putApi(`api/CustomerSettings/update-key-value?settingId=${record.key}`, {
      key: record.name,
      value: reset ? getDefault(record.name) : record.newValue,
    })
      .then((data) => {
        setLoading(false);
        messageApi.open({
          type: "success",
          content: reset ? "با موفقیت ریست شد" : "با موفقیت ذخیره شد!",
          style: {
            fontFamily: "VazirFD",
            direction: "rtl",
          },
        });
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

  const getName = (title) => {
    switch (title) {
      case "icon_backgroundColor":
        return "رنگ پس‌زمینه آیکون ماژول";

      case "icon":
        return "آیکون ماژول";

      case "iconColor":
        return "رنگ آیکون";

      case "size":
        return "اندازه ماژول";

      case "position":
        return "محل قرارگیری ماژول";

      case "shape":
        return "شکل ماژول";

      case "title":
        return "عنوان";

      case "status":
        return "وضعیت";

      case "intro":
        return "مقدمه";

      case "showFaqFirst":
        return "سوالات پرتکرار در ابتدا نشان داده شود؟";

      case "requireUsername":
        return "وارد کردن نام کاربری الزامی است؟";

      case "requirePhone":
        return "وارد کردن شماره تلفن الزامی است؟";

      case "chat_background":
        return "رنگ پس زمینه‌ چت";
    }
  };

  const handleValueColumn = (record) => {
    switch (record.name) {
      case "icon_backgroundColor":
        return (
          <UIColorPicker
            record={record}
            get={icon_backgroundColor}
            set={setIcon_backgroundColor}
          />
        );

      case "icon":
        return (
          <UISelectList
            get={icon}
            set={setIcon}
            record={record}
            h={16}
            options={[
              {
                value: "CommentOutlined",
                label: <CommentOutlined className="text-4xl" />,
              },
              {
                value: "WechatOutlined",
                label: <WechatOutlined className="text-4xl" />,
              },
              {
                value: "DiscordOutlined",
                label: <DiscordOutlined className="text-4xl" />,
              },
              {
                value: "TwitchOutlined",
                label: <TwitchOutlined className="text-4xl" />,
              },
              {
                value: "QuestionCircleOutlined",
                label: <QuestionCircleOutlined className="text-4xl" />,
              },
              {
                value: "WhatsAppOutlined",
                label: <WhatsAppOutlined className="text-4xl" />,
              },
              {
                value: "TwitterOutlined",
                label: <TwitterOutlined className="text-4xl" />,
              },
              {
                value: "DingtalkOutlined",
                label: <DingtalkOutlined className="text-4xl" />,
              },
              {
                value: "RedditOutlined",
                label: <RedditOutlined className="text-4xl" />,
              },
            ]}
          />
        );

      case "iconColor":
        return (
          <UIColorPicker record={record} get={iconColor} set={setIconColor} />
        );

      case "size":
        return (
          <UISelectList
            get={size}
            set={setSize}
            record={record}
            options={[
              {
                value: "small",
                label: "کوچک",
              },
              {
                value: "medium",
                label: "متوسط",
              },
              {
                value: "large",
                label: "بزرگ",
              },
            ]}
          />
        );

      case "position":
        return (
          <UISelectList
            get={position}
            set={setPosition}
            record={record}
            options={[
              {
                value: "left",
                label: "چپ",
              },
              {
                value: "right",
                label: "راست",
              },
            ]}
          />
        );

      case "shape":
        return (
          <UISelectList
            get={shape}
            set={setShape}
            record={record}
            options={[
              {
                value: "circle",
                label: "دایره",
              },
              {
                value: "square",
                label: "مربع",
              },
            ]}
          />
        );

      case "title":
        return title;

      case "status":
        return status;

      case "intro":
        return intro;

      case "showFaqFirst":
        return (
          <UISelectList
            get={showFaqFirst}
            set={setShowFaqFirst}
            record={record}
            options={[
              {
                label: "بله",
                value: "true",
              },
              {
                label: "خیر",
                value: "false",
              },
            ]}
          />
        );

      case "requireUsername":
        return (
          <UISelectList
            get={requireUsername}
            set={setRequireUsername}
            record={record}
            options={[
              {
                label: "بله",
                value: "true",
              },
              {
                label: "خیر",
                value: "false",
              },
            ]}
          />
        );

      case "requirePhone":
        return (
          <UISelectList
            get={requirePhone}
            set={setRequirePhone}
            record={record}
            options={[
              {
                label: "بله",
                value: "true",
              },
              {
                label: "خیر",
                value: "false",
              },
            ]}
          />
        );

      case "chat_background":
        return (
          <UIColorPicker
            record={record}
            get={chat_background}
            set={setChat_background}
          />
        );
    }
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
          Input: {
            fontFamily: "VazirFD",
          },
          Select: {
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
          pageSize: 20,
          position: ["none"],
        }}
        loading={loading}
        bordered
        dataSource={data}
        expandable={{
          expandedRowRender: (record) => {
            if (record.name === "intro") {
              return (
                <TextArea
                  rows={6}
                  allowClear
                  value={intro}
                  onChange={(e) => {
                    setIntro(e.target.value);
                    record.newValue = e.target.value;
                  }}
                />
              );
            } else if (record.name === "title") {
              return (
                <Input
                  allowClear
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                    record.newValue = e.target.value;
                  }}
                />
              );
            } else if (record.name === "status") {
              return (
                <Input
                  allowClear
                  value={status}
                  onChange={(e) => {
                    setStatus(e.target.value);
                    record.newValue = e.target.value;
                  }}
                />
              );
            }
          },
          rowExpandable: (record) =>
            record.name === "intro" ||
            record.name === "status" ||
            record.name === "title",
        }}
      >
        {/*  */}
        <Column
          title="عنوان واسط کاربری"
          dataIndex="name"
          key="name"
          render={(_, record) => {
            return <>{getName(record.name)}</>;
          }}
        />
        {/*  */}
        <Column
          width="40%"
          title="مقدار"
          dataIndex="value"
          key="value"
          render={(_, record) => {
            return (
              <p
                className="flex justify-center"
                style={{
                  fontFamily:
                    record.name === "intro" ||
                    record.name === "title" ||
                    record.name === "status"
                      ? "VazirFD"
                      : "sans-serif",
                }}
              >
                {handleValueColumn(record)}
              </p>
            );
          }}
        />
        <Column
          title="عملیات"
          key="action"
          render={(_, record) => (
            <Space size="middle">
              {/* // edit */}
              <Button
                onClick={() => {
                  handleEdit(record, false);
                }}
                className="bg-green-600 text-white"
              >
                ذخیره
              </Button>

              {/* // reset */}
              <Popconfirm
                icon={
                  <QuestionCircleOutlined
                    style={{
                      color: "red",
                    }}
                  />
                }
                title=""
                description="مقدار این فیلد به حالت پیش‌فرض تغییر پیدا می‌کند"
                onConfirm={() => {
                  handleEdit(record, true);
                  switch (title) {
                    case "icon_backgroundColor":
                      return setIcon_backgroundColor(
                        getDefault("icon_backgroundColor")
                      );

                    case "icon":
                      return setIcon(getDefault("icon"));

                    case "iconColor":
                      return setIconColor(getDefault("iconColor"));

                    case "size":
                      return setSize(getDefault("size"));

                    case "position":
                      return setPosition(getDefault("position"));

                    case "shape":
                      return setShape(getDefault("shape"));

                    case "title":
                      return setTitle(getDefault("title"));

                    case "status":
                      return setStatus(getDefault("status"));

                    case "intro":
                      return setIntro(getDefault("intro"));

                    case "showFaqFirst":
                      return setShowFaqFirst(getDefault("showFaqFirst"));

                    case "requireUsername":
                      return setRequireUsername(getDefault("requireUsername"));

                    case "requirePhone":
                      return setRequirePhone(getDefault("requirePhone"));

                    case "chat_background":
                      return setChat_background(getDefault("chat_background"));
                  }
                }}
                okText="تایید"
                okType="danger"
                cancelText="انصراف"
              >
                <Button className="bg-red-600 text-white">ریست</Button>
              </Popconfirm>
            </Space>
          )}
        />
      </Table>
    </ConfigProvider>
  );
};
export default UI;
