import { useState } from 'react';
import { type CalendarEvent } from '../types/event';
import { getMonthName, getDaysInMonth, getFirstDayOfMonth, isToday } from '../utils/dateUtils';

interface CalendarProps {
  events: CalendarEvent[];
  onDateClick: (date: Date) => void;
  onEventClick: (event: CalendarEvent) => void;
}

export const Calendar = ({ events, onDateClick, onEventClick }: CalendarProps) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  
  const daysInMonth = getDaysInMonth(year, month);
  const firstDayOfMonth = getFirstDayOfMonth(year, month);
  
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };
  
  const goToNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };
  
  const goToToday = () => {
    setCurrentDate(new Date());
  };
  
  const getEventsForDate = (date: Date) => {
    return events.filter(event => {
      const eventStart = new Date(event.startDate);
      const eventEnd = new Date(event.endDate);
      return date >= eventStart && date <= eventEnd;
    });
  };
  
  const renderCalendarDays = () => {
    const days = [];
    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    
    weekDays.forEach(day => {
      days.push(
        <div key={day} className="calendar-weekday">
          {day}
        </div>
      );
    });
    
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }
    
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const dayEvents = getEventsForDate(date);
      const isCurrentDay = isToday(date);
      
      days.push(
        <div
          key={day}
          className={`calendar-day ${isCurrentDay ? 'today' : ''}`}
          onClick={() => onDateClick(date)}
        >
          <span className="day-number">{day}</span>
          <div className="day-events">
            {dayEvents.slice(0, 3).map(event => (
              <div
                key={event.id}
                className="day-event"
                style={{ backgroundColor: event.color }}
                onClick={(e) => {
                  e.stopPropagation();
                  onEventClick(event);
                }}
              >
                {event.title}
              </div>
            ))}
            {dayEvents.length > 3 && (
              <div className="more-events">+{dayEvents.length - 3} more</div>
            )}
          </div>
        </div>
      );
    }
    
    return days;
  };
  
  return (
    <div className="calendar">
      <div className="calendar-header">
        <button onClick={goToPreviousMonth} className="nav-button">
          &lt;
        </button>
        <h2 className="month-year">
          {getMonthName(month)} {year}
        </h2>
        <button onClick={goToNextMonth} className="nav-button">
          &gt;
        </button>
        <button onClick={goToToday} className="today-button">
          Today
        </button>
      </div>
      <div className="calendar-grid">
        {renderCalendarDays()}
      </div>
    </div>
  );
};