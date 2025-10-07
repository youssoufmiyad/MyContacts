import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./pages/Home";
import Contacts from "./pages/Contacts";
import ContactsDetail from "./pages/ContactsDetail";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import AddContact from "./pages/AddContact";
import ProtectedRoutes from "./components/ProtectedRoutes";

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contacts" element={<Contacts />} />
          {/* <ProtectedRoutes> */}
            <Route path="/contacts/:slug" element={<ContactsDetail />} />
            <Route path="/contacts/add" element={<AddContact />} />
          {/* </ProtectedRoutes> */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
