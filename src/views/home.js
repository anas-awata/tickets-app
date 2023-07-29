import React, { useState } from "react";
import { useMutation, useQueryClient, useQuery } from "react-query";
import {
  Card,
  Row,
  Typography,
  Button,
  Form,
  Input,
  Radio,
  Space,
  Spin,
} from "antd";
import { getTickets } from "../api/axios.js";
import { useSelector } from "react-redux";
import Ticket from "../components/ticket.js";
import CreateTicketsForm from "../components/createTicketsForm.js";

function Home() {
  const token = useSelector((state) => state.token);

  //get tickets data
  const { data, isLoading, isError, error } = useQuery(
    "getTickets",
    getTickets
  );
  return (
    <div>
      {<CreateTicketsForm />}
      {isLoading && <Spin size="large" />}
      {isError && <h2>{error}</h2>}
      {!isError && (
        <Space
          align="center"
          size="middle"
          style={{ display: "flex", padding: 100, paddingTop: 10 }}
          wrap
        >
          {!isError &&
            data?.data.data.map((ticket) => (
              <Ticket
                key={ticket.id}
                id={ticket.id}
                title={ticket.service.title}
                price={ticket.service.price}
                status={ticket.status.title}
                client={ticket.client.name}
              />
            ))}
        </Space>
      )}
    </div>
  );
}

export default Home;
