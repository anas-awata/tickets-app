import React from "react";
import { Card, Space } from "antd";
import { MinusCircleFilled, CheckCircleFilled } from "@ant-design/icons";
import DeleteTicketBtn from "./deleteTicketBtn";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Ticket({ id, title, price, status, client }) {
  const navigate = useNavigate();
  //get user role from state
  const user_role = useSelector((state) => state.user.role_id);
  return (
    <Card
      title={user_role == "1" ? `Client: ${client} #${id}` : `#${id}`}
      extra={user_role == "1" && <DeleteTicketBtn id={id} />}
      style={{
        minWidth: "300px",
        transitionProperty: "transform",
        transitionDuration: "0.3s",
        transitionTimingFunction: "ease-in-out",
        "&:hover": {
          transform: "scale(1.07)",
        },
        cursor: "pointer",
      }}
      onClick={() => navigate(`ticket/${id}`)}
    >
      <p>{title}</p>
      <p>{price}</p>
      <Space align="center">
        {status == "pending" ? (
          <MinusCircleFilled style={{ color: "#e7e741", fontSize: "150%" }} />
        ) : (
          <CheckCircleFilled style={{ color: "green", fontSize: "150%" }} />
        )}
        <p>{status}</p>
      </Space>
    </Card>
  );
}

export default Ticket;
