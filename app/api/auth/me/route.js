import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(req) {
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  if (!token) {
    return NextResponse.json(
      { message: { error: ["not authorization"] } },
      { status: 403 }
    );
  }
  try {
    const resApi = await fetch("http://localhost:8000/api/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    });
    const data = await resApi.json();
    if (resApi.ok) {
      return NextResponse.json({ user: data.user }, { status: 200 });
    } else {
      return NextResponse.json(
        { message: { error: ["user forbidden"] } },
        { status: resApi.status }
      );
    }
  } catch (e) {
    return NextResponse.json(
      { message: { error: ["server error"] } },
      { status: 500 }
    );
  }
}
