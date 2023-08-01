import React, { useState, useMemo } from "react";
import { useQuery } from "react-query";
import { Row, Spin, Col } from "antd";
import { getTickets } from "../api/axios.js";
import Ticket from "../components/ticket.js";
import CreateTicketsForm from "../components/createTicketsForm.js";
import NoTickets from "../images/svgs/noTickets.js";
import ServicesSvg from "../images/svgs/servicesSvg.js";
import FilterSelect from "../components/filterSelect.js";
import SearchInput from "../components/searchInput.js";

function Home() {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  //get tickets data
  const { data, isLoading, isError, error } = useQuery(
    "getTickets",
    getTickets
  );

  //filter data
  //useMemo to not recalculate unless data or filter changed
  const filteredData = useMemo(() => {
    if (!data) return null;
    if (filter === "all") return data.data.data;
    return data.data.data.filter((item) => item.status.title.includes(filter));
  }, [data, filter]);

  //search in filtered data
  //useMemo to not recalculate unless filteredData or search changed
  const searchedData = useMemo(() => {
    if (!filteredData) return null;
    if (search === "") return filteredData;
    return filteredData.filter((item) => item.id.toString().includes(search));
  }, [filteredData, search]);

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
          <h2 style={{ display: "block", padding: "50px" }}>{error.message}</h2>
        )}
        {!isError && searchedData && searchedData.length > 0 && (
          <Row justify="center" align={"middle"} gutter={16}>
            {searchedData?.map((ticket) => (
              <Col
                key={ticket.id}
                xs={20}
                md={10}
                xl={5}
                style={{ paddingBottom: 25 }}
              >
                <Ticket
                  id={ticket.id}
                  title={ticket.service.title}
                  price={ticket.service.price}
                  status={ticket.status.title}
                  client={ticket.client.name}
                />
              </Col>
            ))}
          </Row>
        )}
        {!isError && searchedData && searchedData.length === 0 && (
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
