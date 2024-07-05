import React, { useEffect, useState } from "react";
import { Statistic, Row, Col, ConfigProvider, Spin } from "antd";
import CanvasJSReact from "@canvasjs/react-charts";
import { getApi } from "../../../hooks/api";
import jalaali from "jalaali-js";

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const Report = ({ messageApi }) => {
  const colors = ["#3f8600", "#8e44ad", "#f39c12", "#2980b9"];
  const [amar, setAmar] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pieData, setPieData] = useState([]);
  const [lineData, setLineData] = useState([]);

  useEffect(() => {
    const arr = [];
    const obj = {};
    setLoading(true);
    getApi(
      `api/ChatList/get-finished-chats?customerId=${localStorage.getItem(
        "customerId"
      )}`
    )
      .then((data) => {
        data.map((c) => {
          if (obj[convertToJalali(c.createdAt)]) {
            obj[convertToJalali(c.createdAt)] =
              obj[convertToJalali(c.createdAt)] + 1;
          } else {
            obj[convertToJalali(c.createdAt)] = 1;
          }
        });
        arr.push({
          title: "چت‌های بسته",
          value: data.length,
        });

        getApi(
          `api/ChatList/get-unfinished-chats?customerId=${localStorage.getItem(
            "customerId"
          )}`
        )
          .then((data) => {
            data.map((c) => {
              if (obj[convertToJalali(c.createdAt)]) {
                obj[convertToJalali(c.createdAt)] =
                  obj[convertToJalali(c.createdAt)] + 1;
              } else {
                obj[convertToJalali(c.createdAt)] = 1;
              }
            });
            arr.push({
              title: "چت‌های باز",
              value: data.length,
            });

            getApi(
              `api/Chat/get-rates?customerId=${localStorage.getItem(
                "customerId"
              )}`
            )
              .then((data) => {
                const chArr = [];
                chArr.push({
                  label: "خیلی بد",
                  y: data.rate1,
                  toolTipContent: `نفر ${data.rate1}`,
                });
                chArr.push({
                  label: "بد",
                  y: data.rate2,
                  toolTipContent: `نفر ${data.rate2}`,
                });
                chArr.push({
                  label: "متوسط",
                  y: data.rate3,
                  toolTipContent: `نفر ${data.rate3}`,
                });
                chArr.push({
                  label: "خوب",
                  y: data.rate4,
                  toolTipContent: `نفر ${data.rate4}`,
                });
                chArr.push({
                  label: "خیلی خوب",
                  y: data.rate5,
                  toolTipContent: `نفر ${data.rate5}`,
                });
                setPieData(chArr);
                setLineData(
                  Object.keys(obj)
                    .map((e) => ({
                      label: e,
                      y: obj[e],
                      toolTipContent: `${obj[e]}`,
                    }))
                    .sort((a, b) => {
                      if (a.label > b.label) return 1;
                      if (a.label < b.label) return -1;
                      if (a.label === b.label) return 0;
                    })
                );
                let sum = 0;
                sum += data.rate1;
                sum += data.rate2 * 2;
                sum += data.rate3 * 3;
                sum += data.rate4 * 4;
                sum += data.rate5 * 5;
                sum /=
                  data.rate1 +
                  data.rate2 +
                  data.rate3 +
                  data.rate4 +
                  data.rate5;
                sum = sum.toFixed(2);
                arr.push({
                  title: "رضایت کاربران",
                  value: `${sum} / 5`,
                });
                setLoading(false);
                setAmar(arr);
              })
              .catch((err) => {
                console.log(err);
                messageApi.open({
                  type: "error",
                  content: err?.response?.data || "خطایی رخ داد!",
                  style: {
                    fontFamily: "VazirFD",
                    direction: "rtl",
                  },
                });
              });
          })
          .catch((err) => {
            console.log(err);
            messageApi.open({
              type: "error",
              content: err?.response?.data || "خطایی رخ داد!",
              style: {
                fontFamily: "VazirFD",
                direction: "rtl",
              },
            });
          });
      })
      .catch((err) => {
        console.log(err);
        messageApi.open({
          type: "error",
          content: err?.response?.data || "خطایی رخ داد!",
          style: {
            fontFamily: "VazirFD",
            direction: "rtl",
          },
        });
      });
  }, []);

  const PieChart = () => {
    const options = {
      animationEnabled: true,
      title: {
        text: "نمودار امتیازها",
        fontFamily: "VazirFD",
        fontSize: 16,
      },
      toolTip: {
        fontFamily: "VazirFD",
        fontSize: 10,
      },

      data: [
        {
          type: "pie", // تغییر نوع نمودار به دایره‌ای (Pie)
          startAngle: 90,
          indexLabelFontSize: "12",
          indexLabelFontFamily: "VazirFD",
          indexLabel: "{label}",
          dataPoints: pieData,
        },
      ],
    };

    return (
      <div>
        <CanvasJSChart options={options} />
      </div>
    );
  };

  const LineChart = () => {
    const options = {
      animationEnabled: true,
      title: {
        text: "تعداد چت در هر روز",
        fontFamily: "VazirFD",
        fontSize: 16,
      },
      toolTip: {
        fontFamily: "VazirFD",
        fontSize: 12,
      },
      axisY: {
        title: "تعداد چت ها",
        titleFontFamily: "VazirFD",
        labelFontFamily: "VazirFD",
        // valueFormatString: "M"
      },
      axisX: {
        title: "",
        titleFontFamily: "VazirFD",
        labelFontFamily: "VazirFD",
        // valueFormatString: "M"
      },
      data: [
        {
          type: "spline",
          dataPoints: lineData,
        },
      ],
    };
    return (
      <div className="my-4">
        <CanvasJSChart options={options} />
      </div>
    );
  };

  const convertToJalali = (gregorianDate) => {
    const date = new Date(gregorianDate);
    const jalaliDate = jalaali.toJalaali(
      date.getFullYear(),
      date.getMonth() + 1,
      date.getDate()
    );

    // Format the Jalali date and time as desired
    return `${jalaliDate.jy}/${jalaliDate.jm}/${jalaliDate.jd}`;
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Statistic: {
            fontFamily: "VazirFD",
          },
        },
      }}
    >
      {loading ? (
        <Spin />
      ) : (
        <>
          <div className="flex flex-wrap">
            {/* // chart */}
            <div className="bg-white rounded-lg shadow-lg mx-4 p-6 flex-auto w-3/6">
              {PieChart()}
            </div>
            {/* // statistic */}
            <div className="bg-white p-6 rounded-lg shadow-lg flex-auto w-2/6">
              <h2 className="text-center text-lg font-bold mb-4 font">آمار</h2>
              <Row gutter={[16, 16]}>
                {amar.map((item, index) => (
                  <Col span={8} key={index} className="text-center">
                    <Statistic
                      title={
                        <span className="text-blue-500 text-sm">
                          {item.title}
                        </span>
                      }
                      value={item.value}
                      valueStyle={{
                        color: colors[index % 4],
                        fontSize: "20px",
                        direction: "rtl",
                      }}
                    />
                  </Col>
                ))}
              </Row>
            </div>
          </div>
          <div>{LineChart()}</div>
        </>
      )}
    </ConfigProvider>
  );
};

export default Report;
