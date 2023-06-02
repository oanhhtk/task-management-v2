import {
  AppstoreOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ControlOutlined,
  ApartmentOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import React, { useState } from "react";
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
    token: { colorBgContainer },
  } = theme.useToken();

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
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <Home />
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
