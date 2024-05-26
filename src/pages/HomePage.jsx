import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import appWriteService from "../appWrite/storage";
import { Container, PostCard, ShimmerPostCard } from "../components";

function HomePage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    appWriteService.getPosts().then((post) => {
      if (post) setPosts(post.documents);
      setLoading(false);
    });
  }, []);

  if (posts && posts.length === 0 && !loading) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              <h1 className="text-2xl md:text-3xl font-bold hover:text-gray-700">
                {authStatus ? "No posts found" : "Login to read posts"}
              </h1>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="w-full">
      <Container>
        <div className="flex flex-wrap -m-2">
          {loading
            ? Array(posts.length || 4)
                .fill()
                .map((_, index) => (
                  <div
                    key={index}
                    className="p-2 w-full mt-2 sm:w-1/2 md:w-1/3 lg:w-1/4"
                  >
                    <ShimmerPostCard />
                  </div>
                ))
            : posts &&
              posts.map((post) => (
                <div
                  key={post.$id}
                  className="p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
                >
                  <PostCard {...post} />
                </div>
              ))}
        </div>
      </Container>
    </div>
  );
}

export default HomePage;
