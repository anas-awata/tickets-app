import React from "react";
import { useQuery } from "react-query";
import { request, viewServices } from "../api/axios";
import { useParams } from "react-router-dom";
import CreateReportForm from "../components/creatReportForm";
import { useSelector } from "react-redux";
import Report from "../components/report";
import { Card, Spin } from "antd";
import TicketInfo from "../components/ticketInfo";

function TicketDetails() {
  //get id from url
  const { id } = useParams();
  //get user role from state
  const user_role = useSelector((state) => state.user.role_id);
  //get ticket information by id
  const { data, isLoading, isError, error } = useQuery(
    ["view-ticket", id],
    () => request({ url: `view-ticket/${id}` })
  );
  return (
    <div>
      <TicketInfo
        name={data?.data[0].client.name}
        service={data?.data[0].service.title}
        price={data?.data[0].service.price}
        id={id}
      />
      {
        //only Admins can add reports
        user_role == "1" && (
          <>
            <h2>Create Report</h2>
            <CreateReportForm id={id} />
          </>
        )
      }

      {isLoading && <Spin size="large" />}
      {isError && <h2>{error}</h2>}
      {data?.data[0].reports.map((report) => (
        <Report
          key={report.id}
          report_id={report.id}
          report={report.report}
          ticket_id={report.ticket_id}
        ></Report>
      ))}
      {data?.data[0].status.title == "pending" && user_role == "2" && (
        <h2>the ticket is pending...wait for Admin to add report</h2>
      )}
    </div>
  );
}

export default TicketDetails;
