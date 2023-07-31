import React from "react";
import { Card, Col, Row } from "antd";

function Report({ report_id, report }) {
  return (
    <Row justify="center">
      <Col span={16}>
        <Card
          title={`Report #${report_id}`}
          style={{}}
          headStyle={{ fontSize: "large", background: "#eee" }}
        >
          <p>{report}</p>
        </Card>
      </Col>
    </Row>
  );
}

export default Report;
