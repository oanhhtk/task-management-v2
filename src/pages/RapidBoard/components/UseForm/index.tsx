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
  TreeSelect,
} from "antd";
import Dragger from "antd/es/upload/Dragger";
import React from "react";
import Loading from "../../../../components/Loading";

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
        onSubmit({});
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
        <Form.Item label="Issue Type" name="disabled" valuePropName="checked">
          <Checkbox checked={true}>Task</Checkbox>
        </Form.Item>
        <Form.Item label="Name">
          <Input placeholder="Please enter task name" />
        </Form.Item>
        <Form.Item label="Priority">
          <Select
            placeholder="Select priority"
            options={[
              {
                value: "low",
                label: "Low",
              },
              {
                value: "hight",
                label: "Hight",
              },
              {
                value: "lowest",
                label: "Lowest",
              },
              {
                value: "medium",
                label: "Medium",
              },
              {
                value: "blocker",
                label: "Blocker",
              },
            ]}
          />
        </Form.Item>

        <Form.Item label="DatePicker">
          <DatePicker
            placeholder="select start date"
            style={{
              width: "100%",
            }}
          />
        </Form.Item>
        <Form.Item label="Descriptions">
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
