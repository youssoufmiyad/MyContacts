import { useState, useEffect } from "react";
import { getAllContacts, searchContacts } from "../utils/contacts";
import { useSearchParams } from "react-router-dom";

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page") || 1;
  const query = searchParams.get("query");

  useEffect(() => {
    if (query) {
      searchContacts(query)
        .then((data) => setContacts(data))
        .catch((err) => console.error(err));
    } else {
      getAllContacts(page)
        .then((data) => setContacts(data.contacts))
        .catch((err) => console.error(err));
    }
  }, [page, query]);

  useEffect(() => {
    console.log(contacts);
  }, [contacts]);
  return (
    <div>
      <h1>Contacts</h1>
      <ul>
        {contacts?.map((contact) => (
          <li key={contact._id}>
            <span className="lastname">{contact.lastName}</span>{" "}
            <span className="firstN">{contact.firstName}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Contacts;
