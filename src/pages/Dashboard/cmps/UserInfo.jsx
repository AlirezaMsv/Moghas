import { useEffect, useState } from "react";
import { getApi } from "../../../hooks/api";
import style from "./userprofile.module.css";
import jalaali from "jalaali-js";
import { Spin } from "antd";

const UserInfo = ({ messageApi }) => {
  const [id, setID] = useState("");
  const [email, setEmail] = useState("");
  const [url, setUrl] = useState("");
  const [verificationData, setVerificationData] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getApi(`api/Profile/get-customer-profile?customerId=${localStorage.getItem("customerId")}`)
      .then((data) => {
        setID(data.id);
        setEmail(data.email);
        setUrl(data.websiteLink);
        setVerificationData(convertToJalali(data.verifiedAt));
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
  }, []);

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

  return (
    <div className={style.informations}>
      {loading ? (
        <Spin />
      ) : (
        <>
          <div className={style.box}>
            <p>{`شناسه: ${id}`}</p>
          </div>
          <div className={style.box}>
            <p>{`آدرس ایمیل: ${email}`}</p>
          </div>
          <div className={style.box}>
            <p>{`آدرس وبسایت: ${url}`}</p>
          </div>
          <div className={style.box}>
            <p>{`تاریخ احراز هویت: ${verificationData}`}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default UserInfo;
