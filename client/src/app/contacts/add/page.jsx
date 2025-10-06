"use client";
import { useState } from "react";
import { addContact } from "../../utils/contacts";

export default function AddContactPage()  {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

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
        <h1>Add Contact</h1>
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
            <button type="submit">Add Contact</button>
        </form>
    </div>
)
}