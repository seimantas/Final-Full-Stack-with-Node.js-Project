import axios from "axios";
import { useEffect, useState, useMemo } from "react";
import { TUser } from "../UsersList/type";
import type { TEvent } from "./type";

export const Events = () => {
  const [events, setEvents] = useState<TEvent[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<TEvent | null>(null);
  const [users, setUsers] = useState<TUser[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [newEventName, setNewEventName] = useState<string>("");
  const [triger, setTriger] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);

    axios
      .get("http://localhost:5000/events", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setEvents(response.data);
        setLoading(false);
      })

      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [triger]);

  useEffect(() => {
    if (selectedEvent) {
      setLoading(true);

      axios
        .get(
          `http://localhost:5000/users?eventName=${selectedEvent.eventName}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((response) => {
          setUsers(response.data);
          setLoading(false);
        })

        .catch((error) => {
          setError(error.message);
          setLoading(false);
        });
    }
  }, [selectedEvent]);

  const handleDeleteEvent = async (event: TEvent) => {
    setLoading(true);
    try {
      await axios.delete(`http://localhost:5000/events/${event.eventName}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const updatedEvents = events.filter((e) => e.eventName !== event.eventName);
      setEvents(updatedEvents);
    } catch (error) {
        setError(error as string);
    }
    setLoading(false);
  };

  const handleEventClick = (event: TEvent) => {
    setSelectedEvent(event);
  };
 
 
  const handleSubmitNewEvent = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/events",
        { eventName: newEventName },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setEvents([...events, response.data]);
      setNewEventName("");
      setTriger(!triger)
    } catch (error) {
      setError(error as string);
    }
    setLoading(false);
  };

  const memoizedUsers = useMemo(() => users, [users]);

  return (
    <div>
      <h2>Events</h2>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <form onSubmit={handleSubmitNewEvent}>
        <label>
          New Event Name:
          <input
            type="text"
            value={newEventName}
            onChange={(event) => setNewEventName(event.target.value)}
          />
        </label>
        <button type="submit">Create</button>
      </form>
      <ul>
      {events.map((event: TEvent) => (
            <li key={event._id} onClick={() => handleEventClick(event)}>
            {event.eventName}
            <button key={`${event._id}`} onClick={() => handleDeleteEvent(event)}>Delete</button>
          </li>
        ))}
      </ul>
      {selectedEvent && (
        <div>
          <h2>{selectedEvent.eventName} Participants</h2>
          <ul>
            {memoizedUsers.map((user: TUser) => (
              <li key={user._id}>
              {user.firstName} {user.lastName}
            </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};