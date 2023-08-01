import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import {
  Card,
  Row,
  Typography,
  Button,
  Form,
  Input,
  Radio,
  Col,
  message,
} from "antd";
import { register } from "../api/axios.js";
import { useNavigate } from "react-router-dom";
import Logo from "../images/logo.png";

const { Text, Link } = Typography;

function Register() {
  //state for role to control the Radio element
  const [role, setRole] = useState("1");
  //state for response error
  const [responseError, setResponseError] = useState("");

  const queryClient = useQueryClient();
  //message notification
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();

  // Mutations
  const { mutate, isLoading, isError, error } = useMutation(register, {
    onSuccess: (response) => {
      if (response.data.message == "Operation successful") {
        navigate("/login");
      } else {
        //store response error in state (at this case if the email already exist)
        setResponseError(response.data.email[0]);
      }
    },
  });

  //registre on form submit
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
            <h2>SignUp</h2>
            <Form
              name="basic"
              labelCol={{
                span: 6,
              }}
              wrapperCol={{
                span: 16,
              }}
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                label="Name"
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Please input your name!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please input your Email!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Text
                style={{ color: "red", marginBottom: 10, display: "block" }}
              >
                {responseError}
              </Text>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                  { min: 6, message: "Password must be minimum 6 characters." },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                label="Role"
                name="role_id"
                rules={[
                  {
                    required: true,
                    message: "Please input your Role!",
                  },
                ]}
              >
                <Radio.Group
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <Radio value="1"> Admin </Radio>
                  <Radio value="2"> Client </Radio>
                </Radio.Group>
              </Form.Item>

              <Form.Item
                wrapperCol={{
                  xs: { span: 8 },
                  md: { offset: 8, span: 8 },
                }}
              >
                <Button type="primary" htmlType="submit" loading={isLoading}>
                  SignUp
                </Button>
              </Form.Item>
              <Text>already have an account ? </Text>
              <Link onClick={() => navigate("/login")}>Login</Link>
            </Form>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default Register;
