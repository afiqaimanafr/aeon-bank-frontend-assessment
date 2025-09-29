'use client'; 

import { useState, useEffect } from 'react';
import TransactionTable from './components/TransactionTable';
import { useAuth } from './context/AuthContext'; 

interface Transaction {
  date: string;
  referenceId: string;
  to: string;
  description: string;
  transactionType: string;
  amount: number;
}

const AEON_LIGHT_PINK = 'bg-pink-100';
const AEON_PINK = 'text-pink-600';

export default function DashboardPage() {
  const { isLoggedIn } = useAuth(); 
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTransactions() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch('/api/transaction-history');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        if (data.success) {
          setTransactions(data.transactions);
        } else {
          setError('Failed to fetch transaction data.');
        }

      } catch (e) {
        console.error("Error fetching transactions:", e);
        setError('Could not connect to the transaction history service.');
      } finally {
        setLoading(false);
      }
    }

    if (isLoggedIn) {
      fetchTransactions();
    } else {
      setTransactions([]);
      setLoading(false); 
      setError(null);
    }
  }, [isLoggedIn]); 
  
  const renderContent = () => {
    if (!isLoggedIn) {
      return (
        <div className="text-center p-12 bg-white rounded-xl shadow-lg border border-pink-300">
          <h2 className="text-2xl font-semibold text-gray-800">Access Denied</h2>
          <p className="text-gray-600 mt-2">
            Please **Login** to view your transaction history.
          </p>
        </div>
      );
    }

    if (loading) {
      return (
        <div className="text-center p-12 text-pink-600">
          <svg className="animate-spin h-8 w-8 mx-auto mb-3" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v2a6 6 0 00-6 6H4z"></path>
          </svg>
          Loading Transaction History...
        </div>
      );
    }

    if (error) {
      return (
        <div className="text-center p-12 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          Error: {error}
        </div>
      );
    }

    return (
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Recent Transactions</h2>
        <TransactionTable transactions={transactions} />
      </div>
    );
  };

  return (
    <div className={`min-h-[calc(100vh-64px)] p-8 ${AEON_LIGHT_PINK}`}>
      <div className="max-w-7xl mx-auto">
        
        <h1 className={`text-4xl font-bold mb-2 ${AEON_PINK}`}>
            AEON Dashboard
        </h1>
        <p className="text-gray-600 mb-8">
            {isLoggedIn 
                ? 'Your secure transaction history is displayed below.' 
                : 'Log in to securely access your banking data.'
            }
        </p>

        {renderContent()}
      </div>
    </div>
  );
}