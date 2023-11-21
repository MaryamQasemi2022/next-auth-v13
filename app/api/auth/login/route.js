import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req) {
  const { email, password } = await req.json();
  try {
    const resApi = await fetch("http://localhost:8000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const data = await resApi.json();
    // console.log(data);
    if (resApi.ok) {
      cookies().set({
        name: "token",
        value: data.token,
        httpOnly: true,
        path: "/",
        maxAge: 7 * 24 * 60 * 60, //1week
      });
      return NextResponse.json({ user: data.user }, { status: 200 });
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
