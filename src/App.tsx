import React from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { AdminLayout } from './components/layout/AdminLayout';
import { Users } from './pages/Users';

function App() {
  return (
    <ThemeProvider>
      <AdminLayout>
        <Users />
      </AdminLayout>
    </ThemeProvider>
  );
}

export default App;