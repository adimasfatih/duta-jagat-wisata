import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  ADMIN_COOKIE_NAME,
  createSessionToken,
  isAdminAuthenticated,
  verifyAdminCredentials,
} from "@/app/lib/auth";

export async function GET() {
  const authenticated = await isAdminAuthenticated();
  return NextResponse.json({ authenticated });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (body.action === "logout") {
      const cookieStore = await cookies();
      cookieStore.delete(ADMIN_COOKIE_NAME);
      return NextResponse.json({ authenticated: false });
    }

    const username = (body.username || "").toString().trim();
    const password = (body.password || "").toString();

    if (!verifyAdminCredentials(username, password)) {
      return NextResponse.json(
        { error: "Invalid admin username or password." },
        { status: 401 }
      );
    }

    const token = createSessionToken();
    const cookieStore = await cookies();
    cookieStore.set(ADMIN_COOKIE_NAME, token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return NextResponse.json({ authenticated: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to process authentication request." },
      { status: 500 }
    );
  }
}

