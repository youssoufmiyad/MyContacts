import React from "react";
import { useAuth } from "../hooks/useAuth";

const Footer = () => {
  const { isAuthenticated } = useAuth();

  return (
    <footer>
        <div className="content-container sm">
          <ul className="links">
            {!isAuthenticated ? (
              <>
                <li>
                  <a href="/signup">Sign up</a>
                </li>
                <li>
                  <a href="/login">Login</a>
                </li>
              </>
            ) : (
              <>
                <li>
                  <a href="/contacts">My Contacts</a>
                </li>
                <li>
                  <a href="/contacts/add">Add Contact</a>
                </li>
              </>
            )}
          </ul>
          <p className="copyright">
            &copy; {new Date().getFullYear()} MyContacts. All rights reserved.
          </p>
        </div>
    </footer>
  );
};

export default Footer;
