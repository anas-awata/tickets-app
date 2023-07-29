import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./views/login.js";
import Register from "./views/register";
import Home from "./views/home";
import Navbar from "./components/navbar";
import RequireAuth from "./utils/requireAuth";
import TicketDetails from "./views/ticketDetails.js";
import { useSelector } from "react-redux";
function App() {
  const myuser = useSelector((state) => state.user);
  return (
    <div className="App">
      {
        //render navbar only when logged in
        myuser.id && <Navbar />
      }
      <Routes>
        <Route
          path="/"
          element={
            <RequireAuth>
              <Home />
            </RequireAuth>
          }
        />

        <Route
          path="ticket/:id"
          element={
            <RequireAuth>
              <TicketDetails />
            </RequireAuth>
          }
        />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
