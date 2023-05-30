import {
  Button,
  Col,
  Divider,
  Menu,
  Row,
  Select,
  Space,
  Tag,
  Typography,
} from "antd";
import Table, { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import "./App.css";
import { graphQLRequest } from "./utils/request";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { foldersLoader } from "./service";
import "./firebase/config";

interface BoardItemDataType {
  key: string;
  name: string;
  boardType: string;
  administrators: string;
  address: string;
  tags: string[];
}

function App() {
  const columns: ColumnsType<BoardItemDataType> = [
    {
      title: "Project",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Administrators",
      dataIndex: "administrators",
      key: "administrators",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Tags",
      key: "tags",
      dataIndex: "tags",
      render: (_, { tags }) => (
        <>
          {tags.map((tag) => {
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

  const data: BoardItemDataType[] = [
    {
      key: "1",
      name: "John Brown",
      boardType: "Scrum",
      administrators: "oanhhtk@gmail.com",
      address: "New York No. 1 Lake Park",
      tags: ["nice", "developer"],
    },
    {
      key: "2",
      name: "Jim Green",
      boardType: "Scrum",
      administrators: "oanhhtk@gmail.com",
      address: "London No. 1 Lake Park",
      tags: ["loser"],
    },
    {
      key: "3",
      name: "Joe Black",
      boardType: "Scrum",
      administrators: "oanhhtk@gmail.com",
      address: "Sydney No. 1 Lake Park",
      tags: ["cool", "teacher"],
    },
  ];

  const MENU_LIST = [
    {
      key: "all-board",
      value: "all-board",
      label: "All boards",
      title: "All boards",
    },
    {
      key: "recently-visited",
      label: "Recently visited boards",
      title: "Recently visited boards",
      value: "recently-visited",
    },
  ];

  const boardTypeList = [
    {
      label: "Crum",
      value: "crrum",
    },
  ];

  const MENU_LIST_ENUM: Record<string, any> = {
    "all-board": {
      text: "All boards",
      value: "all-board",
    },
    "recently-visited": {
      text: "Recently visited boards",
      value: "recently-visited",
    },
  };

  const navigate = useNavigate();

  const [currentMenu, setCurrentMenu] = useState("All boards");

  useEffect(() => {
    (async () => {
      const res = await foldersLoader();
      console.log("res :>> ", res);
    })();
  }, []);

  return (
    <div className="w-full">
      <Row>
        <Col span={4}>
          <Menu
            mode="inline"
            defaultSelectedKeys={["all-board"]}
            style={{ width: 256 }}
            items={MENU_LIST}
            onClick={(item) => setCurrentMenu(MENU_LIST_ENUM[item.key].text)}
          />
        </Col>
        <Col span={20}>
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
          <Table
            columns={columns}
            dataSource={data}
            onRow={(record, index) => ({
              className: "cursor-pointer",
              onClick: () => navigate(`/rapid-board/${record.key}`),
              // onClick: () => <Navigate to="/rapid-board" />,
            })}
          />
        </Col>
      </Row>
    </div>
  );
}

export default App;
