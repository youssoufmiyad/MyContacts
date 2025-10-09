import api from "./axios";
import Cookies from "js-cookie";

export async function getAllContacts(page = 1, limit = 10) {
  try {
    const token = Cookies.get("token");
    const response = await api.get("/contacts", {
      params: {
        page,
        limit,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function searchContacts(query, page) {
  try {
    console.log(query, page);
    const token = Cookies.get("token");
    const response = await api.get("/contacts/search", {
      params: { page, query },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function getContact(slug) {
  try {
    const response = await api.get(`/contacts/${slug}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function getContactById(id) {
  try {
    const response = await api.get(`/contacts/id/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function addContact(contactData, token) {
  try {
    const response = await api.post("/contacts", contactData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function modifyContact(id, contactData, token) {
  try {
    const response = await api.patch(`/contacts/${id}`, contactData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.error(error);
  }
}

export async function deleteContact(id, token) {
  try {
    const response = await api.delete(`/contacts/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.error(error);
  }
}
