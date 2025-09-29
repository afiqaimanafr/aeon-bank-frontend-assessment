import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { username, encryptedPassword } = await request.json();

  console.log(`API Call: Final Login Attempt`);
  console.log(`Username: ${username}`);
  console.log(`Encrypted Password (Hashed): ${encryptedPassword}`);

  return NextResponse.json({ 
    success: true,
    message: "Login successful! Welcome to AEON Bank.",
  });
}