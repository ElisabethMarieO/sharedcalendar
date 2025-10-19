import { useState, useEffect } from 'react';
import {  type CalendarEvent, type CreateEventData } from '../types/event';
import { formatDateTime } from '../utils/dateUtils';

interface EventFormProps {
  event?: CalendarEvent | null;
  selectedDate?: Date | null;
  onSubmit: (eventData: CreateEventData) => void;
  onCancel: () => void;
}

export const EventForm = ({ event, selectedDate, onSubmit, onCancel }: EventFormProps) => {
  const [formData, setFormData] = useState<CreateEventData>({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    allDay: false,
    color: '#3B82F6',
  });

  useEffect(() => {
    if (event) {
      setFormData({
        title: event.title,
        description: event.description || '',
        startDate: formatDateTime(new Date(event.startDate)),
        endDate: formatDateTime(new Date(event.endDate)),
        allDay: event.allDay,
        color: event.color,
      });
    } else if (selectedDate) {
      const startDate = new Date(selectedDate);
      const endDate = new Date(selectedDate);
      endDate.setHours(startDate.getHours() + 1);
      
      setFormData({
        title: '',
        description: '',
        startDate: formatDateTime(startDate),
        endDate: formatDateTime(endDate),
        allDay: false,
        color: '#3B82F6',
      });
    }
  }, [event, selectedDate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.startDate || !formData.endDate) {
      alert('Please fill in all required fields');
      return;
    }
    onSubmit(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  return (
    <div className="event-form-overlay">
      <form className="event-form" onSubmit={handleSubmit}>
        <h3>{event ? 'Edit Event' : 'Create New Event'}</h3>
        
        <div className="form-group">
          <label htmlFor="title">Title *</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
          />
        </div>

        <div className="form-group">
          <label>
            <input
              type="checkbox"
              name="allDay"
              checked={formData.allDay}
              onChange={handleChange}
            />
            All Day Event
          </label>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="startDate">Start Date *</label>
            <input
              type={formData.allDay ? 'date' : 'datetime-local'}
              id="startDate"
              name="startDate"
              value={formData.allDay ? formData.startDate.split('T')[0] : formData.startDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="endDate">End Date *</label>
            <input
              type={formData.allDay ? 'date' : 'datetime-local'}
              id="endDate"
              name="endDate"
              value={formData.allDay ? formData.endDate.split('T')[0] : formData.endDate}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="color">Color</label>
          <input
            type="color"
            id="color"
            name="color"
            value={formData.color}
            onChange={handleChange}
          />
        </div>

        <div className="form-actions">
          <button type="button" onClick={onCancel} className="cancel-button">
            Cancel
          </button>
          <button type="submit" className="submit-button">
            {event ? 'Update' : 'Create'} Event
          </button>
        </div>
      </form>
    </div>
  );
};