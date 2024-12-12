import axios from "axios";

const API = axios.create({
  baseURL: "https://event-backend-6z9a.onrender.com/api",
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export const login = (formData) => API.post("/auth/login", formData);
export const register = (formData) => API.post("/auth/register", formData);
export const fetchEvents = () => API.get("/events");
export const createEvent = (eventData) => API.post("/events", eventData);
export const updateEvent = (id, eventData) =>
  API.put(`/events/${id}`, eventData);
export const deleteEvent = (id) => API.delete(`/events/${id}`);
