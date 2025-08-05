import React from 'react';
import { Users, UserCheck, UserX, Crown } from 'lucide-react';

export function Dashboard() {
  const stats = [
    {
      name: 'Total Users',
      value: '25',
      icon: Users,
      change: '+2.1%',
      changeType: 'positive',
    },
    {
      name: 'Active Users',
      value: '21',
      icon: UserCheck,
      change: '+5.4%',
      changeType: 'positive',
    },
    {
      name: 'Inactive Users',
      value: '4',
      icon: UserX,
      change: '-1.2%',
      changeType: 'negative',
    },
    {
      name: 'Admins',
      value: '3',
      icon: Crown,
      change: '0%',
      changeType: 'neutral',
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">Welcome to your admin dashboard</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.name} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Icon className="h-8 w-8 text-blue-600" />
                </div>
                <div className="ml-4 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                      {stat.name}
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900 dark:text-white">
                        {stat.value}
                      </div>
                      <div className={`ml-2 flex items-baseline text-sm font-semibold ${
                        stat.changeType === 'positive' 
                          ? 'text-green-600' 
                          : stat.changeType === 'negative' 
                          ? 'text-red-600' 
                          : 'text-gray-500'
                      }`}>
                        {stat.change}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <button className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-left transition-colors">
            <h3 className="font-medium text-gray-900 dark:text-white">Manage Users</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">View and manage user accounts</p>
          </button>
          <button className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-left transition-colors">
            <h3 className="font-medium text-gray-900 dark:text-white">System Settings</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Configure application settings</p>
          </button>
          <button className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-left transition-colors">
            <h3 className="font-medium text-gray-900 dark:text-white">View Reports</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Access detailed analytics</p>
          </button>
        </div>
      </div>
    </div>
  );
}