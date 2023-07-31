import React from "react";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

function SearchInput({ setSearch, search }) {
  return (
    <>
      <SearchOutlined style={{ fontSize: "large", padding: 10 }} />
      <Input
        placeholder="#id"
        name="search_input"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ maxWidth: 150 }}
      />
    </>
  );
}

export default SearchInput;
