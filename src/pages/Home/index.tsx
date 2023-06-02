import {
  Col,
  Divider,
  Menu,
  Row,
  Select,
  Space,
  Spin,
  Tag,
  Typography,
} from "antd";
import Table, { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../firebase/config";

import { theme } from "antd";
import { useParams } from "react-router-dom";
import { getBoardList } from "../../service";
import Loading from "../../components/Loading";

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

function Home() {
  const navigate = useNavigate();
  const [currentMenu] = useState("All boards");
  const [boardList, setBoarList] = useState<any>();

  useEffect(() => {
    (async () => {
      const res = await getBoardList();
      setBoarList(res?.boards);
    })();
  }, []);

  return (
    <div className="w-full">
      <Typography.Title level={3}>{currentMenu}</Typography.Title>
      Board Type:{" "}
      <Select
        placeholder="Board type"
        onChange={() => {}}
        style={{ width: 120 }}
        options={boardTypeList}
        labelInValue
      />
      <Divider />
      {boardList ? (
        <Table
          columns={columns}
          dataSource={boardList}
          onRow={(record, index) => ({
            className: "cursor-pointer",
            onClick: () => navigate(`/rapid-board/${record?.id}`),
          })}
        />
      ) : (
        <Loading loading />
      )}
    </div>
  );
}

export default Home;
