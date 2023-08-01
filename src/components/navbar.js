import React from "react";
import { NavLink } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import { logout } from "../api/axios.js";
import { useNavigate } from "react-router-dom";
import { Button, Col, Row, Space, Typography, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../redux/userSlice";
import { UserOutlined } from "@ant-design/icons";
import Logo from "../images/logo.png";

const { Text } = Typography;

function Navbar() {
  const queryClient = useQueryClient();
  //message notification
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  //redux
  const myuser = useSelector((state) => state.user);
  const dispatch = useDispatch();

  //mutation to logout
  const { mutate, isLoading, isError, error } = useMutation(logout, {
    onSuccess: (response) => {
      // Invalidate and refetch
      queryClient.invalidateQueries("login");
      if (response.data.message == "Logged out successfully") {
        //redux remove token from state
        dispatch(removeUser());
        navigate("/login");
      }
    },
  });
  const handleLogout = () => {
    mutate();
  };

  //display error notification
  if (isError) {
    messageApi.destroy();
    messageApi.open({
      type: "error",
      content: `${error.message}`,
    });
  }
  return (
    <>
      {contextHolder}
      <Row
        align="middle"
        justify="space-between"
        style={{
          paddingTop: 20,
          paddingBottom: 10,
        }}
      >
        <Col span={4}>
          <img style={{ width: "80px" }} src={Logo} />
        </Col>
        <Col style={{ textAlign: "right", paddingRight: "10%" }} span={16}>
          <Space size="large" style={{ fontSize: "large" }}>
            <NavLink
              style={{
                padding: "10px",
                textDecoration: "none",
                color: "#000",
              }}
              to="/"
            >
              Home
            </NavLink>
            <Space size="large">
              <Space>
                <UserOutlined />
                <Text style={{ fontSize: "large", whiteSpace: "nowrap" }}>
                  {myuser.name}
                </Text>
              </Space>
              <Button
                type="primary"
                style={{
                  padding: "10px",
                  cursor: "pointer",
                  fontSize: "medium",
                  padding: 5,
                  height: "auto",
                }}
                onClick={handleLogout}
                loading={isLoading}
              >
                Logout
              </Button>
            </Space>
          </Space>
        </Col>
      </Row>
    </>
  );
}

export default Navbar;
