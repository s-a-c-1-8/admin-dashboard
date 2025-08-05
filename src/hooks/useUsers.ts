import { useState, useEffect } from 'react';
import { supabase, User } from '../lib/supabase';

interface UseUsersResult {
  users: User[];
  loading: boolean;
  error: string | null;
  totalCount: number;
  refetch: () => void;
}

interface UseUsersOptions {
  page: number;
  limit: number;
  search: string;
  sortField: keyof User;
  sortDirection: 'asc' | 'desc';
}

export function useUsers({
  page,
  limit,
  search,
  sortField,
  sortDirection,
}: UseUsersOptions): UseUsersResult {
  const [users, setUsers] = useState<User[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);

      let query = supabase.from('user-data').select('*', { count: 'exact' });

      // Apply search filter
      if (search) {
        query = query.or(
          `name.ilike.%${search}%,email.ilike.%${search}%,phone.ilike.%${search}%`
        );
      }

      // Apply sorting
      query = query.order(sortField, { ascending: sortDirection === 'asc' });

      // Apply pagination
      const from = (page - 1) * limit;
      const to = from + limit - 1;
      query = query.range(from, to);

      const { data, count, error } = await query;

      if (error) throw error;

      setUsers(data || []);
      setTotalCount(count || 0);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page, limit, search, sortField, sortDirection]);

  return {
    users,
    loading,
    error,
    totalCount,
    refetch: fetchUsers,
  };
}