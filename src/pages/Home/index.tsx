import {
  Button,
  Col,
  Divider,
  Popconfirm,
  Row,
  Select,
  Space,
  Tag,
  Tooltip,
  Typography,
  message,
  notification,
} from "antd";
import Table, { ColumnsType } from "antd/es/table";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../firebase/config";

import { DeleteOutlined, EditTwoTone, PlusOutlined } from "@ant-design/icons";
import Loading from "../../components/Loading";
import {
  addBoard,
  deleteBoard,
  getBoardList,
  updateBoard,
} from "../../service";
import UseForm from "./components/UseForm";

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
  const useFormTypeRef = useRef<UseFormActionType>("CREATE");

  const [selectedBoard, setSelectedBoard] = useState<BoardItemDataType>();
  const [openUseForm, setOpenUseForm] = useState(false);
  const [formSubmiting, setFormSubmiting] = useState(false);
  const [triggerReload, setTriggerReload] = useState(false);
  const params = useParams();
  console.log("params :>> ", params);

  const columns: ColumnsType<BoardItemDataType> = [
    {
      title: "STT",
      dataIndex: "index",
      rowScope: "row",
      align: "center",
      render(_, __, index) {
        return index + 1;
      },
    },
    {
      title: "Project",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <a onClick={() => navigate(`/rapid-board/${record?.id}`)}>{text}</a>
      ),
    },

    {
      title: "Board type",
      key: "board_type",
      dataIndex: "board_type",
      render: (dom) => (
        <Tag color={dom === "scrum" ? "geekblue" : "purple"}>
          {dom?.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Descriptions",
      key: "descriptions",
      dataIndex: "descriptions",
      render: (dom) => (
        <Typography.Text color="geekblue">{dom}</Typography.Text>
      ),
    },
    {
      title: "Created at",
      key: "createdAt",
      dataIndex: "createdAt",
      align: "center",
      render: (dom) => <>{dom}</>,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space.Compact>
          <Tooltip title="Nhấp vào để chỉnh sửa">
            <Button
              type="dashed"
              onClick={(e) => {
                e.preventDefault();
                setOpenUseForm(true);
                useFormTypeRef.current = "UPDATE";
                setSelectedBoard(record);
              }}
              icon={<EditTwoTone />}
            />
          </Tooltip>
          <Tooltip title="Click to delete">
            <Popconfirm
              title="Delete the board"
              description="Are you sure to delete this board?"
              okText="Yes"
              cancelText="No"
              onConfirm={async () => {
                try {
                  await deleteBoard(record.id);
                  message.success("Deleted successfully!");
                  setTriggerReload((prev) => !prev);
                } catch (error) {
                  message.success(" Failed to deleted board!");
                }
              }}
            >
              <Button type="dashed" danger icon={<DeleteOutlined />} />
            </Popconfirm>
          </Tooltip>
        </Space.Compact>
      ),
    },
  ];

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

  const onFromSubmit = async (value: any, boardId: string) => {
    console.log(value);
    setFormSubmiting(true);
    console.log(useFormTypeRef.current);
    try {
      if (useFormTypeRef.current === "CREATE") {
        await addBoard(value);
        message.success("Added new Board successfully!");
      } else {
        await updateBoard(boardId, value);
        message.success("Updated new Board successfully!");
      }
    } catch (error) {
      message.error("Failed to add new board");
    } finally {
      setFormSubmiting(false);
      setOpenUseForm(false);
      setTriggerReload((prev) => !prev);
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
          <Tooltip title="Add new Board">
            <Button
              icon={<PlusOutlined />}
              type="primary"
              onClick={() => {
                setOpenUseForm(true);
                useFormTypeRef.current = "CREATE";
              }}
            >
              New board
            </Button>
          </Tooltip>
        </Col>
      </Row>
      <Divider />
      {boardList ? (
        <Table
          rowKey="_id"
          columns={columns}
          dataSource={boardList}
          onRow={(record) => ({
            className: "cursor-pointer",
          })}
        />
      ) : (
        <Loading loading />
      )}

      {openUseForm ? (
        <UseForm
          open={openUseForm}
          type={useFormTypeRef.current}
          record={selectedBoard}
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
