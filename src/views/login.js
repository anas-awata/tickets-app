import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { Typography, Row, Button, Card, Form, Input, Col, message } from "antd";
import { login } from "../api/axios.js";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, addToken } from "../redux/userSlice";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import Logo from "../images/logo.png";

const { Text, Link } = Typography;

function Login() {
  const queryClient = useQueryClient();
  //message notification
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();

  //redux
  const myuser = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // Mutations
  const { mutate, isError, isLoading, error } = useMutation(login, {
    onSuccess: (response) => {
      // Invalidate and refetch
      queryClient.invalidateQueries("login");
      if (response.data.message == "Operation successful") {
        //redux
        dispatch(addUser(response.data.user));
        dispatch(addToken(response.data.access_token));
        navigate("/", { replace: true });
      }
    },
  });

  //login on form submit
  const onFinish = (values) => {
    mutate(values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

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
      <Row justify="center" align="middle" style={{ minHeight: "100vh" }}>
        <Col xs={24} md={6}>
          <img src={Logo} />
        </Col>
        <Col xs={24} md={10}>
          <Card>
            <h2>Login</h2>
            <Form
              name="normal_login"
              className="login-form"
              labelCol={{
                span: 6,
              }}
              wrapperCol={{
                span: 16,
                md: { offset: 4 },
              }}
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please input your email!",
                    type: "email",
                  },
                ]}
              >
                <Input
                  prefix={<MailOutlined className="site-form-item-icon" />}
                  placeholder="Email"
                />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  placeholder="Password"
                />
              </Form.Item>

              <Form.Item
                wrapperCol={{
                  xs: { span: 8 },
                  md: { offset: 8, span: 8 },
                }}
              >
                <Button type="primary" htmlType="submit" loading={isLoading}>
                  Login
                </Button>
              </Form.Item>
              <Text>don't have an account ? </Text>
              <Link onClick={() => navigate("/register")}>SignUp</Link>
            </Form>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default Login;
