import React, { useState, useMemo } from 'react';
import { useUsers } from '../hooks/useUsers';
import { UsersTable } from '../components/users/UsersTable';
import { SearchAndFilters } from '../components/users/SearchAndFilters';
import { Pagination } from '../components/users/Pagination';
import { User } from '../lib/supabase';

export function Users() {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');
  const [sortField, setSortField] = useState<keyof User>('created_at');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  
  const itemsPerPage = 10;

  const { users, loading, error, totalCount } = useUsers({
    page: currentPage,
    limit: itemsPerPage,
    search,
    sortField,
    sortDirection,
  });

  const totalPages = Math.ceil(totalCount / itemsPerPage);

  const handleSort = (field: keyof User) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleSearchChange = (newSearch: string) => {
    setSearch(newSearch);
    setCurrentPage(1); // Reset to first page when searching
  };

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-600 dark:text-red-400 mb-4">Error loading users</div>
        <p className="text-gray-500 dark:text-gray-400">{error}</p>
      </div>
    );
  }

  return (
    <div>
      {/* <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Users</h1>
        <p className="text-gray-600 dark:text-gray-400">Manage your application users</p>
      </div> */}

      <SearchAndFilters search={search} onSearchChange={handleSearchChange} />

      <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg overflow-hidden">
        <UsersTable
          users={users}
          loading={loading}
          sortField={sortField}
          sortDirection={sortDirection}
          onSort={handleSort}
        />

        {totalCount > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={totalCount}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </div>
  );
}