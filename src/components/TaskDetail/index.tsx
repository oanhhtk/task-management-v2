import { CaretRightOutlined, CloudUploadOutlined } from "@ant-design/icons";
import { Button, Collapse, Descriptions, Spin, Tag, Typography } from "antd";
import Dragger from "antd/es/upload/Dragger";
import React, { useEffect, useState } from "react";
import { COLUMS_TASK_LIST_ENUM } from "../../utils/constant";

type TaskDetailType = {
  data: TaskItemType | undefined;
};

const panelStyle = {
  marginBottom: 24,
  border: "none",
};
const TaskDetail: React.FC<TaskDetailType> = ({ data }) => {
  if (!data) return <></>;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, [data]);

  return (
    <div>
      {loading ? (
        <div
          className="flex justify-center items-center"
          style={{
            minHeight: "100vh",
          }}
        >
          <Spin spinning />
        </div>
      ) : (
        <div>
          {<Typography.Link>{data?.name}</Typography.Link>}
          <br />
          <br />

          <Collapse
            bordered={false}
            defaultActiveKey={["Description"]}
            expandIcon={({ isActive }) => (
              <CaretRightOutlined rotate={isActive ? 90 : 0} />
            )}
          >
            <Collapse.Panel
              header="Description"
              key="Description"
              style={panelStyle}
              extra={<Button type="primary">Edit</Button>}
            >
              <Descriptions bordered size={"default"} column={1}>
                <Descriptions.Item label="Name" className="font-bold">
                  {data?.name}
                </Descriptions.Item>
                <Descriptions.Item label="Status">
                  <Tag color={COLUMS_TASK_LIST_ENUM?.[data?.status]?.color}>
                    {COLUMS_TASK_LIST_ENUM?.[data?.status]?.title}
                  </Tag>
                </Descriptions.Item>
                <Descriptions.Item label="Updated at">
                  {data?._id}
                </Descriptions.Item>
                {/* <Descriptions.Item label="Created ad">
          {data?.created_at}
        </Descriptions.Item> */}
                <Descriptions.Item label="Descriptions">
                  {data?.descriptions}
                </Descriptions.Item>
              </Descriptions>
            </Collapse.Panel>
          </Collapse>

          <br />

          <Collapse
            bordered={false}
            defaultActiveKey={["Comments"]}
            expandIcon={({ isActive }) => (
              <CaretRightOutlined rotate={isActive ? 90 : 0} />
            )}
          >
            <Collapse.Panel header="Comments" key="Comments" style={panelStyle}>
              <p>There are no comments yet on this issue.</p>
            </Collapse.Panel>
          </Collapse>
          <br />
          <Collapse
            bordered={false}
            defaultActiveKey={["Attachments"]}
            expandIcon={({ isActive }) => (
              <CaretRightOutlined rotate={isActive ? 90 : 0} />
            )}
          >
            <Collapse.Panel
              header="Attachments"
              key="Attachments"
              style={panelStyle}
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
            </Collapse.Panel>
          </Collapse>
          <Collapse
            bordered={false}
            defaultActiveKey={["Sub-tasks"]}
            expandIcon={({ isActive }) => (
              <CaretRightOutlined rotate={isActive ? 90 : 0} />
            )}
          >
            <Collapse.Panel
              header="Sub-tasks"
              key="Sub-tasks"
              style={panelStyle}
            >
              <p>There are no Sub-tasks yet on this issue.</p>
            </Collapse.Panel>
          </Collapse>
          <Button>Create Sub-task</Button>
        </div>
      )}
    </div>
  );
};

export default TaskDetail;
