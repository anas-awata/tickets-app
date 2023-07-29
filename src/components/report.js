import React from "react";
import { Card } from "antd";

function Report({ report_id, report }) {
  return (
    <Card
      title={`Report #${report_id}`}
      style={{
        minWidth: "300px",
        transitionProperty: "transform",
        transitionDuration: "0.3s",
        transitionTimingFunction: "ease-in-out",
        "&:hover": {
          transform: "scale(1.07)",
        },
      }}
    >
      <p>{report}</p>
    </Card>
  );
}

export default Report;
