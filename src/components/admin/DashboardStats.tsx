// src/components/admin/DashboardStats.tsx
'use client';

type StatsProps = {
  stats: {
    totalProducts: number;
    bestsellers: number;
    newArrivals: number;
    lowStock: number;
  };
};

export default function DashboardStats({ stats }: StatsProps) {
  const statItems = [
    {
      name: 'Total Products',
      value: stats.totalProducts,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
          />
        </svg>
      ),
      bgColor: 'bg-blue-100',
      textColor: 'text-blue-700',
    },
    {
      name: 'Bestsellers',
      value: stats.bestsellers,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
          />
        </svg>
      ),
      bgColor: 'bg-green-100',
      textColor: 'text-green-700',
    },
    {
      name: 'New Arrivals',
      value: stats.newArrivals,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
      ),
      bgColor: 'bg-purple-100',
      textColor: 'text-purple-700',
    },
    {
      name: 'Low Stock',
      value: stats.lowStock,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      ),
      bgColor: 'bg-red-100',
      textColor: 'text-red-700',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {statItems.map((item) => (
        <div
          key={item.name}
          className={`${item.bgColor} p-4 rounded-lg shadow-sm flex items-center`}
        >
          <div className={`${item.textColor} mr-4`}>{item.icon}</div>
          <div>
            <p className="text-gray-500 text-sm">{item.name}</p>
            <p className={`text-xl font-bold ${item.textColor}`}>
              {item.value}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
