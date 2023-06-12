import { CloudUploadOutlined } from "@ant-design/icons";
import { Form, FormInstance, Input, Modal, Select, Tag } from "antd";
import Dragger from "antd/es/upload/Dragger";
import React, { useEffect } from "react";
import Loading from "../../../../components/Loading";
import {
  ISSUE_TYPES_OPTIONS,
  PRIORITY_OPTIONS,
} from "../../../../utils/constant";

type UseFormPropsType = {
  open: boolean;
  type: UseFormActionType;
  record?: {
    content: TaskItemType | undefined;
    id: string;
  };
  onCancel: () => void;
  onSubmit: (value: any) => Promise<any>;
  projectName: string;
  title: string;
  formProps: {
    isSubmiting: boolean;
  };
};

const { TextArea } = Input;

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const UseForm: React.FC<UseFormPropsType> = ({
  title,
  open,
  onCancel,
  onSubmit,
  projectName = "",
  formProps,
  record,
  type,
}) => {
  const { isSubmiting } = formProps;
  const [form] = Form.useForm();

  const handleCancel = () => {
    form.resetFields();
    onCancel();
  };

  useEffect(() => {
    if (!record || type === "CREATE") return;

    console.log(record, type);
    form.setFieldsValue(record?.content);
  }, [record, open, type]);

  return (
    <Modal
      open={open}
      style={{
        top: 20,
      }}
      title={title}
      onCancel={handleCancel}
      closable
      width={800}
      // footer={null}
      okText="Submit"
      onOk={() => {
        const formValues = form.getFieldsValue();
        onSubmit(formValues);
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
        <Form.Item label="Project">
          <p
            style={{
              fontWeight: 700,
              textTransform: "uppercase",
            }}
          >
            {projectName}
          </p>
        </Form.Item>

        <Form.Item style={{ marginBottom: 0 }} label="Issue type">
          <Form.Item
            name="issue_type"
            rules={[{ required: true }]}
            style={{ display: "inline-block", width: "calc(50% - 8px)" }}
          >
            <Select
              placeholder="Select issue type"
              value="task"
              options={ISSUE_TYPES_OPTIONS.map((item, i) => ({
                ...item,
                label: (
                  <Tag
                    color={item.color}
                    className="flex justify-center items-center create-form-tag"
                    bordered={false}
                    key={i}
                  >
                    {item.label}
                  </Tag>
                ),
              }))}
            />
          </Form.Item>
          <Form.Item
            label="Priority"
            name="priority"
            rules={[{ required: true }]}
            style={{
              display: "inline-block",
              width: "calc(50% - 8px)",
              margin: "0 8px",
            }}
          >
            <Select
              placeholder="Select priority"
              options={PRIORITY_OPTIONS.map((item, i) => ({
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
        </Form.Item>

        <Form.Item label="Name" name="name">
          <Input placeholder="Please enter task name" />
        </Form.Item>

        <Form.Item label="Descriptions" name="descriptions">
          <TextArea rows={4} placeholder="Enter descriptions" />
        </Form.Item>
        <Form.Item
          label="Upload"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Dragger>
            <span className="ant-upload-drag-icon mr-2">
              <CloudUploadOutlined
                style={{
                  fontSize: "16px",
                }}
              />
            </span>
            <span className="ant-upload-text">
              Drop files to attach, or browers
            </span>
          </Dragger>
        </Form.Item>
      </Form>
      <Loading loading={isSubmiting} />
    </Modal>
  );
};

export default UseForm;
