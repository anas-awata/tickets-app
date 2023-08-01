import { Card, Row, Col } from "antd";
import React from "react";

const fontStyle = {
  fontSize: "x-large",
};

function TicketInfo({ id, name, service, price, isError, error, isLoading }) {
  return (
    <Row justify="center" align="middle">
      <Col xs={20} md={12}>
        <Card
          title={<h1 style={{ textWrap: "wrap" }}>{`Ticket #${id}`}</h1>}
          headStyle={{ background: "#69b1ff", color: "#fff" }}
          style={{}}
          bodyStyle={{}}
          loading={isLoading}
        >
          {!isError && (
            <div>
              <p style={fontStyle}>Name: {name}</p>
              <p style={fontStyle}>Service: {service}</p>
              <p style={fontStyle}>Price: {price}$</p>
            </div>
          )}
          {isError && (
            <div>
              <p>{error.message}</p>
            </div>
          )}
        </Card>
      </Col>
    </Row>
  );
}

export default TicketInfo;
