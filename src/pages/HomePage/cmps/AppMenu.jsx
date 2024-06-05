import { Menu, Button, ConfigProvider, message } from "antd";
import { LockFilled, SmileFilled } from "@ant-design/icons";
import { TinyColor } from "@ctrl/tinycolor";
import "./AppMenu.module.css";
import icon from "../../../assets/logos/icon.png";

const AppMenu = ({ openLS, openDonate, openSupport, openDemo, messageApi }) => {
  const colors2 = ["#fc6076", "#ff9a44", "#ef9d43", "#e75516"];
  const colors3 = ["#40e495", "#30dd8a", "#2bb673"];
  const getHoverColors = (colors) =>
    colors.map((color) => new TinyColor(color).lighten(5).toString());
  const getActiveColors = (colors) =>
    colors.map((color) => new TinyColor(color).darken(5).toString());

  return (
    <Menu
      mode="horizontal"
      className="items-center p-4"
      style={{
        direction: "rtl",
        backgroundColor: "#f5f8fe"
      }}
    >
      <img className="w-14 mx-8" src={icon} />
      <Menu
        selectedKeys={[]}
        mode="horizontal"
        className="basis-5/6 flex justify-center rounded-2xl"
      >
        <Menu.Item
          onClick={() => {
            const element = document.getElementById("usage");
            if (element) {
              element.scrollIntoView({ behavior: "smooth" });
            }
          }}
        >
          موارد استفاده
        </Menu.Item>
        <Menu.Item
          onClick={() => {
            messageApi.open({
              type: "info",
              content: "در حال توسعه هستیم!",
              style: {
                fontFamily: "VazirFD",
                direction: "rtl",
              },
            });
          }}
        >
          وبلاگ
        </Menu.Item>
        <Menu.Item onClick={openDemo}>درخواست دمو</Menu.Item>

        <Menu.Item
          onClick={() => {
            const element = document.getElementById("customers");
            if (element) {
              element.scrollIntoView({ behavior: "smooth" });
            }
          }}
        >
          مشتریان
        </Menu.Item>
        <Menu.Item
          onClick={() => {
            openSupport();
          }}
        >
          پشتیبانی
        </Menu.Item>
      </Menu>
      <div className="mx-8 flex items-center gap-4">
        {/* login button */}
        <ConfigProvider
          theme={{
            components: {
              Button: {
                fontFamily: "VazirFD",
                colorPrimary: `linear-gradient(116deg,  ${colors3.join(", ")})`,
                colorPrimaryHover: `linear-gradient(116deg, ${getHoverColors(
                  colors3
                ).join(", ")})`,
                colorPrimaryActive: `linear-gradient(116deg, ${getActiveColors(
                  colors3
                ).join(", ")})`,
                lineWidth: 0,
              },
            },
          }}
        >
          <Button
            onClick={openLS}
            type="primary"
            size="large"
            icon={<LockFilled />}
          >
            وارد شوید
          </Button>
        </ConfigProvider>
        {/* start free */}
        <ConfigProvider
          theme={{
            components: {
              Button: {
                fontFamily: "VazirFD",
                colorPrimary: `linear-gradient(116deg,  ${colors2.join(", ")})`,
                colorPrimaryHover: `linear-gradient(116deg, ${getHoverColors(
                  colors2
                ).join(", ")})`,
                colorPrimaryActive: `linear-gradient(116deg, ${getActiveColors(
                  colors2
                ).join(", ")})`,
                lineWidth: 0,
              },
            },
          }}
        >
          <Button
            type="primary"
            size="large"
            onClick={openDonate}
            icon={<SmileFilled />}
          >
            حمایت از موقاس
          </Button>
        </ConfigProvider>
      </div>
    </Menu>
  );
};

export default AppMenu;
