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
      title={`#${id}`}
      extra={user_role == "1" && <DeleteTicketBtn id={id} />}
      style={{
        minWidth: "300px",
        cursor: "pointer",
        background: "#6992ff12",
        border: "1px solid #d1d1d1",
        borderRadius: "25px",
      }}
      headStyle={{ textAlign: "left", paddingLeft: "25px", fontSize: "large" }}
      onClick={() => navigate(`ticket/${id}`)}
      hoverable={true}
    >
      {user_role == "1" && (
        <p style={{ fontSize: "large" }}>{`Client: ${client}`}</p>
      )}
      <p style={{ fontSize: "large" }}>{title}</p>
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
