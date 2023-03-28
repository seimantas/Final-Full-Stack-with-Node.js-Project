import axios from "axios";
import { useEffect, useState, useMemo, useContext } from "react";
import { TUser } from "../Users/UsersList/type";
import type { TEvent } from "./type";
import { Button, FormControl, InputLabel, Input, List, ListItem, Paper, Typography } from '@mui/material';
import { EventContext } from "../EventConext";


export const Events = () => {
  const [events, setEvents] = useState<TEvent[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<TEvent | null>(null);
  const [users, setUsers] = useState<TUser[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [newEventName, setNewEventName] = useState<string>("");
  const [triger, setTriger] = useState<boolean>(false);
  const [eventName, setEventName] = useState<string[]>([]);

  const EVENT_NAMES=useContext(EventContext)



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
    <EventContext.Provider value={{eventName,setEventName}}>
    <Paper sx={{ p: 2 }}>
      <Typography variant="h2" sx={{ mb: 2 }}>
        Events
      </Typography>
      {loading && <Typography>Loading...</Typography>}
      {error && <Typography color="error">Error: {error}</Typography>}
      <FormControl component="form" onSubmit={handleSubmitNewEvent} sx={{ mb: 2 }}>
        <InputLabel htmlFor="new-event-name-input">New Event Name:</InputLabel>
        <Input
          id="new-event-name-input"
          type="text"
          value={newEventName}
          onChange={(event) => setNewEventName(event.target.value)}
        />
        <Button variant="contained" type="submit" sx={{ ml: 1 }}>Create</Button>
      </FormControl>
      <List sx={{ mb: 2 }}>
        {events.map((event) => (
          <ListItem key={event._id} button onClick={() => handleEventClick(event)}>
            <Typography sx={{ flexGrow: 1 }}>{event.eventName}</Typography>
            <Button key={`${event._id}`} onClick={() => handleDeleteEvent(event)}>Delete</Button>
          </ListItem>
        ))}
      </List>
      {selectedEvent && (
        <Paper sx={{ p: 2 }}>
          <Typography variant="h2" sx={{ mb: 2 }}>
            {selectedEvent.eventName} Participants
          </Typography>
          <List>
            {memoizedUsers.map((user) => (
              <ListItem key={user._id}>
                <Typography>{user.firstName} {user.lastName}</Typography>
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
    </Paper>
    </EventContext.Provider>
  );
}