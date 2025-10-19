import { useState } from 'react';
import { Calendar } from './components/Calendar';
import { EventForm } from './components/EventForm';
import { useEvents } from './hooks/useEvents';
import {  type CalendarEvent, type CreateEventData } from './types/event';
import './App.css';

function App() {
  const { events, loading, error, createEvent, updateEvent, deleteEvent } = useEvents();
  const [showEventForm, setShowEventForm] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    setSelectedEvent(null);
    setShowEventForm(true);
  };

  const handleEventClick = (event: CalendarEvent) => {
    setSelectedEvent(event);
    setSelectedDate(null);
    setShowEventForm(true);
  };

  const handleEventSubmit = async (eventData: CreateEventData) => {
    try {
      if (selectedEvent) {
        await updateEvent({ ...eventData, id: selectedEvent.id });
      } else {
        await createEvent(eventData);
      }
      setShowEventForm(false);
      setSelectedEvent(null);
      setSelectedDate(null);
    } catch (err) {
      console.error('Error saving event:', err);
    }
  };

  const handleEventCancel = () => {
    setShowEventForm(false);
    setSelectedEvent(null);
    setSelectedDate(null);
  };

  const handleDeleteEvent = async () => {
    if (selectedEvent && confirm('Are you sure you want to delete this event?')) {
      try {
        await deleteEvent(selectedEvent.id);
        setShowEventForm(false);
        setSelectedEvent(null);
      } catch (err) {
        console.error('Error deleting event:', err);
      }
    }
  };

  if (loading) {
    return <div className="loading">Loading calendar...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>My Calendar</h1>
        <button 
          className="new-event-button"
          onClick={() => {
            setSelectedDate(new Date());
            setSelectedEvent(null);
            setShowEventForm(true);
          }}
        >
          + New Event
        </button>
      </header>

      <main className="app-main">
        <Calendar
          events={events}
          onDateClick={handleDateClick}
          onEventClick={handleEventClick}
        />
      </main>

      {showEventForm && (
        <div>
          <EventForm
            event={selectedEvent}
            selectedDate={selectedDate}
            onSubmit={handleEventSubmit}
            onCancel={handleEventCancel}
          />
          {selectedEvent && (
            <button 
              className="delete-button"
              onClick={handleDeleteEvent}
            >
              Delete Event
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
