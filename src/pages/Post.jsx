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
  const userData = useSelector((state) => state.auth.userData);
  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (slug) {
      appWriteService.getPost(slug).then((post) => {
        if (post) setPost(post);
      });
    } else {
      navigate("/");
    }
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
        <div className="w-full mb-6">
          <h1 className="text-3xl  font-bold">{post.title}</h1>
        </div>

        <div className="w-full flex justify-center mb-4 relative  p-2">
          <img
            src={appWriteService.getFilePreview(post.image)}
            alt={post.title}
            className="rounded-md w-[80%]"
          />

          {isAuthor && (
            <div className="absolute right-6 top-6">
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

        <div className="browser-css">{parse(post.content)}</div>
      </Container>
    </div>
  ) : null;
}

export default Post;
