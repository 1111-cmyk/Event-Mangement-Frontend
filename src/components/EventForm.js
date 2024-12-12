import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EventForm = () => {
  const [event, setEvent] = useState({ title: "", description: "", date: "" });
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (id) {
      const fetchEvent = async () => {
        try {
          const response = await axios.get(
            `https://event-backend-6z9a.onrender.com/api/events/${id}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          const eventData = response.data;

          // Transform date for datetime-local input
          const formattedDate = eventData.date
            ? new Date(eventData.date).toISOString().slice(0, 16) // Format to YYYY-MM-DDTHH:MM
            : "";
          setEvent({ ...eventData, date: formattedDate });
        } catch (err) {
          console.error("Error fetching event details:", err);
        }
      };
      fetchEvent();
    }
  }, [id, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Ensure the date is converted back to ISO 8601 for backend
      const eventData = { ...event, date: new Date(event.date).toISOString() };
      let response;

      if (id) {
        response = await axios.put(
          `https://event-backend-6z9a.onrender.com/api/events/${id}`,
          eventData,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      } else {
        response = await axios.post(
          "https://event-backend-6z9a.onrender.com/api/events",
          eventData,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      }
      navigate("/dashboard");
    } catch (err) {
      console.error("Error submitting event:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setEvent({ ...event, [e.target.name]: e.target.value });
  };

  return (
    <div className="max-w-lg p-4 mx-auto bg-white rounded-lg shadow-md">
      <h2 className="mb-4 text-2xl">{id ? "Edit Event" : "Create Event"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={event.title}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            value={event.description}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Event Date
          </label>
          <input
            type="datetime-local"
            name="date"
            value={event.date}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div className="mb-4">
          <button
            type="submit"
            className={`w-full p-2 bg-blue-500 text-white rounded-md ${
              loading && "opacity-50 cursor-not-allowed"
            }`}
            disabled={loading}
          >
            {loading ? "Saving..." : id ? "Update Event" : "Create Event"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EventForm;
