// app/clients/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { Users, Calendar, CheckCircle, XCircle, Settings } from 'lucide-react';
import { useRouter } from 'next/navigation';

// Client Interface
interface Client {
  id: string;
  name: string;
  createdAt: string;
  active: boolean;
}

// Mocked HTTP Service
export const clientService = {
  async getClients(): Promise<Client[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mocked data with US pharmacy chains
    return [
      {
        id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
        name: "Walgreens",
        createdAt: "2024-01-15T10:30:00Z",
        active: true
      },
      {
        id: "b2c3d4e5-f6a7-8901-bcde-f12345678901",
        name: "CVS Pharmacy",
        createdAt: "2024-02-20T14:45:00Z",
        active: true
      },
      {
        id: "c3d4e5f6-a7b8-9012-cdef-123456789012",
        name: "Rite Aid",
        createdAt: "2024-03-10T09:15:00Z",
        active: false
      },
      {
        id: "d4e5f6a7-b8c9-0123-def1-234567890123",
        name: "Walmart Pharmacy",
        createdAt: "2024-04-05T16:20:00Z",
        active: true
      },
      {
        id: "e5f6a7b8-c9d0-1234-ef12-345678901234",
        name: "Kroger Pharmacy",
        createdAt: "2024-05-12T11:00:00Z",
        active: true
      },
      {
        id: "f6a7b8c9-d0e1-2345-f123-456789012345",
        name: "Costco Pharmacy",
        createdAt: "2024-06-18T13:30:00Z",
        active: true
      },
      {
        id: "a7b8c9d0-e1f2-3456-1234-567890123456",
        name: "Albertsons Pharmacy",
        createdAt: "2024-07-22T08:45:00Z",
        active: false
      },
      {
        id: "b8c9d0e1-f2a3-4567-2345-678901234567",
        name: "Target Pharmacy",
        createdAt: "2024-08-30T15:10:00Z",
        active: true
      },
      {
        id: "c9d0e1f2-a3b4-5678-3456-789012345678",
        name: "Publix Pharmacy",
        createdAt: "2024-09-15T12:20:00Z",
        active: true
      },
      {
        id: "d0e1f2a3-b4c5-6789-4567-890123456789",
        name: "Sam's Club Pharmacy",
        createdAt: "2024-10-01T10:00:00Z",
        active: false
      }
    ];
  }
};

// Client List Component
export default function ClientsPage() {
  const router = useRouter();
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    loadClients();
  }, []);

  const loadClients = async () => {
    try {
      setLoading(true);
      const data = await clientService.getClients();
      setClients(data);
      setError(null);
    } catch (err) {
      setError('Unable to load clients');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const sortedClients = [...clients].sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.name.localeCompare(b.name);
    } else {
      return b.name.localeCompare(a.name);
    }
  });

  const toggleSortOrder = () => {
    setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric'
    });
  };

  const handleSettingsClick = (clientId: string) => {
    router.push(`/clients/${clientId}/settings`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 m-4">
        <p className="text-red-800">{error}</p>
        <button 
          onClick={loadClients}
          className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-blue-600 text-white p-4 flex items-center gap-2">
          <Users size={24} />
          <h2 className="text-xl font-bold">Clients</h2>
          <span className="ml-auto bg-blue-500 px-3 py-1 rounded-full text-sm">
            {clients.length} {clients.length === 1 ? 'client' : 'clients'}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={toggleSortOrder}
                >
                  <div className="flex items-center gap-2">
                    Name
                    <span className="text-blue-600">
                      {sortOrder === 'asc' ? '↑' : '↓'}
                    </span>
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created At
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedClients.map((client) => (
                <tr key={client.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">
                    {client.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {client.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Calendar size={16} />
                      {formatDate(client.createdAt)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {client.active ? (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        <CheckCircle size={14} />
                        Active
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        <XCircle size={14} />
                        Inactive
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleSettingsClick(client.id)}
                      className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded transition-colors"
                      title="Client Settings"
                    >
                      <Settings size={16} />
                      Settings
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {clients.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <Users size={48} className="mx-auto mb-4 opacity-50" />
            <p>No clients found</p>
          </div>
        )}
      </div>
    </div>
  );
}