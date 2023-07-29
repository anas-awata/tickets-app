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
  Spin,
  Space,
  Col,
} from "antd";
import { register } from "../api/axios.js";
import { useNavigate } from "react-router-dom";
import Logo from "../images/logo.png";

const { Text, Link } = Typography;

function Register() {
  //state for role to control the Radio element
  const [role, setRole] = useState("1");

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // Mutations
  const { mutate, isLoading, isError, error } = useMutation(register, {
    onSuccess: (response) => {
      // Invalidate and refetch
      queryClient.invalidateQueries("register");
      navigate("/login");
    },
  });

  //registre on form submit
  const onFinish = (values) => {
    mutate(values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Row justify="center" align="middle" style={{ minHeight: "80vh" }}>
      <Col xs={24} lg={6}>
        <img src={Logo} />
      </Col>
      <Col xs={24} lg={8}>
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

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
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
                offset: 8,
                span: 8,
              }}
            >
              {isError && <p>{error}</p>}
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
  );
}

export default Register;
