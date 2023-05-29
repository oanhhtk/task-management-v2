import React from "react";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { useContext } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import { graphQLRequest } from "../../utils/request";
import { Button, Typography } from "antd";

export default function Login() {
  const auth = getAuth();
  // const navigate = useNavigate();
  // const { user } = useContext(AuthContext);

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
    console.log("register", { data });
  };

  if (localStorage.getItem("accessToken")) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <Typography.Title>Welcome to Note App</Typography.Title>
      <Button type="primary" onClick={handleLoginWithGoogle}>
        Login with Google
      </Button>
    </>
  );
}
