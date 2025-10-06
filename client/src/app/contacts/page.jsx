"use client";
import { useState, useEffect } from "react";
import { getAllContacts } from "../utils/contacts";
import { useSearchParams } from "next/navigation";

export default function ContactsPage() {
    const [contacts, setContacts] = useState([]);
    const searchParams = useSearchParams();
    const page = searchParams.get("page") || 1;

    useEffect(() => {
        getAllContacts(page).then(data => setContacts(data.contacts)).catch(err => console.error(err));
    }, [page]);

    return (
        <div>
            <h1>Contacts</h1>
            <ul>
                {contacts.map(contact => (
                    <li key={contact._id}><span className="lastname">{contact.lastName}</span> <span className="firstN">{contact.firstName}</span></li>
                ))}
            </ul>
        </div>
    );
}