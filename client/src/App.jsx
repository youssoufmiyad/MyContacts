import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./pages/Home";
import Contacts from "./pages/Contacts";
import ContactsDetail from "./pages/ContactsDetail";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import AddContact from "./pages/AddContact";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import RedirectHome from "./components/RedirectHome";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route element={<RedirectHome />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Route>
        <Route element={<ProtectedRoutes />}>
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/contacts/:slug" element={<ContactsDetail />} />
          <Route path="/contacts/add" element={<AddContact />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
