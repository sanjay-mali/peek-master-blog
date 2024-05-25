import appWriteService from "../appWrite/storage";
import { Container, PostCard } from "../components";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function HomePage() {
  const [posts, setPosts] = useState([]);
  const authStatus = useSelector((state) => state.auth.status);
  useEffect(() => {
    appWriteService.getPosts([]).then((post) => {
      if (post) setPosts(post.documents);
    });
  }, []);

  if (!authStatus) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              <h1 className="text-2xl font-bold hover:text-gray-700">
                { posts.length === 0 ? "No posts found" : "Login to read posts"}
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
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div key={post.$id} className="p-2 w-1/4">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default HomePage;
