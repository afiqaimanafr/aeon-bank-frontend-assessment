'use client';

import React from 'react';

interface Transaction {
  date: string;
  referenceId: string;
  to: string;
  description: string;
  transactionType: string;
  amount: number;
}

interface TransactionTableProps {
  transactions: Transaction[];
}

const AEON_LIGHT_PINK = 'bg-pink-50';
const AEON_DARK_ACCENT = 'text-gray-900';
const BORDER_PINK = 'border-pink-300';

const TransactionTable: React.FC<TransactionTableProps> = ({ transactions }) => {
  if (transactions.length === 0) {
    return <p className="text-center p-8 text-gray-500">No transactions found for this period.</p>;
  }

  const formatCurrency = (amount: number): string => {
    return `RM ${amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
  };

  return (
    <div className="overflow-x-auto shadow-xl rounded-xl">
      <table className="min-w-full divide-y divide-gray-200">
        
        <thead className={`${AEON_LIGHT_PINK} sticky top-0`}>
          <tr>
            {['Date', 'Reference ID', 'To', 'Transaction Type', 'Amount'].map((header) => (
              <th
                key={header}
                className={`px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider ${AEON_DARK_ACCENT} ${BORDER_PINK} border-b`}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        
        <tbody className="bg-white divide-y divide-gray-100">
          {transactions.map((tx, index) => (
            <tr 
              key={index} 
              className="hover:bg-pink-50 transition-colors"
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {tx.date}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {tx.referenceId}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <div className="font-medium text-gray-900">{tx.to}</div>
                <div className="text-xs text-gray-500 italic">{tx.description}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <span className="inline-flex px-3 py-1 text-xs font-semibold leading-5 text-pink-800 bg-pink-100 rounded-full">
                  {tx.transactionType}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-right text-gray-900">
                {formatCurrency(tx.amount)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;