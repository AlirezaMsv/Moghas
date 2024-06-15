import { Form, Input, Modal, Button } from "antd";
import { useState, useEffect } from "react";

const EditStepModal = ({ isOpen, close, data, queue, setQueue, index, setCurrentStep }) => {
  const [id, setId] = useState(data.subTitle);
  const [title, setTitle] = useState(data.title);
  const [desc, setDesc] = useState(data.description);

  useEffect(() => {
    if (data) {
      setId(data.subTitle);
      setTitle(data.title);
      setDesc(data.description);
    }
  }, [data]);

  const handleSubmit = () => {
    const arr = queue.map((s, i) => {
      if (i === index) {
        return {
          title: title,
          subTitle: id,
          description: desc,
        };
      } else return s;
    });
    setQueue(arr);
    setCurrentStep(arr[index])
    close();
  };

  return (
    <Modal
      centered
      footer={null}
      title={"ویرایش اطلاعات مرحله"}
      open={isOpen}
      onCancel={close}
    >
      <Form
        name="basic"
        onFinish={handleSubmit}
        labelCol={{
          span: 6,
        }}
        wrapperCol={{
          span: 14,
        }}
        className="mx-auto"
      >
        <Form.Item
          label="شناسه المان"
          name="id"
          initialValue={id}
          style={{
            direction: "rtl",
          }}
        >
          <Input
            style={{
              direction: "ltr",
            }}
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
        </Form.Item>

        <Form.Item
          label="عنوان مرحله"
          name="title"
          initialValue={title}
          style={{
            direction: "rtl",
          }}
        >
          <Input value={title} onChange={(e) => setTitle(e.target.value)} />
        </Form.Item>

        <Form.Item
          label="توضیحات مرحله"
          name="desc"
          initialValue={desc}
          style={{
            direction: "rtl",
          }}
        >
          <Input value={desc} onChange={(e) => setDesc(e.target.value)} />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 7,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit" className="w-48">
            تایید
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditStepModal;
