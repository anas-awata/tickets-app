import React from "react";
import NotFoundSvg from "../images/svgs/notFoundSvg";
import { Col, Row } from "antd";

function NotFound() {
  return (
    <Row justify="center" align="middle">
      <Col style={{ textAlign: "center" }} span={23}>
        <p style={{ fontSize: "xxx-large" }}>Page Not Found</p>
      </Col>
      <Col span={23}>
        <NotFoundSvg />
      </Col>
    </Row>
  );
}

export default NotFound;
