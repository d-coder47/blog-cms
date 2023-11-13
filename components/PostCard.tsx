import { PostInterface } from "@/interfaces/post";
import React from "react";

type PostCardProps = {
  post: PostInterface;
};

const PostCard = ({ post }: PostCardProps) => {
  return (
    <div>
      {post.title}
      {post.excerpt}
    </div>
  );
};

export default PostCard;
