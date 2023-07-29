import { Card, Row, Col } from "antd";
import React from "react";

const fontStyle = {
  fontSize: "x-large",
};

function TicketInfo({ id, name, service, price }) {
  return (
    <Row justify="center" align="middle">
      <Col span={12} prefix={12}>
        <Card
          title={<h1>{`Ticket #${id}`}</h1>}
          headStyle={{ background: "#69b1ff", color: "#fff" }}
          style={{}}
          bodyStyle={{}}
        >
          <div>
            <p style={fontStyle}>Name: {name}</p>
            <p style={fontStyle}>Service: {service}</p>
            <p style={fontStyle}>Price: {price}$</p>
          </div>
        </Card>
      </Col>
    </Row>
  );
}

export default TicketInfo;