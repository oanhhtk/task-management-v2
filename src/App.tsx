import {
  ApartmentOutlined,
  AppstoreOutlined,
  ControlOutlined,
  DownOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Button,
  Col,
  Dropdown,
  Layout,
  Menu,
  MenuProps,
  Row,
  Space,
  theme,
} from "antd";
import React, { useContext, useState } from "react";
import { AuthContext } from "./context/AuthProvider";
import Home from "./pages/Home";

const { Header, Sider, Content } = Layout;

const MENU_LIST = [
  {
    key: "all-board",
    value: "all-board",
    label: "All boards",
    title: "All boards",
    icon: <ApartmentOutlined />,
  },
  {
    key: "recently-visited",
    label: "Recently visited boards",
    title: "Recently visited boards",
    value: "recently-visited",
    icon: <ControlOutlined />,
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

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [currentMenu, setCurrentMenu] = useState("All boards");
  const {
    user: { displayName, photoURL, auth },
  } = useContext(AuthContext);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <a onClick={() => auth?.signOut()}>
          Logout <LogoutOutlined />
        </a>
      ),
    },
  ];
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo mt-2 mb-2">
          {collapsed ? (
            <div>
              <AppstoreOutlined
                style={{
                  fontSize: "20px",
                }}
              />
            </div>
          ) : (
            "Task Management"
          )}
        </div>

        <Menu
          mode="inline"
          defaultSelectedKeys={["all-board"]}
          items={MENU_LIST}
          onClick={(item) => setCurrentMenu(MENU_LIST_ENUM[item.key].text)}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: "#fff" }}>
          <Row className="justify-between ">
            <Col>
              <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{
                  fontSize: "16px",
                  width: 64,
                  height: 64,
                }}
              />
            </Col>
            <Col className="flex gap-2 items-center mr-3">
              <Dropdown menu={{ items }} placement="bottomRight">
                <a
                  onClick={(e) => e.preventDefault()}
                  style={{
                    color: "#131313",
                  }}
                >
                  <Space>
                    <Avatar src={photoURL} />
                    {displayName}
                    <DownOutlined />
                  </Space>
                </a>
              </Dropdown>
            </Col>
          </Row>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <Home currentMenu={currentMenu} />
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
