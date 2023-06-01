import { Routes, Route } from "react-router-dom";
import Login from "./components/login-in/login-in-form";
import RegistrationForm from "./components/register/registration-form";
import Home from "./page/home/home";
import TicketBuying from "./page/ticket-buying/ticket-buying";

function App() {
  return (
    <>
       <Routes>
       <Route path="/" element={<Login />} />
       <Route path="/ticket/:id" element={<TicketBuying />} />
        <Route path="register" element={<RegistrationForm />} />
        <Route path="Home" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
