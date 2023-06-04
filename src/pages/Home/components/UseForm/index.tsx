import { Form, Input, Modal, Select, Tag, Typography } from "antd";
import React, { useEffect } from "react";
import Loading from "../../../../components/Loading";
import { BOARD_TYPE } from "../../../../utils/constant";

type UseFormPropsType = {
  open: boolean;
  type: UseFormActionType;
  record: BoardItemDataType | undefined;
  onCancel: () => void;
  onSubmit: (value: any, id: string) => Promise<any>;
  formProps: {
    isSubmiting: boolean;
  };
};

const { TextArea } = Input;

const UseForm: React.FC<UseFormPropsType> = ({
  open,
  onCancel,
  onSubmit,
  formProps,
  type,
  record,
}) => {
  const { isSubmiting } = formProps;
  const [form] = Form.useForm();

  const handleCancel = () => {
    form.resetFields();
    onCancel();
  };

  useEffect(() => {
    if (type === "CREATE" || !record) return;
    //!initvalue
    form.setFieldsValue(record);
  }, [open, type, record]);

  return (
    <Modal
      open={open}
      style={{
        top: 20,
      }}
      title={<Typography.Title level={3}>New Board</Typography.Title>}
      onCancel={handleCancel}
      closable
      width={800}
      // footer={null}
      okText="Submit"
      onOk={() => {
        const formValues = form.getFieldsValue();
        onSubmit(formValues, record?.id);
      }}
      okButtonProps={{
        disabled: isSubmiting,
      }}
    >
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        style={{ width: "100%" }}
        form={form}
      >
        <Form.Item
          label="Board type"
          name="board_type"
          rules={[{ required: true }]}
        >
          <Select
            style={{
              width: "50%",
            }}
            placeholder="Select board type"
            defaultValue="scrum"
            options={BOARD_TYPE.map((item, i) => ({
              ...item,
              label: (
                <Tag
                  className="flex justify-center items-center create-form-tag"
                  color={item.color}
                  bordered={false}
                  key={i}
                >
                  {item.label}
                </Tag>
              ),
            }))}
          />
        </Form.Item>

        <Form.Item label="Name" name="name">
          <Input placeholder="Please enter board name" />
        </Form.Item>
        <Form.Item label="Administrators" name="administrators">
          <Input placeholder="Enter administrators name" />
        </Form.Item>

        <Form.Item label="Board description" name="descriptions">
          <TextArea rows={4} placeholder="Enter descriptions" />
        </Form.Item>
      </Form>
      <Loading loading={isSubmiting} />
    </Modal>
  );
};

export default UseForm;
