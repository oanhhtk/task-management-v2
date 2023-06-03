import {
  Button,
  Col,
  Divider,
  Form,
  Menu,
  Row,
  Select,
  Space,
  Spin,
  Tag,
  Typography,
  message,
  notification,
} from "antd";
import Table, { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../firebase/config";

import { theme } from "antd";
import { useParams } from "react-router-dom";
import { addBoard, getBoardList } from "../../service";
import Loading from "../../components/Loading";
import { PlusOutlined } from "@ant-design/icons";
import { type } from "os";
import UseForm from "./components/UseForm";

interface BoardItemDataType {
  id: any;
  key: string;
  name: string;
  boardType: string;
  administrators: string;
  address: string;
  tags: string[];
}

const columns: ColumnsType<BoardItemDataType> = [
  {
    title: "Project",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
  },

  {
    title: "Tags",
    key: "tags",
    // dataIndex: "tags",
    render: (_, { tags }) => (
      <>
        {tags?.map((tag) => {
          let color = tag.length > 5 ? "geekblue" : "green";
          if (tag === "loser") {
            color = "volcano";
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <a>Invite {record.name}</a>
        <a>Delete</a>
      </Space>
    ),
  },
];

const boardTypeList = [
  {
    label: "Crum",
    value: "crrum",
  },
];

type HomePropsType = {
  currentMenu: string;
};
function Home({ currentMenu }: HomePropsType) {
  const navigate = useNavigate();
  const [boardList, setBoarList] = useState<any>();

  const [openUseForm, setOpenUseForm] = useState(false);
  const [formSubmiting, setFormSubmiting] = useState(false);
  const [triggerReload, setTriggerReload] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await getBoardList();
        setBoarList(res?.boards);
      } catch (error) {
        notification.error({
          message: "Error",
          description: "Failed to fetch board data. Try again!",
        });
      }
    })();
  }, [triggerReload]);

  const onFromSubmit = async (value: any) => {
    console.log(value);
    setFormSubmiting(true);
    try {
      const res = await addBoard(value);
      message.success("Add new Board successfully!");
      setOpenUseForm(false);
      setTriggerReload(true);
      console.log("res :>> ", res);
    } catch (error) {
      message.error("Failed to add new board");
    } finally {
      setFormSubmiting(false);
    }
  };

  return (
    <div className="w-full">
      <Row className="justify-between">
        <Col>
          <Typography.Title level={3}>{currentMenu}</Typography.Title>
          Board Type:{" "}
          <Select
            placeholder="Board type"
            onChange={() => {}}
            style={{ width: 120 }}
            options={boardTypeList}
            labelInValue
          />
        </Col>
        <Col>
          <Button
            icon={<PlusOutlined />}
            type="primary"
            onClick={() => setOpenUseForm(true)}
          >
            New board
          </Button>
        </Col>
      </Row>
      <Divider />
      {boardList ? (
        <Table
          columns={columns}
          dataSource={boardList}
          onRow={(record) => ({
            className: "cursor-pointer",
            onClick: () => navigate(`/rapid-board/${record?.id}`),
          })}
        />
      ) : (
        <Loading loading />
      )}

      {openUseForm ? (
        <UseForm
          open={openUseForm}
          onCancel={() => setOpenUseForm(false)}
          onSubmit={onFromSubmit}
          formProps={{
            isSubmiting: formSubmiting,
          }}
        />
      ) : null}
    </div>
  );
}

export default Home;
