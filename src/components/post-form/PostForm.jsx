import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import appWriteServeice from "../../appWrite/storage";
import { Button, InputBtn, RichTextEditor, Select } from "../index";
import { useNavigate } from "react-router-dom";

function PostForm({ post }) {
  const { register, watch, setValue, getValues, handleSubmit, control } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        content: post?.content || "",
        slug: post?.slug || "",
        status: post?.status || "active",
      },
    });

  const userData = useSelector((state) => state.auth.userData);
  const navigate = useNavigate();
  const userId = userData.userData.$id;
  
  const submit = async (data) => {
    if (post) {
      const file = data.image[0]
        ? await appWriteServeice.uploadFile(data.image[0])
        : null;

      if (file) {
        appWriteServeice.deleteFile(post.image);
      }

      const newPost = appWriteServeice.createPost(post.$id, {
        ...data,
        image: file ? file.$id : undefined,
      });
      if (newPost) {
        navigate(`/post/${newPost.$id}`);
      }
    } else {
      const file = data.image[0]
        ? await appWriteServeice.uploadFile(data.image[0])
        : null;

      if (file) {
        const fileId = file.$id;
        data.image = fileId;
        const newPost = await appWriteServeice.createPost({
          ...data,
          userid: userId,
        });
        if (newPost) {
          console.log(newPost.$id)
          navigate(`/post/${newPost.$id}`);
          return appWriteServeice.getFilePreview(fileId);
        }
      }
    }
  };

  const slugTrasform = useCallback((value) => {
    if (value && typeof value === "string") {
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");
    }
    return "";
  });

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTrasform(value.title), { shouldValidate: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, setValue, slugTrasform]);

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      <div className="w-2/3 px-2">
        <InputBtn
          label="Title"
          name="title"
          placeholder="Post Title"
          {...register("title", { required: true })}
          className="mb-4"
        />
        <InputBtn
          label="Slug"
          name="slug"
          placeholder="Post Slug"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTrasform(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
        />
        <RichTextEditor
          label="Content"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>
      <div className="w-1/3 px-2">
        <InputBtn
          label="Featured Image"
          name="image"
          type="file"
          className="mb-4"
          accept="image/png, image/jpeg, image/jpg, image/gif"
          {...register("image", { required: !post })}
        />
        {post && (
          <div className="w-full mb-4">
            <img
              src={appWriteServeice.getFilePreview(post.image)}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}

        <Select
          label="Status"
          name="status"
          options={["active", "inactive"]}
          {...register("status", { required: true })}
        />

        <Button
          type="submit"
          bgColor={post ? "bg-green-500" : undefined}
          className="w-full"
        >
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
}

export default PostForm;
