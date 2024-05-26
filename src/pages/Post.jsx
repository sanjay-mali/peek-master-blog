import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import appWriteService from "../appWrite/storage";
import { Container, Button } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

function Post() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const navigate = useNavigate();
  const { userData } = useSelector((state) => state.auth.userData);
  // const userId = userData.userData.$id
  const isAuthor = post && userData ? post.userid === userData.$id : false;

  useEffect(() => {
    if (slug) {
      appWriteService.getPost(slug).then((post) => {
        if (post) setPost(post);
        else navigate("/");
      });
    } else navigate("/");
  }, [slug, navigate]);

  const deletePost = async () => {
    appWriteService.deletePost(post.$id).then((status) => {
      if (status) {
        appWriteService.deleteFile(post.image);
        navigate("/");
      }
    });
  };

  return post ? (
    <div className="py-8">
      <Container>
        <div className="browser-css text-left mx-2 md:mx-6 lg:mx-9 bg-[#fdfdfd] p-4">
          <div className="w-full mb-6">
            <h1 className="text-3xl md:text-4xl text-center lg:text-5xl font-bold">
              {post.title}
            </h1>
          </div>

          <div className="w-full flex justify-center mb-4 relative p-2">
            <img
              src={appWriteService.getFilePreview(post.image)}
              alt={post.title}
              className="rounded-md w-full md:w-[80%] "
            />

            {isAuthor && (
              <div className="absolute right-2 top-2 md:right-6 md:top-6">
                <Link to={`/edit-post/${post.$id}`}>
                  <Button bgColor="bg-green-500" className="mr-3">
                    Edit
                  </Button>
                </Link>
                <Button bgColor="bg-red-500" onClick={deletePost}>
                  Delete
                </Button>
              </div>
            )}
          </div>
          <div className="break-words overflow-hidden text-ellipsis whitespace-normal">
            {parse(post.content)}
          </div>
        </div>
      </Container>
    </div>
  ) : null;
}

export default Post;
