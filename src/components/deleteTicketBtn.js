import React from "react";
import { Button, message } from "antd";
import { DeleteFilled } from "@ant-design/icons";
import { useMutation, useQueryClient } from "react-query";
import { deleteTicket } from "../api/axios";

function DeleteTicketBtn({ id }) {
  const queryClient = useQueryClient();
  //message notification
  const [messageApi, contextHolder] = message.useMessage();
  //mutation to delete ticket
  const { mutate, isLoading, isError, error } = useMutation(deleteTicket, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries("getTickets");
    },
  });

  //delete on click
  const handleDelete = (event) => {
    event.stopPropagation();
    event.preventDefault();
    mutate(id);
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
      <Button
        onClick={handleDelete}
        onMouseDown={(event) => event.stopPropagation()}
        style={{ width: 50 }}
        loading={isLoading}
      >
        <DeleteFilled className="success" style={{ fontSize: "150%" }} />
      </Button>
    </>
  );
}

export default DeleteTicketBtn;
