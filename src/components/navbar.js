import React from "react";
import { NavLink } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import { logout } from "../api/axios.js";
import { useNavigate } from "react-router-dom";
import { Space, Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../redux/userSlice";
import Logo from "../images/logo.png";

const { Text } = Typography;

function Navbar() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  //redux
  const myuser = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();

  //mutation to logout
  const mutation = useMutation(logout, {
    onSuccess: (response) => {
      // Invalidate and refetch
      queryClient.invalidateQueries("login");
      if (response.data.message == "Logged out successfully") {
        //redux remove token from state
        dispatch(removeUser());
        navigate("/login");
      }
    },
  });
  const handleLogout = () => {
    mutation.mutate();
  };
  return (
    <nav
      className="menuBar"
      style={{
        display: "flex",
        justifyContent: "space-between",
        paddingLeft: 60,
        paddingRight: 60,
        paddingTop: 20,
        paddingBottom: 10,
      }}
    >
      <img style={{ width: "80px" }} src={Logo} />
      <NavLink style={{ padding: "10px", textDecoration: "none" }} to="/">
        Home
      </NavLink>
      {!token && (
        <NavLink
          style={{ padding: "10px", textDecoration: "none" }}
          to="/login"
        >
          login
        </NavLink>
      )}
      {token && (
        <Space>
          <Text>{myuser.name}</Text>
          <Text
            style={{ padding: "10px", cursor: "pointer" }}
            onClick={handleLogout}
          >
            Logout
          </Text>
        </Space>
      )}
    </nav>
  );
}

export default Navbar;
