import { NextResponse } from 'next/server';

let feedbacks = [];

export async function POST(req) {
  
  const { fullName, email, message } = await req.json();
  
  feedbacks.push({
    fullName,
    email,
    message,
    timestamp: Date.now(),
  });
  
  return NextResponse.json({ success: true });
}

export async function GET() {
  return NextResponse.json({ feedbacks });
}
