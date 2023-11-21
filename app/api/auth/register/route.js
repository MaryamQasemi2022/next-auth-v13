import { NextResponse } from "next/server";
export async function POST(req) {
  const { name, email, c_password, password } = await req.json();
  try {
    const resApi = await fetch("http://localhost:8000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
        c_password,
      }),
    });
    const data = await resApi.json();
    // console.log(data);
    if (resApi.ok) {
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
