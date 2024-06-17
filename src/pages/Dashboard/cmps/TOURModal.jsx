import React, { useEffect, useState } from "react";
import { Modal as AntModal, Button, Flex, Input, Steps } from "antd";
import { postApi, putApi } from "../../../hooks/api";
import EditStepModal from "./EditStepModal";

function FAQModal({
  isOpen,
  close,
  showData = false,
  data,
  messageApi,
  setReFetch,
}) {
  const [name, setName] = useState("");
  const [currentStep, setCurrentStep] = useState();
  const [currentStepIndex, setCurrentStepIndex] = useState();
  const [showStepModal, setShowStepModal] = useState(false);
  const [queue, setQueue] = useState([]);
  const [loading, setLoading] = useState(false);
  const [disabled, setDisable] = useState(false);

  const handleAddTOUR = () => {
    if (showData) {
      // edit
      setLoading(true);
      putApi(`api/CustomerSettings/update-key-value?settingId=${data.id}`, {
        key: name,
        value: JSON.stringify(queue),
      })
        .then((data) => {
          setLoading(false);
          messageApi.open({
            type: "success",
            content: "با موفقیت ویرایش شد!",
            style: {
              fontFamily: "VazirFD",
              direction: "rtl",
            },
          });
          setReFetch((prev) => !prev);
          close();
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
    } else {
      // add
      if (name !== "" && queue.length !== 0) {
        postApi(`api/CustomerSettings/insert-setting`, {
          customerId: localStorage.getItem("customerId"),
          type: "TOUR",
          key: name,
          value: JSON.stringify(queue),
        })
          .then((data) => {
            setLoading(false);
            messageApi.open({
              type: "success",
              content: "با موفقیت درج شد!",
              style: {
                fontFamily: "VazirFD",
                direction: "rtl",
              },
            });
            setReFetch((prev) => !prev);
            close();
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
      } else {
        messageApi.open({
          type: "error",
          content:
            name === ""
              ? "یک نام برای تور خود انتخاب کنید."
              : "تور شما حداقل باید شامل یک مرحله باشد!",
          style: {
            fontFamily: "VazirFD",
            direction: "rtl",
          },
        });
      }
    }
  };

  const addStep = () => {
    setDisable(false);
    const arr = [];
    queue.map((s) => arr.push(s));
    arr.push({
      title: "عنوان مرحله",
      subTitle: "شناسه المان در صفحه",
      description: "توضیحات",
    });
    setQueue(arr);
    setCurrentStepIndex(arr.length - 1);
    setCurrentStep(arr[arr.length - 1]);
    setShowStepModal(true);
  };
  const deleteStep = () => {
    setDisable(true);
    setQueue((prev) => prev.filter((q, i) => i !== currentStepIndex));
  };

  useEffect(() => {
    // load data
    if (showData) {
      setName(data.name);
      setQueue(JSON.parse(data.queue));
    } else {
      setName("");
      setQueue([]);
    }
  }, []);

  const handleSteps = () => {
    const onChange = (value) => {
      setDisable(false);
      setCurrentStepIndex(value);
      setCurrentStep(queue[value]);
      setShowStepModal(true);
    };

    return (
      <Steps
        onChange={onChange}
        current={currentStepIndex}
        direction="vertical"
        size="small"
        style={{
          direction: "ltr",
        }}
        items={queue}
      />
    );
  };

  return (
    <AntModal
      centered
      closable={false}
      footer={[
        <Button key="back" onClick={close} disabled={loading}>
          انصراف
        </Button>,
        <Button
          loading={loading}
          key="submit"
          onClick={handleAddTOUR}
          type="primary"
        >
          {showData ? "ویرایش" : "ذخیره"}
        </Button>,
      ]}
      title={showData ? "ویرایش تور" : "اضافه کردن تور"}
      open={isOpen}
      onCancel={close}
    >
      {showStepModal && (
        <EditStepModal
          isOpen={showStepModal}
          close={() => setShowStepModal(false)}
          data={currentStep}
          queue={queue}
          setQueue={setQueue}
          index={currentStepIndex}
          setCurrentStep={setCurrentStep}
        />
      )}
      <Flex vertical gap={20}>
        <Input
          placeholder="نام تور"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Button onClick={addStep} className="bg-lime-600 mb-4 text-white">
          اضافه کردن مرحله
        </Button>
        {handleSteps()}
        <Button
          onClick={deleteStep}
          disabled={queue.length === 0 || disabled}
          className="bg-red-600 text-white"
        >
          حذف مرحله انتخاب شده
        </Button>
        <Button
          onClick={() => setShowStepModal(true)}
          disabled={queue.length === 0 || disabled}
          className="bg-blue-600 text-white"
        >
          ویرایش مرحله انتخاب شده
        </Button>
      </Flex>
    </AntModal>
  );
}

export default FAQModal;
