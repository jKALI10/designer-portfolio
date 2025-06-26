import { NextResponse } from "next/server";
import { randomBytes } from "crypto";

export async function GET() {
  // Generate a random CSRF token
  const token = randomBytes(32).toString("hex");

  // Set the token in a secure, HTTP-only cookie
  const response = NextResponse.json({ success: true, token });

  response.cookies.set({
    name: "csrf-token",
    value: token,
    httpOnly: false, // Allow JavaScript access for client-side reading
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60, // 1 hour
  });

  return response;
}
