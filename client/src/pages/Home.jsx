import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      <header>
        <div className="content-container">
          <h1>HOME</h1>
          <p>Welcome to the Home Page!</p>
          <div className="actions">
            <button type="button" onClick={() => navigate("/signup")}>Sign up</button>
            <button type="button" onClick={() => navigate("/login")}>Login</button>
          </div>
        </div>
        
      </header>
      <section>
        <div className="content-container grid-3">
          <div className="grid-item">
            <h2>Keep a track of your contacts</h2>
            <p>Stay organized and never lose track of your important connections. MyContacts is here to help you manage your relationships effectively.</p>
          </div>
          <div className="grid-item">
            <h2>Log informations efficiently</h2>
            <p>MyContacts allows you to log and manage your contact information with ease.</p>
          </div>
          <div className="grid-item">
            <h2>Privacy Matters</h2>
            <p>Your privacy is our priority. We ensure that your data is handled with care and respect.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
