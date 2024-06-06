import { Menu, Button, ConfigProvider } from "antd";
import { SmileFilled } from "@ant-design/icons";
import { TinyColor } from "@ctrl/tinycolor";
import icon from "../../../assets/logos/icon.png";

const DashHeader = ({ openDonate, openSupport, messageApi }) => {
  const colors2 = ["#fc6076", "#ff9a44", "#ef9d43", "#e75516"];
  const getHoverColors = (colors) =>
    colors.map((color) => new TinyColor(color).lighten(5).toString());
  const getActiveColors = (colors) =>
    colors.map((color) => new TinyColor(color).darken(5).toString());  

  return (
    <Menu
      mode="horizontal"
      className="items-center h-16"
      style={{
        direction: "rtl",
        backgroundColor: "#f5f8fe",
      }}
    >
        
      <img className="w-14 mx-20" src={icon} />
      <Menu
        selectedKeys={[]}
        mode="horizontal"
        className="basis-3/6 flex justify-center rounded-2xl"
      >
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
        <Menu.Item
          onClick={() => {
            openSupport();
          }}
        >
          پشتیبانی
        </Menu.Item>
      </Menu>
      <div className="basis-3/6 flex justify-center">
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

export default DashHeader;
