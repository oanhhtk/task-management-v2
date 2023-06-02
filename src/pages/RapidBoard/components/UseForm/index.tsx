import { CloudUploadOutlined } from "@ant-design/icons";
import {
  Button,
  Cascader,
  Checkbox,
  DatePicker,
  Form,
  FormInstance,
  Input,
  Modal,
  Select,
  Spin,
  Tag,
  TreeSelect,
} from "antd";
import Dragger from "antd/es/upload/Dragger";
import React from "react";
import Loading from "../../../../components/Loading";
import {
  ISSUE_TYPES_OPTIONS,
  PRIORITY_OPTIONS,
} from "../../../../utils/constant";

type UseFormPropsType = {
  open: boolean;
  onCancel: () => void;
  onSubmit: (value: any) => Promise<any>;
  projectName: string;
  form: FormInstance;
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
  open,
  onCancel,
  onSubmit,
  projectName = "",
  form,
  formProps,
}) => {
  const { isSubmiting } = formProps;
  return (
    <Modal
      open={open}
      style={{
        top: 20,
      }}
      title="Create Task"
      onCancel={onCancel}
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
        title="Create Task"
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
              options={ISSUE_TYPES_OPTIONS.map((item) => ({
                ...item,
                label: (
                  <Tag
                    color={item.color}
                    className="flex justify-center items-center create-form-tag"
                    bordered={false}
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
              options={PRIORITY_OPTIONS.map((item) => ({
                ...item,
                label: (
                  <Tag
                    className="flex justify-center items-center create-form-tag"
                    color={item.color}
                    bordered={false}
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
