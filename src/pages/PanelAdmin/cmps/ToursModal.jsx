import { Modal, ConfigProvider, Steps, Table, Button } from "antd";
import { useEffect, useState } from "react";
import { getApi } from "../../../hooks/api";

const TourModal = ({
  isOpen,
  close,
  messageApi,
  setSeletedTour,
  setTourName,
}) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const { Column } = Table;

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
          content: "خطایی رخ داد!",
          style: {
            fontFamily: "VazirFD",
            direction: "rtl",
          },
        });
        setLoading(false);
      });
  }, []);

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

  const handleSend = (tour) => {
    setTourName(tour.name);
    setSeletedTour(tour.queue);
    close();
  };

  return (
    <>
      <ConfigProvider
        theme={{
          components: {
            Modal: {
              fontFamily: "VazirFD",
            },
            Button: {
              fontFamily: "VazirFD",
            },
            Table: {
              fontFamily: "VazirFD",
            },
            Steps: {
              fontFamily: "VazirFD",
            },
          },
        }}
      >
        <Modal
          title={
            <div
              style={{
                textAlign: "center",
                width: "100%",
              }}
            >
              تورهای ساخته شده
            </div>
          }
          onCancel={close}
          open={isOpen}
          footer={[]}
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
              title="عملیات"
              key="action"
              render={(_, record) => (
                <Button
                  onClick={() => handleSend(record)}
                  className="bg-green-500 text-white"
                >
                  ارسال
                </Button>
              )}
            />
          </Table>
        </Modal>
      </ConfigProvider>
    </>
  );
};
export default TourModal;
