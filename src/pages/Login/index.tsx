import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Typography } from "antd";
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
      user: { uid, displayName },
    } = await signInWithPopup(auth, provider);

    const { data } = await graphQLRequest({
      query: `mutation register($uid: String!, $name: String!) {
      register(uid: $uid, name: $name) {
        uid
        name
      }
    }`,
      variables: {
        uid,
        name: displayName,
      },
    });
    // console.log("register", { data });
  };

  if (localStorage.getItem("accessToken")) {
    console.log("has accessToken", localStorage.getItem("accessToken"));
    return <Navigate to="/" />;
  }

  useEffect(() => {
    if (user?.uid) {
      console.log("has user");
      navigate("/");
    }
  }, [user]);

  return (
    <>
      <Typography.Title
        style={{
          textAlign: "center",
          padding: "10px 0",
        }}
        className="text-center"
      >
        Task Management
      </Typography.Title>
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
          style={{
            width: "20%",
          }}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your Username!" }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
              value="oanh"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
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
  );
}
