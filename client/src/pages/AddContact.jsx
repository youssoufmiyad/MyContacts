import { useState, useRef } from "react";
import { addContact } from "../utils/contacts.js";

const AddContact = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const phoneRef = useRef(null);

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
      await addContact({ firstName, lastName, email, phone });
      alert("Contact added successfully");
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
    } catch (error) {
      console.error("Error adding contact:", error);
    }
  };
  return (
    <div>
      <section>
        <div className="content-container">
          <h1>Add Contact</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="firstName">First Name:</label>
              <input
                type="text"
                id="firstName"
                placeholder="First Name"
                ref={firstNameRef}
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name:</label>
              <input
                type="text"
                id="lastName"
                placeholder="Last Name"
                ref={lastNameRef}
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                placeholder="Email"
                ref={emailRef}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone:</label>
              <input
                type="tel"
                id="phone"
                placeholder="Phone"
                ref={phoneRef}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <button type="submit">Add Contact</button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default AddContact;
