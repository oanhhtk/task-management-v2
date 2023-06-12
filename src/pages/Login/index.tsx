import {
  FacebookOutlined,
  GoogleOutlined,
  LockOutlined,
  QqOutlined,
  TwitterOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Button,
  Checkbox,
  Form,
  Input,
  Space,
  Tabs,
  Typography,
  message,
} from "antd";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { Navigate, useNavigate } from "react-router-dom";
import { graphQLRequest } from "../../utils/request";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthProvider";

export default function Login() {
  const navigate = useNavigate();
  const auth = getAuth();
  const { user } = useContext(AuthContext);
  /**
   *handle login with google
   */
  const handleLoginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();

    const {
      user: { uid, displayName, email },
    } = await signInWithPopup(auth, provider);

    const { data } = await graphQLRequest({
      query: `mutation Register($uid: String!, $name: String!, $email: String!) {
        register(uid: $uid, name: $name, email: $email) {
          uid
          email
          name
        }
      }`,
      variables: {
        uid,
        name: displayName,
        email,
      },
    });
    // console.log("register", { data });
    if (uid) navigate("/");
    message.success("Login successfully!");
  };

  if (localStorage.getItem("accessToken")) {
    console.log("has accessToken", localStorage.getItem("accessToken"));
    return <Navigate to="/" />;
  }

  const items = [
    {
      key: "social-login",
      label: `Login with Social media`,
      children: (
        <div className="flex justify-center items-center">
          <Space direction="vertical">
            <Button
              style={{
                width: 300,
              }}
              icon={<GoogleOutlined />}
              onClick={handleLoginWithGoogle}
            >
              Sign In with Google
            </Button>
            <Button
              style={{
                width: 300,
              }}
              disabled
              icon={<FacebookOutlined />}
            >
              Sign In with Facebook
            </Button>
            <Button
              style={{
                width: 300,
              }}
              disabled
              icon={<TwitterOutlined />}
            >
              Sign In with Twitter
            </Button>
          </Space>
        </div>
      ),
    },
    ,
    {
      key: "login-form",
      label: `Login with Phone number`,
      children: (
        <>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Form
              name="normal_login"
              className="login-form"
              initialValues={{ remember: true }}
              onFinish={handleLoginWithGoogle}
            >
              <Form.Item
                name="username"
                rules={[
                  { required: true, message: "Please input your Username!" },
                ]}
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Username"
                  value="oanh"
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Please input your Password!" },
                ]}
              >
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Password"
                  value="12345"
                />
              </Form.Item>
              <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <a className="login-form-forgot" href="">
                  Forgot password
                </a>
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                >
                  Log in
                </Button>
              </Form.Item>
            </Form>
          </div>
        </>
      ),
    },
  ];
  const onChange = (key: string) => {
    console.log(key);
  };

  return (
    <div
      className="flex justify-center items-center"
      style={{
        width: "100%",
      }}
    >
      <div
        style={{
          minWidth: 700,
        }}
      >
        <Typography.Title
          style={{
            textAlign: "center",
            padding: "10px 0",
          }}
          className="text-center"
        >
          <QqOutlined
            style={{
              background: "pink",
              padding: 4,
              borderRadius: 50,
            }}
          />{" "}
          Task Management <br />
          <Typography.Text
            style={{
              textAlign: "center",
              fontWeight: "normal",
            }}
            className="text-center"
          >
            Welcome to{" "}
            <span
              style={{
                color: "pink",
              }}
            >
              oanhhtk
            </span>{" "}
            - Management System
          </Typography.Text>
        </Typography.Title>

        <Tabs
          className="login-tabs"
          defaultActiveKey="social-login"
          items={items}
          onChange={onChange}
        />
      </div>
    </div>
  );
}
