import React, { useState } from "react";
import { Row, Button, Card, Form, Select, Col, message } from "antd";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { createTicket, viewServices } from "../api/axios";

function CreateTicketsForm() {
  const queryClient = useQueryClient();
  const [myService, setMyService] = useState();
  //message notification
  const [messageApi, contextHolder] = message.useMessage();
  //mutation to add ticket
  const {
    mutate,
    isLoading: loading,
    isError: mutateISError,
    error: mutateError,
  } = useMutation(createTicket, {
    onSuccess: (response) => {
      // Invalidate and refetch
      console.log(response);
      queryClient.invalidateQueries("getTickets");
    },
  });

  //get services to pick from
  const { data, isLoading, isError, error } = useQuery(
    "view-services",
    viewServices
  );

  //creat ticket on form submit
  const onFinish = () => {
    mutate({ service_id: myService?.toString() });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  //display error notification
  if (isError) {
    messageApi.destroy();
    messageApi.open({
      type: "error",
      content: `${error.message}`,
    });
  }
  if (mutateISError) {
    messageApi.destroy();
    messageApi.open({
      type: "error",
      content: `${mutateError.message}`,
    });
  }
  return (
    <>
      {contextHolder}
      <Card
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Row justify="center" align="middle">
          <Col span={24}>
            <h1>Book a Service</h1>
          </Col>
          <Col span={24}>
            <table id="services">
              <thead>
                <tr>
                  <th>Service</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {isError && (
                  <tr>
                    <td>{error.message}</td>
                  </tr>
                )}
                {data?.data[0].map((service) => (
                  <tr key={service.id}>
                    <td>{service.title}</td>
                    <td>{service.price}$</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Col>
          <Col span={24}>
            <Form
              name="basic"
              style={{
                minWidth: 400,
              }}
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                style={{
                  marginTop: 30,
                }}
                wrapperCol={{
                  xs: { span: 6, offset: 0 },
                  md: {
                    span: 14,
                    offset: 2,
                  },
                }}
                labelCol={{ xs: { span: 2 }, md: { span: 6 } }}
                label="Select Service"
              >
                <Select
                  name="service_id"
                  defaultValue={1}
                  onChange={(value) => {
                    setMyService(value);
                  }}
                >
                  {!isError &&
                    data?.data[0].map((service) => (
                      <Select.Option key={service.id} value={service.id}>
                        {service.title}
                      </Select.Option>
                    ))}
                </Select>
              </Form.Item>
              <Form.Item
                wrapperCol={{
                  span: 24,
                }}
              >
                <Button type="primary" htmlType="submit" loading={loading}>
                  Add Ticket
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Card>
    </>
  );
}

export default CreateTicketsForm;
