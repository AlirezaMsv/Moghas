import React from "react";
import { Button, ConfigProvider, Space, Table } from "antd";
const { Column } = Table;
const data = [
  {
    key: "1",
    firstName: "John",
    lastName: "Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "2",
    firstName: "Jim",
    lastName: "Green",
    age: 42,
    address: "London No. 1 Lake Park",
    tags: ["loser"],
  },
  {
    key: "3",
    firstName: "Joe",
    lastName: "Black",
    age: 32,
    address: "Sydney No. 1 Lake Park",
    tags: ["cool", "teacher"],
  },
];
const UI = ({ messageApi }) => (
  <ConfigProvider
    theme={{
      components: {
        Table: {
          fontFamily: "VazirFD",
        },
        Button: {
          fontFamily: "VazirFD",
        },
      },
    }}
  >
    <Table
      pagination={{
        position: ["none"],
      }}
      bordered
      dataSource={data}
      expandable={{
        expandedRowRender: (record) => (
          <p
            style={{
              margin: 0,
            }}
          >
            {record.description}
          </p>
        ),
        rowExpandable: (record) => record.name !== "Not Expandable",
      }}
    >
      <Column title="عنوان تنظیمات" dataIndex="question" key="question" />
      <Column title="مقدار" dataIndex="answer" key="answer" />
      <Column
        title="Action"
        key="action"
        render={(_, record) => (
          <Space size="middle">
            <Button className="bg-cyan-700 text-white">ویرایش</Button>
            <Button className="bg-red-600 text-white">ریست</Button>
          </Space>
        )}
      />
    </Table>
  </ConfigProvider>
);
export default UI;
