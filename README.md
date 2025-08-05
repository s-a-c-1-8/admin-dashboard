# Admin Dashboard

A modern, full-stack admin dashboard built with React, Vite, Tailwind CSS, and Supabase.

## Features

- 🎨 Modern, responsive UI with dark/light mode
- 📊 Interactive data tables with pagination, search, and sorting
- 🔐 Supabase integration for real-time data
- 📱 Mobile-first responsive design
- ⚡ Fast development with Vite
- 🎯 TypeScript for type safety

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Routing**: React Router DOM
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd admin-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Supabase**
   
   a. Create a new project at [supabase.com](https://supabase.com)
   
   b. Go to Settings > API to get your project URL and anon key
   
   c. Copy `.env.example` to `.env` and fill in your Supabase credentials:
   ```bash
   cp .env.example .env
   ```
   
   d. Update `.env` with your Supabase credentials:
   ```
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```

4. **Set up the database**
   
   In your Supabase dashboard, go to the SQL Editor and run the migration file:
   ```sql
   -- Copy and paste the contents of supabase/migrations/20250804082458_empty_harbor.sql
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   
   Navigate to `http://localhost:5173` to see the application.

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── layout/         # Layout components (AdminLayout)
│   ├── ui/             # Basic UI components (Badge, LoadingSpinner)
│   └── users/          # User-specific components
├── contexts/           # React contexts (ThemeContext)
├── hooks/              # Custom React hooks
├── lib/                # Utilities and configurations
├── pages/              # Page components
└── main.tsx           # Application entry point

supabase/
└── migrations/         # Database migration files
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Features Overview

### Dashboard
- Overview statistics cards
- Quick action buttons
- Responsive grid layout

### Users Management
- Paginated table (10 items per page)
- Search functionality (name, email)
- Column sorting (ascending/descending)
- Role and status badges
- Responsive design

### Settings
- Application configuration
- Notification preferences
- Database settings
- Form validation

### UI/UX Features
- Dark/light mode toggle
- Loading states
- Error handling
- Smooth animations
- Mobile-responsive sidebar
- Professional design system

## Database Schema

The application uses a `users` table with the following structure:

```sql
users (
  id uuid PRIMARY KEY,
  email text UNIQUE NOT NULL,
  first_name text NOT NULL,
  last_name text NOT NULL,
  role text NOT NULL DEFAULT 'user',
  status text NOT NULL DEFAULT 'active',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
)
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_SUPABASE_URL` | Your Supabase project URL | Yes |
| `VITE_SUPABASE_ANON_KEY` | Your Supabase anonymous key | Yes |

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

MIT License - see LICENSE file for details.