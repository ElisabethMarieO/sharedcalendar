# Shared Calendar

A full-stack calendar application built with React, TypeScript, Vite, Next.js, and SQLite.

## Features

- 📅 Monthly calendar view
- ➕ Create, edit, and delete events
- 🎨 Customizable event colors
- 📱 Responsive design
- ⚡ Real-time updates

## Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **Backend**: Next.js API Routes
- **Database**: SQLite with Prisma ORM
- **Styling**: CSS3 with modern design

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up the database:
```bash
npx prisma generate
npx prisma db push
```

### Running the Application

#### Development Mode

To run both frontend and backend simultaneously:
```bash
npm run dev:all
```

Or run them separately:
```bash
# Frontend (http://localhost:5173)
npm run dev

# Backend API (http://localhost:3000)
npm run dev:api
```

#### Production Build

```bash
# Build frontend
npm run build

# Build backend
npm run build:api
```

### API Endpoints

- `GET /api/events` - Get all events
- `POST /api/events` - Create a new event
- `GET /api/events/[id]` - Get event by ID
- `PUT /api/events/[id]` - Update event by ID
- `DELETE /api/events/[id]` - Delete event by ID

### Project Structure

```
├── src/
│   ├── components/          # React components
│   ├── hooks/              # Custom React hooks
│   ├── services/           # API service functions
│   ├── types/              # TypeScript type definitions
│   └── utils/              # Utility functions
├── pages/api/              # Next.js API routes
├── prisma/                 # Database schema and migrations
└── lib/                    # Shared utilities
```

## Usage

1. **View Calendar**: The main page displays a monthly calendar view
2. **Create Event**: Click on any date or use the "New Event" button
3. **Edit Event**: Click on an existing event to modify it
4. **Delete Event**: Use the delete button when editing an event
5. **Navigate**: Use the arrow buttons or "Today" button to navigate months

## Database Schema

### Event Model
- `id`: Unique identifier
- `title`: Event title (required)
- `description`: Optional event description
- `startDate`: Event start date/time
- `endDate`: Event end date/time
- `allDay`: Boolean for all-day events
- `color`: Event display color
- `createdAt`: Creation timestamp
- `updatedAt`: Last update timestamp
