import React from "react";
import { Button, Form, Input, message } from "antd";
import { useMutation, useQueryClient } from "react-query";
import { addReport } from "../api/axios";

const { TextArea } = Input;

function CreateReportForm({ id }) {
  const queryClient = useQueryClient();
  //message notification
  const [messageApi, contextHolder] = message.useMessage();
  //mutation to add Report
  const {
    mutate,
    isLoading: loading,
    isError,
    error,
  } = useMutation(addReport, {
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
            sm: { span: 12, offset: 6 },
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
    </>
  );
}

export default CreateReportForm;
