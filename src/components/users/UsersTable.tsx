import React from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { User } from '../../lib/supabase';
import { Badge } from '../ui/Badge';
import { LoadingSpinner } from '../ui/LoadingSpinner';

interface UsersTableProps {
  users: User[];
  loading: boolean;
  sortField: keyof User;
  sortDirection: 'asc' | 'desc';
  onSort: (field: keyof User) => void;
}

export function UsersTable({ users, loading, sortField, sortDirection, onSort }: UsersTableProps) {
  const columns = [
    { key: 'name' as keyof User, label: 'Name', sortable: true },
    { key: 'email' as keyof User, label: 'Email', sortable: true },
    { key: 'phone' as keyof User, label: 'phone', sortable: true },
    { key: 'created_at' as keyof User, label: 'Created', sortable: true },
  ];

  const getSortIcon = (field: keyof User) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getphoneBadgeVariant = (phone: string) => {
    switch (phone) {
      case 'admin': return 'error';
      case 'moderator': return 'warning';
      default: return 'default';
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    return status === 'active' ? 'success' : 'default';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="overflow-hidden bg-white dark:bg-gray-800 shadow-sm rounded-lg">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-900">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider ${
                    column.sortable ? 'cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800' : ''
                  }`}
                  onClick={() => column.sortable && onSort(column.key)}
                >
                  <div className="flex items-center space-x-1">
                    <span>{column.label}</span>
                    {column.sortable && getSortIcon(column.key)}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    {user.name.toLowerCase().split(' ').map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(' ')}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500 dark:text-gray-400">{user.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Badge variant={getphoneBadgeVariant(user.phone)}>
                    {user.phone}
                  </Badge>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {formatDate(user.created_at)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {users.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">No users found</p>
        </div>
      )}
    </div>
  );
}