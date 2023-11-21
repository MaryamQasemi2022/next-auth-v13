import React from "react";
import { getPosts } from "../action";
const PostPage = async () => {
  const posts = await getPosts();
  console.log(posts);
  return (
    <div>
      <h3> post page</h3>
      <ul>
        {posts && posts.map((post) => <li key={post.id}>{post.title}</li>)}
      </ul>
    </div>
  );
};

export default PostPage;
