import React from "react";

import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { deleteContact, getContact, modifyContact } from "../utils/contacts";
import Cookies from "js-cookie";

const ContactsDetail = () => {
  const [contact, setContact] = useState(null);
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const { slug } = useParams();
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const phoneRef = useRef(null);
  const emailRef = useRef(null);

  const focusFirstNameInput = () => {
    firstNameRef.current.focus();
  };

  const focusLastNameInput = () => {
    lastNameRef.current.focus();
  };

  const focusEmailInput = () => {
    emailRef.current.focus();
  };

  const focusPhoneInput = () => {
    phoneRef.current.focus();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await modifyContact(
        contact._id,
        { firstName, lastName, email, phone },
        Cookies.get("token")
      );
      alert("Contact updated successfully");
    } catch (error) {
      console.error("Error updating contact:", error);
    }
  };

  const handleDelete = async () => {
    try {
      const confirmed = confirm(
        "Are you sure you want to delete this contact?"
      );
      if (confirmed) {
        await deleteContact(contact._id, Cookies.get("token"));
        alert("Contact deleted successfully");
        window.location.href = "/contacts";
      }
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };

  useEffect(() => {
    getContact(slug)
      .then((data) => {
        setContact(data);
        setFirstName(data.firstName);
        setLastName(data.lastName);
        setEmail(data.email);
        setPhone(data.phone);
      })
      .catch((err) => console.error(err));
  }, [slug]);
  return (
    <div>
      <section>
        <div className="content-container">
          <h1>Contact Details</h1>
          {contact ? (
            <form className="contact-detail-form" onSubmit={handleSubmit}>
              <div className="form-group" onClick={focusFirstNameInput}>
                <label htmlFor="firstName">First Name:</label>
                <input
                  type="text"
                  id="firstName"
                  ref={firstNameRef}
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="form-group" onClick={focusLastNameInput}>
                <label htmlFor="lastName">Last Name:</label>
                <input
                  type="text"
                  id="lastName"
                  ref={lastNameRef}
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div className="form-group" onClick={focusEmailInput}>
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  ref={emailRef}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group" onClick={focusPhoneInput}>
                <label htmlFor="phone">Phone:</label>
                <input
                  type="tel"
                  id="phone"
                  ref={phoneRef}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="actions">
                <button type="submit">Update Contact</button>
                <button type="button" onClick={handleDelete}>
                  Delete contact
                </button>
              </div>
            </form>
          ) : (
            <p className="loading">Loading contact details...</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default ContactsDetail;
