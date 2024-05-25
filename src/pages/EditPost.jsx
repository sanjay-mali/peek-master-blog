import React, { useState, useEffect } from "react";
import { Container, PostForm } from "../components";
import { useParams, useNavigate } from "react-router-dom";
import appWriteService from "../appWrite/storage";

function EditPost() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (slug) {
      appWriteService.getPost(slug).then((post) => {
        if (post) setPost(post);
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);

  return post ? (
    <Container>
      <PostForm post={post} />
    </Container>
  ) : null;
}

export default EditPost;
