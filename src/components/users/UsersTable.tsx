import React from "react";
// Import the Download icon
import { ChevronUp, ChevronDown, Download } from "lucide-react";
import { User } from "../../lib/supabase";
import { Badge } from "../ui/Badge";
import { LoadingSpinner } from "../ui/LoadingSpinner";

interface UsersTableProps {
  users: User[];
  loading: boolean;
  sortField: keyof User;
  sortDirection: "asc" | "desc";
  onSort: (field: keyof User) => void;
}

export function UsersTable({
  users,
  loading,
  sortField,
  sortDirection,
  onSort,
}: UsersTableProps) {
  const columns = [
    { key: "name" as keyof User, label: "Name", sortable: true },
    { key: "email" as keyof User, label: "Email", sortable: true },
    { key: "phone" as keyof User, label: "Phone", sortable: true }, // Corrected label casing
    { key: "created_at" as keyof User, label: "Created", sortable: true },
  ];

  const getSortIcon = (field: keyof User) => {
    if (sortField !== field) return null;
    return sortDirection === "asc" ? (
      <ChevronUp size={16} />
    ) : (
      <ChevronDown size={16} />
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Renamed for clarity to reflect its purpose for the 'phone' column
  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case "admin":
        return "error";
      case "moderator":
        return "warning";
      default:
        return "default";
    }
  };

  /**
   * Generates a CSV file from the user data and triggers a download.
   */
  const handleDownloadCSV = () => {
    if (users.length === 0) return;

    // 1. Create CSV header from columns
    const headers = columns.map((c) => c.label).join(",");

    // 2. Create CSV rows from user data
    const csvRows = users.map((user) => {
      // Ensure data formatting is consistent with the table display
      const formattedName = user.name
        .toLowerCase()
        .split(" ")
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(" ");
      const formattedDate = formatDate(user.created_at);

      // Wrap each field in quotes to handle potential commas in data
      const row = [
        `"${formattedName}"`,
        `"${user.email}"`,
        `"${user.phone}"`,
        `"${formattedDate}"`,
      ].join(",");

      return row;
    });

    // 3. Combine header and rows
    const csvContent = [headers, ...csvRows].join("\n");

    // 4. Create a Blob and trigger download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `users_${new Date().toISOString()}.csv`);
    document.body.appendChild(link); // Append to body to ensure visibility
    link.click();

    // 5. Clean up by removing the link
    document.body.removeChild(link);
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
      {/* Download Button Section */}
      <div className="p-4 flex justify-end border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={handleDownloadCSV}
          disabled={users.length === 0}
          className="inline-flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Download size={16} />
          <span>Download CSV</span>
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-900">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider ${
                    column.sortable
                      ? "cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
                      : ""
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
              <tr
                key={user.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    {user.name
                      .toLowerCase()
                      .split(" ")
                      .map(
                        (part) => part.charAt(0).toUpperCase() + part.slice(1)
                      )
                      .join(" ")}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {user.email}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {/* I assumed 'phone' was meant to be 'role' based on the logic, so I renamed the function. If it is indeed a phone number, you may want to adjust this logic. */}
                  <Badge variant={getRoleBadgeVariant(user.phone)}>
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

      {users.length === 0 && !loading && (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">No users found</p>
        </div>
      )}
    </div>
  );
}
