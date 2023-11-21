import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req) {
  const cookieStore = cookies();
  const token = cookieStore.get("token");

  try {
    const resApi = await fetch("http://localhost:8000/api/logout", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    });
    const data = await resApi.json();
    if (resApi.ok) {
      cookies().delete("token");
      return NextResponse.json({ message: "success" }, { status: 200 });
    } else {
      return NextResponse.json({ message: data }, { status: resApi.status });
    }
  } catch (e) {
    return NextResponse.json(
      { message: { error: ["server error"] } },
      { status: 500 }
    );
  }
}
