"use server";
import { cookies } from "next/headers";
const getPosts = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  const res = await fetch("http://localhost:8000/api/posts", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
    cache: "no-store",
  });

  if (res.ok) {
    const data = await res.json();
    return data.posts;
  } else {
    throw new Error(res.status);
  }
};

export { getPosts };
