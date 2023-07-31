import React, { useEffect, useState } from "react";
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
  Select,
  Col,
} from "antd";
import { getTickets } from "../api/axios.js";
import { useSelector } from "react-redux";
import Ticket from "../components/ticket.js";
import CreateTicketsForm from "../components/createTicketsForm.js";
import NoTickets from "../images/svgs/noTickets.js";
import ServicesSvg from "../images/svgs/servicesSvg.js";
import FilterSelect from "../components/filterSelect.js";
import SearchInput from "../components/searchInput.js";

function Home() {
  const token = useSelector((state) => state.token);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  //get tickets data
  const { data, isLoading, isError, error } = useQuery(
    "getTickets",
    getTickets
  );

  let filteredData = data?.data.data.filter((item) => {
    if (filter == "all") return data.data.data;
    return item.status.title.includes(filter);
  });

  console.log(filteredData);

  let searchedData = filteredData?.filter((item) => {
    if (search == "") return filteredData;
    return item.id.toString().includes(search);
  });
  console.log(searchedData);

  return (
    <Row justify="center" align="middle">
      <Col md={8} xs={0}>
        <ServicesSvg />
      </Col>
      <Col md={12} xs={24}>
        {<CreateTicketsForm />}
      </Col>
      <Col style={{ paddingTop: 30 }} span={24}>
        <h1>Your Tickets</h1>
      </Col>
      <Col md={6} xs={24} prefix={6}>
        <FilterSelect setFilter={setFilter} />
      </Col>
      <Col
        md={6}
        xs={24}
        prefix={6}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <SearchInput setSearch={setSearch} search={search} />
      </Col>
      <Col span={24} style={{ paddingTop: 20 }}>
        {isLoading && (
          <Spin size="large" style={{ display: "block", padding: "50px" }} />
        )}
        {isError && (
          <h2 style={{ display: "block", padding: "50px" }}>{error}</h2>
        )}
        {!isError && (
          <Space
            align="center"
            size="middle"
            style={{ display: "flex", padding: 100, paddingTop: 10 }}
            wrap
          >
            {searchedData?.map((ticket) => (
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
        {searchedData?.length == 0 && (
          <Row justify="center" align="middle">
            <Col span={16}>
              <NoTickets />
            </Col>
            <Col span={16}>
              <p style={{ fontSize: "x-large", paddingLeft: 45 }}>
                No Tickets Found
              </p>
            </Col>
          </Row>
        )}
      </Col>
    </Row>
  );
}

export default Home;
