import { NextResponse } from 'next/server';

const mockTransactionData = [
  {
    date: '24 Aug 2023',
    referenceId: '#8343434342',
    to: 'Bloom Enterprise Sdn Bhd',
    description: 'Recipient references will go here',
    transactionType: 'DuitNow payment',
    amount: 1200.00,
  },
  {
    date: '14 Jul 2023',
    referenceId: '#8343434342',
    to: 'Muhammad Andy Asmawi',
    description: 'Recipient references will go here...',
    transactionType: 'DuitNow payment',
    amount: 54810.16,
  },
  {
    date: '12 Jul 2023',
    referenceId: '#8343434342',
    to: 'Utilities Company Sdn Bhd',
    description: 'Recipient references will go here',
    transactionType: 'DuitNow payment',
    amount: 100.00,
  },
];

export async function GET() {
  return NextResponse.json({ 
    success: true,
    transactions: mockTransactionData
  });
}