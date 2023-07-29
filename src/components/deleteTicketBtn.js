import React from "react";
import { Button } from "antd";
import { DeleteFilled } from "@ant-design/icons";
import { useMutation, useQueryClient } from "react-query";
import { deleteTicket } from "../api/axios";

function DeleteTicketBtn({ id }) {
  const queryClient = useQueryClient();
  //mutation to delete ticket
  const { mutate, isLoading, isError, error } = useMutation(deleteTicket, {
    onSuccess: (response) => {
      console.log("Success:", response);
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
  return (
    <Button
      onClick={handleDelete}
      onMouseDown={(event) => event.stopPropagation()}
      style={{ width: 50 }}
      loading={isLoading}
    >
      <DeleteFilled style={{ fontSize: "150%" }} />
    </Button>
  );
}

export default DeleteTicketBtn;
