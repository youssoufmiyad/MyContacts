import React from "react";

import { useState, useEffect } from "react";
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
      <h1>Contact Details</h1>
      {contact ? (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="firstName">First Name:</label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="lastName">Last Name:</label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="phone">Phone:</label>
            <input
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <button type="submit">Update Contact</button>
          <button type="button" onClick={handleDelete}>
            Delete contact
          </button>
        </form>
      ) : (
        <p>Loading contact details...</p>
      )}
    </div>
  );
};

export default ContactsDetail;
