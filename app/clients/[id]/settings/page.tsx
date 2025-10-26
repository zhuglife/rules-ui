// app/clients/[id]/settings/page.tsx
'use client';

import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Settings, FileText, Search, X, Download } from 'lucide-react';
import { useEffect, useState } from 'react';

// Rule Interface
interface Rule {
  id: string;
  clientId: string;
  bin: string;
  pcn: string;
  groupNumber: string;
  createdAt: string;
  excludedNPIs: string[];
  excludedNDCs: string[];
  includedNPIs: string[];
  allowedNDCs: string[];
}

// Mocked Rules Service
const rulesService = {
  async getAllRules(): Promise<Rule[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Mocked response - all rules from the API
    return [
      {
        id: "rule-001",
        clientId: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
        bin: "003858",
        pcn: "A4",
        groupNumber: "WLGN001",
        createdAt: "2024-01-20T10:00:00Z",
        excludedNPIs: ["1234567890", "2345678901", "3456789012"],
        excludedNDCs: ["5555566677", "6666677788", "7777788899"],
        includedNPIs: ["1111111111", "2222222222"],
        allowedNDCs: ["0045612340", "1234567890", "9876543210", "1111122233"]
      },
      {
        id: "rule-002",
        clientId: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
        bin: "610020",
        pcn: "MEDDADV",
        groupNumber: "WLGN002",
        createdAt: "2024-02-15T14:30:00Z",
        excludedNPIs: ["4567890123", "5678901234"],
        excludedNDCs: ["8888899900", "9999900011"],
        includedNPIs: ["3333333333", "4444444444", "5555555555"],
        allowedNDCs: ["2222233344", "3333344455"]
      },
      {
        id: "rule-003",
        clientId: "b2c3d4e5-f6a7-8901-bcde-f12345678901",
        bin: "610020",
        pcn: "CAREMARK",
        groupNumber: "CVS12345",
        createdAt: "2024-01-25T09:15:00Z",
        excludedNPIs: ["6789012345", "7890123456", "8901234567", "9012345678"],
        excludedNDCs: ["0000011122", "1111122233", "2222233344"],
        includedNPIs: ["6666666666"],
        allowedNDCs: ["4444455566", "5555566677", "6666677788"]
      },
      {
        id: "rule-004",
        clientId: "b2c3d4e5-f6a7-8901-bcde-f12345678901",
        bin: "003858",
        pcn: "CN",
        groupNumber: "CVSHP001",
        createdAt: "2024-03-10T11:20:00Z",
        excludedNPIs: ["0123456789"],
        excludedNDCs: ["3333344455", "4444455566"],
        includedNPIs: ["7777777777", "8888888888"],
        allowedNDCs: ["7777788899", "8888899900", "9999900011", "0000011122", "1111122233"]
      },
      {
        id: "rule-005",
        clientId: "b2c3d4e5-f6a7-8901-bcde-f12345678901",
        bin: "610600",
        pcn: "SILVER",
        groupNumber: "CVS98765",
        createdAt: "2024-04-05T16:45:00Z",
        excludedNPIs: ["1357924680", "2468013579"],
        excludedNDCs: ["5555566677"],
        includedNPIs: ["9999999999"],
        allowedNDCs: ["1212134345", "5656578789"]
      },
      {
        id: "rule-006",
        clientId: "c3d4e5f6-a7b8-9012-cdef-123456789012",
        bin: "610127",
        pcn: "ENVISION",
        groupNumber: "RTAID100",
        createdAt: "2024-02-01T08:30:00Z",
        excludedNPIs: ["9876543210", "8765432109", "7654321098"],
        excludedNDCs: ["6666677788", "7777788899"],
        includedNPIs: ["0000000000", "1010101010"],
        allowedNDCs: ["9090912121", "8080823232"]
      },
      {
        id: "rule-007",
        clientId: "d4e5f6a7-b8c9-0123-def1-234567890123",
        bin: "610455",
        pcn: "WALMART",
        groupNumber: "WMT00123",
        createdAt: "2024-03-15T12:00:00Z",
        excludedNPIs: ["6543210987"],
        excludedNDCs: ["8888899900"],
        includedNPIs: ["2020202020"],
        allowedNDCs: ["7070734343", "6060645454", "5050556565"]
      },
      {
        id: "rule-008",
        clientId: "d4e5f6a7-b8c9-0123-def1-234567890123",
        bin: "600428",
        pcn: "4PLUS",
        groupNumber: "WMT00456",
        createdAt: "2024-04-20T10:30:00Z",
        excludedNPIs: ["5432109876", "4321098765", "3210987654", "2109876543", "1098765432"],
        excludedNDCs: ["9999900011", "0000011122"],
        includedNPIs: ["3030303030", "4040404040"],
        allowedNDCs: ["4040467676", "3030378787"]
      },
      {
        id: "rule-009",
        clientId: "e5f6a7b8-c9d0-1234-ef12-345678901234",
        bin: "610097",
        pcn: "KROGR",
        groupNumber: "KRG55789",
        createdAt: "2024-05-18T09:00:00Z",
        excludedNPIs: ["0987654321", "9876543210"],
        excludedNDCs: ["1111122233"],
        includedNPIs: ["5050505050"],
        allowedNDCs: ["2020289898", "1010190909", "0101012112"]
      },
      {
        id: "rule-010",
        clientId: "f6a7b8c9-d0e1-2345-f123-456789012345",
        bin: "610455",
        pcn: "COSTCO",
        groupNumber: "CST88321",
        createdAt: "2024-06-22T14:15:00Z",
        excludedNPIs: ["8765432100", "7654321009"],
        excludedNDCs: ["2222233344", "3333344455"],
        includedNPIs: ["6060606060", "7070707070"],
        allowedNDCs: ["9988776655", "8877665544", "7766554433", "6655443322"]
      }
    ];
  },

  // Filter rules by client ID
  filterByClientId(rules: Rule[], clientId: string): Rule[] {
    return rules.filter(rule => rule.clientId === clientId);
  }
};

