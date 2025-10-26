'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Users, Calendar, CheckCircle, XCircle, Settings } from 'lucide-react';
import { useRouter } from 'next/navigation';

// Client Interface
interface Client {
  id: string;
  name: string;
  createdAt: string;
  active: boolean;
}

// Mocked HTTP Service with pagination
export const clientService = {
  async getClients(page: number = 1, pageSize: number = 10): Promise<{ data: Client[], hasMore: boolean }> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // All mocked data
    const allClients: Client[] = [
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
      },
      {
        id: "e1f2a3b4-c5d6-7890-5678-901234567890",
        name: "Safeway Pharmacy",
        createdAt: "2024-10-10T09:30:00Z",
        active: true
      },
      {
        id: "f2a3b4c5-d6e7-8901-6789-012345678901",
        name: "Hy-Vee Pharmacy",
        createdAt: "2024-10-15T14:00:00Z",
        active: true
      },
      {
        id: "a3b4c5d6-e7f8-9012-7890-123456789012",
        name: "Meijer Pharmacy",
        createdAt: "2024-10-20T11:15:00Z",
        active: true
      },
      {
        id: "b4c5d6e7-f8a9-0123-8901-234567890123",
        name: "Giant Eagle Pharmacy",
        createdAt: "2024-10-22T16:45:00Z",
        active: false
      },
      {
        id: "c5d6e7f8-a9b0-1234-9012-345678901234",
        name: "Wegmans Pharmacy",
        createdAt: "2024-10-24T10:20:00Z",
        active: true
      },
      {
        id: "d6e7f8a9-b0c1-2345-0123-456789012345",
        name: "H-E-B Pharmacy",
        createdAt: "2024-10-25T13:30:00Z",
        active: true
      },
      {
        id: "e7f8a9b0-c1d2-3456-1234-567890123456",
        name: "ShopRite Pharmacy",
        createdAt: "2024-10-26T08:50:00Z",
        active: true
      },
      {
        id: "f8a9b0c1-d2e3-4567-2345-678901234567",
        name: "Food Lion Pharmacy",
        createdAt: "2024-10-27T15:10:00Z",
        active: false
      },
      {
        id: "a9b0c1d2-e3f4-5678-3456-789012345678",
        name: "Stop & Shop Pharmacy",
        createdAt: "2024-10-28T11:40:00Z",
        active: true
      },
      {
        id: "b0c1d2e3-f4a5-6789-4567-890123456789",
        name: "Winn-Dixie Pharmacy",
        createdAt: "2024-10-29T14:25:00Z",
        active: true
      }
    ];

    // Paginate data
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedData = allClients.slice(startIndex, endIndex);
    const hasMore = endIndex < allClients.length;

    return {
      data: paginatedData,
      hasMore
    };
  }
};

// Client List Component
export default function ClientsPage() {
  const router = useRouter();
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  
  const observerTarget = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadClients(1, true);
  }, []);

  // Infinite scroll observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasMore && !loading && !loadingMore) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [hasMore, loading, loadingMore, page]);

  const loadClients = async (pageNum: number, isInitial: boolean = false) => {
    try {
      if (isInitial) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }
      
      const response = await clientService.getClients(pageNum, 10);
      
      if (isInitial) {
        setClients(response.data);
      } else {
        setClients(prev => [...prev, ...response.data]);
      }
      
      setHasMore(response.hasMore);
      setError(null);
    } catch (err) {
      setError('Unable to load clients');
      console.error(err);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const loadMore = useCallback(() => {
    const nextPage = page + 1;
    setPage(nextPage);
    loadClients(nextPage, false);
  }, [page]);

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
          onClick={() => loadClients(1, true)}
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
            {hasMore && ' (loading more...)'}
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

        {/* Loading indicator for infinite scroll */}
        {loadingMore && (
          <div className="flex justify-center items-center p-4 border-t">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        )}

        {/* Observer target for infinite scroll */}
        <div ref={observerTarget} className="h-4" />

        {!hasMore && clients.length > 0 && (
          <div className="text-center py-4 text-gray-500 text-sm border-t">
            All clients loaded
          </div>
        )}

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