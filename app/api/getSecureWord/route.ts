import { NextResponse } from 'next/server';

export async function POST(request: Request) {

  const { username } = await request.json();

  console.log(`API Call: Received username: ${username}`);

  const secureWord = "secure123";

  return NextResponse.json({ 
    success: true,
    message: "Secure word retrieved successfully.",
    secureWord: secureWord 
  });
}