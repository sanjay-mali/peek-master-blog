import React, { useState, useEffect } from "react";
import { Container, PostCard, ShimmerPostCard } from "../components";
import appWriteService from "../appWrite/storage";

function AllPost() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    appWriteService.getPosts([]).then((post) => {
      if (post) setPosts(post.documents);
    });
    setLoading(false);
  }, []);

  return loading ? (
    Array(posts.length || 4)
      .fill()
      .map((_, index) => (
        <div key={index} className="p-2 w-full mt-2 sm:w-1/2 md:w-1/3 lg:w-1/4">
          <ShimmerPostCard />
        </div>
      ))
  ) : (
    <Container>
      <div className="flex flex-wrap">
        {posts &&
          posts.map((post) => (
            <div className="p-2 w-1/4" key={post.$id}>
              <PostCard {...post} />
            </div>
          ))}
      </div>
    </Container>
  );
}

export default AllPost;
