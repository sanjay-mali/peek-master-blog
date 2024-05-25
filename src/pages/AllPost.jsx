import React, { useState, useEffect } from "react";
import { Container, PostCard } from "../components";
import appWriteService from "../appWrite/storage";

function AllPost() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    appWriteService.getPosts([]).then((post) => {
      if (post) setPosts(post.documents);
    });
  }, []);

  return (
    <Container>
      <div className="flex flex-wrap">
        {posts.map((post) => (
          <div className="p-2 w-1/4" key={post.$id}>
            <PostCard {...post} />
          </div>
        ))}
      </div>
    </Container>
  );
}

export default AllPost;
