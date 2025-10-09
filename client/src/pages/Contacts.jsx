import { useState, useEffect } from "react";
import { getAllContacts, searchContacts } from "../utils/contacts";
import { useSearchParams } from "react-router-dom";

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1 });
  const [page, setPage] = useState(searchParams.get("page") || 1);
  const [query, setQuery] = useState(searchParams.get("query") || "");

  useEffect(() => {
    if (query) {
      searchContacts(query, page)
        .then((data) => {
          setContacts(data.contacts);
          setPagination({
            page: data.page,
            totalPages: data.totalPages,
          });
        })
        .catch((err) => console.error(err));
    } else {
      getAllContacts(page)
        .then((data) => {
          setContacts(data.contacts);
          setPagination({
            page: data.page,
            totalPages: data.totalPages,
          });
        })
        .catch((err) => console.error(err));
    }
  }, [page, query]);

  return (
    <div className="contacts-page">
      <section>
        <div className="content-container">
          <h1>Contacts</h1>
          {contacts ? (
            <>
              <ul className="contacts-list">
                {contacts?.map((contact) => (
                  <li key={contact._id} className="contact-item">
                    <a href={`/contacts/${contact.slug}`}>
                      <span className="lastname">{contact.lastName}</span>{" "}
                      <span className="firstname">{contact.firstName}</span>
                    </a>
                  </li>
                ))}
              </ul>
              <div className="pagination">
                <button
                  onClick={() => {
                    setPage(pagination.page - 1);
                    setSearchParams({
                      page: pagination.page - 1,
                      query: query ?? "",
                    });
                  }}
                  disabled={pagination.page === 1}
                >
                  Previous
                </button>
                <span>
                  Page {pagination.page} of {pagination.totalPages}
                </span>
                <button
                  onClick={() => {
                    setPage(pagination.page + 1);
                    setSearchParams({
                      page: pagination.page + 1,
                      query: query ?? "",
                    });
                  }}
                  disabled={pagination.page === pagination.totalPages}
                >
                  Next
                </button>
              </div>
            </>
          ) : (
            <p>no contacts</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Contacts;
