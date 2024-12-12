import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(
          "https://event-backend-6z9a.onrender.com/api/events",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setEvents(response.data);
      } catch (err) {
        console.error("Error fetching events:", err);
      } finally {
        setLoading(false);
      }
    };
    if (token) {
      fetchEvents();
    } else {
      navigate("/login");
    }
  }, [token, navigate]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `https://event-backend-6z9a.onrender.com/api/events/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setEvents(events.filter((event) => event._id !== id));
    } catch (err) {
      console.error("Error deleting event:", err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="max-w-5xl p-4 mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl">Your Events</h1>
        {token && (
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-white bg-red-500 rounded"
          >
            Logout
          </button>
        )}
      </div>

      <Link
        to="/dashboard/create"
        className="inline-block px-4 py-2 mb-4 text-white bg-blue-500 rounded"
      >
        Create New Event
      </Link>

      {loading ? (
        <p>Loading events...</p>
      ) : (
        <div>
          {events.map((event) => (
            <div key={event._id} className="p-4 mb-4 border rounded">
              <h2 className="text-xl">{event.title}</h2>
              <p>{event.description}</p>
              <p>{new Date(event.date).toLocaleString()}</p>
              <div className="mt-4">
                <Link
                  to={`/dashboard/edit/${event._id}`}
                  className="mr-4 text-blue-500"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(event._id)}
                  className="text-red-500"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
