import React from "react";
import ErrorSvg from "../images/svgs/errorSvg";
import { Button, Col, Row } from "antd";

function FallBack({ error, resetErrorBoundary }) {
  return (
    <Row justify="center" align="middle">
      <Col style={{ textAlign: "center" }} span={23}>
        <p style={{ fontSize: "xxx-large" }}>Something Went Wrong</p>
      </Col>
      {/*<pre>{error.message}</pre>*/}
      <Col span={23}>
        <ErrorSvg />
      </Col>
      <Col style={{ textAlign: "center", paddingTop: 50 }} span={23}>
        <Button type="primary" onClick={resetErrorBoundary}>
          Try again
        </Button>
      </Col>
    </Row>
  );
}

export default FallBack;
