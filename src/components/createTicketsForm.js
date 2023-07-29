import React, { useState } from "react";
import { Typography, Row, Button, Card, Form, Select, Spin } from "antd";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { createTicket, viewServices } from "../api/axios";

function CreateTicketsForm() {
  const queryClient = useQueryClient();
  const [myService, setMyService] = useState();
  //mutation to add ticket
  const { mutate, isLoading: loading } = useMutation(createTicket, {
    onSuccess: (response) => {
      // Invalidate and refetch
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
    mutate({ service_id: myService.toString() });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Row
      type="flex"
      justify="center"
      align="middle"
      style={{ minHeight: "10vh" }}
    >
      <Card
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <h2>Services</h2>
        <table id="services">
          <tr>
            <th>Service</th>
            <th>Price</th>
          </tr>
          {isLoading && (
            <tr>
              <Spin size="large" />
            </tr>
          )}
          {isError && <tr>{error}</tr>}
          {data?.data[0].map((service) => (
            <tr key={service.id}>
              <td>{service.title}</td>
              <td>{service.price}$</td>
            </tr>
          ))}
        </table>

        <Form.Item label="Select Service">
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
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
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
            wrapperCol={{
              offset: 8,
              span: 8,
            }}
          >
            <Button type="primary" htmlType="submit" loading={loading}>
              Add Ticket
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </Row>
  );
}

export default CreateTicketsForm;