export default function ClientSettingsPage() {
  const params = useParams();
  const router = useRouter();
  const clientId = params.id as string;
  
  const [rules, setRules] = useState<Rule[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    loadRules();
  }, [clientId]);

  const loadRules = async () => {
    try {
      setLoading(true);
      // Get all rules from the mocked API
      const allRules = await rulesService.getAllRules();
      // Filter by current client ID
      const clientRules = rulesService.filterByClientId(allRules, clientId);
      setRules(clientRules);
      setError(null);
    } catch (err) {
      setError('Unable to load rules');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Filter rules based on search term
  const filteredRules = rules.filter(rule => {
    if (!searchTerm) return true;
    
    const searchLower = searchTerm.toLowerCase();
    const formattedDate = formatDate(rule.createdAt).toLowerCase();
    
    return (
      rule.id.toLowerCase().includes(searchLower) ||
      rule.bin.toLowerCase().includes(searchLower) ||
      rule.pcn.toLowerCase().includes(searchLower) ||
      rule.groupNumber.toLowerCase().includes(searchLower) ||
      formattedDate.includes(searchLower)
    );
  });

  const clearSearch = () => {
    setSearchTerm('');
  };

  const downloadList = (ruleId: string, items: string[], type: string) => {
    const content = items.join('\n');
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${type}_${ruleId}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <button
          onClick={() => router.push('/clients')}
          className="flex items-center gap-2 text-neutral-600 hover:text-neutral-900 mb-6 transition-colors"
        >
          <ArrowLeft size={20} />
          Back to Clients
        </button>

        <div className="flex items-center gap-3 mb-6">
          <Settings size={32} className="text-primary-600" />
          <h1 className="text-2xl font-bold text-neutral-800">Client Settings</h1>
        </div>

        <div className="bg-neutral-50 rounded-lg p-4">
          <p className="text-sm text-neutral-600">Client ID:</p>
          <p className="font-mono text-sm text-neutral-800">{clientId}</p>
        </div>
      </div>

      {/* Rules Table */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-secondary-600 text-white p-4">
          <div className="flex items-center gap-2 mb-4">
            <FileText size={24} />
            <h2 className="text-xl font-bold">NCPDP Routing Rules</h2>
            <span className="ml-auto bg-secondary-500 px-3 py-1 rounded-full text-sm">
              {filteredRules.length} of {rules.length} {rules.length === 1 ? 'rule' : 'rules'}
            </span>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={20} className="text-secondary-200" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by Rule ID, BIN, PCN, Group Number, or Date..."
              className="w-full pl-10 pr-10 py-2 bg-secondary-700 text-white placeholder-secondary-200 border border-secondary-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
            />
            {searchTerm && (
              <button
                onClick={clearSearch}
                className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-secondary-200 transition-colors"
              >
                <X size={20} />
              </button>
            )}
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center p-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-secondary-600"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 m-4">
            <p className="text-red-800">{error}</p>
            <button 
              onClick={loadRules}
              className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : filteredRules.length === 0 ? (
          <div className="text-center py-12 text-neutral-500">
            {searchTerm ? (
              <>
                <Search size={48} className="mx-auto mb-4 opacity-50" />
                <p className="text-lg font-medium">No rules found</p>
                <p className="text-sm mt-2">Try adjusting your search terms</p>
                <button
                  onClick={clearSearch}
                  className="mt-4 px-4 py-2 bg-secondary-600 text-white rounded-lg hover:bg-secondary-700 transition-colors"
                >
                  Clear Search
                </button>
              </>
            ) : (
              <>
                <FileText size={48} className="mx-auto mb-4 opacity-50" />
                <p>No rules found for this client</p>
              </>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-neutral-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Rule ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    BIN
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    PCN
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Group Number
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Excluded NPIs
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Excluded NDCs
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Included NPIs
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Allowed NDCs
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Created At
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-neutral-200">
                {filteredRules.map((rule) => (
                  <tr key={rule.id} className="hover:bg-neutral-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-600 font-mono">
                      {rule.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-3 py-1 rounded-md text-sm font-medium bg-primary-100 text-primary-800 font-mono">
                        {rule.bin}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-3 py-1 rounded-md text-sm font-medium bg-accent-100 text-accent-800 font-mono">
                        {rule.pcn}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-3 py-1 rounded-md text-sm font-medium bg-secondary-100 text-secondary-800 font-mono">
                        {rule.groupNumber}
                      </span>
                    </td>
                    
                    {/* Excluded NPIs */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-neutral-600 font-medium">
                          {rule.excludedNPIs.length} NPI{rule.excludedNPIs.length !== 1 ? 's' : ''}
                        </span>
                        <button
                          onClick={() => downloadList(rule.id, rule.excludedNPIs, 'excluded_npis')}
                          className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-error hover:text-error-dark hover:bg-error-light rounded transition-colors"
                          title="Download Excluded NPIs"
                        >
                          <Download size={14} />
                        </button>
                      </div>
                    </td>

                    {/* Excluded NDCs */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-neutral-600 font-medium">
                          {rule.excludedNDCs.length} NDC{rule.excludedNDCs.length !== 1 ? 's' : ''}
                        </span>
                        <button
                          onClick={() => downloadList(rule.id, rule.excludedNDCs, 'excluded_ndcs')}
                          className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-error hover:text-error-dark hover:bg-error-light rounded transition-colors"
                          title="Download Excluded NDCs"
                        >
                          <Download size={14} />
                        </button>
                      </div>
                    </td>

                    {/* Included NPIs */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-neutral-600 font-medium">
                          {rule.includedNPIs.length} NPI{rule.includedNPIs.length !== 1 ? 's' : ''}
                        </span>
                        <button
                          onClick={() => downloadList(rule.id, rule.includedNPIs, 'included_npis')}
                          className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-success hover:text-success-dark hover:bg-success-light rounded transition-colors"
                          title="Download Included NPIs"
                        >
                          <Download size={14} />
                        </button>
                      </div>
                    </td>

                    {/* Allowed NDCs */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-neutral-600 font-medium">
                          {rule.allowedNDCs.length} NDC{rule.allowedNDCs.length !== 1 ? 's' : ''}
                        </span>
                        <button
                          onClick={() => downloadList(rule.id, rule.allowedNDCs, 'allowed_ndcs')}
                          className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-success hover:text-success-dark hover:bg-success-light rounded transition-colors"
                          title="Download Allowed NDCs"
                        >
                          <Download size={14} />
                        </button>
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                      {formatDate(rule.createdAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}