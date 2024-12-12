import React from "react";

const EventList = ({ events, onEdit, onDelete }) => {
    return (
        <div className="mt-6">
            <h2 className="text-xl font-bold mb-4">Events</h2>
            <div className="space-y-4">
                {events.map((event) => (
                    <div
                        key={event._id}
                        className="bg-white p-4 rounded shadow-md flex justify-between"
                    >
                        <div>
                            <h3 className="font-semibold">{event.title}</h3>
                            <p>{event.description}</p>
                            <p className="text-sm text-gray-500">Date: {event.date}</p>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => onEdit(event)}
                                className="bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-600"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => onDelete(event._id)}
                                className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EventList;
