import React from "react";
import { FilterOutlined } from "@ant-design/icons";
import { Select } from "antd";

function FilterSelect({ setFilter }) {
  return (
    <>
      <FilterOutlined style={{ fontSize: "large", padding: 10 }} />
      <Select
        name="filter_select"
        defaultValue={"all"}
        onChange={(value) => {
          setFilter(value);
        }}
      >
        <Select.Option value={"all"}>Select All</Select.Option>
        <Select.Option value={"pending"}>Pending</Select.Option>
        <Select.Option value={"finished"}>Finished</Select.Option>
      </Select>
    </>
  );
}

export default FilterSelect;
