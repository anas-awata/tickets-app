import React from "react";
import { Button, Form, Input } from "antd";
import { useMutation, useQueryClient } from "react-query";
import { addReport } from "../api/axios";

const { TextArea } = Input;

function CreateReportForm({ id }) {
  const queryClient = useQueryClient();
  //mutation to add Report
  const { mutate, isLoading: loading } = useMutation(addReport, {
    onSuccess: (response) => {
      // Invalidate and refetch
      queryClient.invalidateQueries(["view-ticket", id]);
    },
  });

  //add report on form submit
  const onFinish = (values) => {
    mutate({ ticket_id: id.toString(), report: values.Report });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Form
      name="Report-form"
      wrapperCol={{
        span: 12,
        offset: 6,
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
          xs: { span: 12 },
          md: { span: 16, offset: 4 },
        }}
        style={{ padding: 20 }}
        name="Report"
        rules={[
          {
            required: true,
            message: "Please input Text For your Report",
          },
        ]}
      >
        <TextArea placeholder="Report discreption" rows={4} />
      </Form.Item>
      <Form.Item wrapperCol={{ xm: 24 }}>
        <Button type="primary" htmlType="submit" loading={loading}>
          Add Report
        </Button>
      </Form.Item>
    </Form>
  );
}

export default CreateReportForm;
