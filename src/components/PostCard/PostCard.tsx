import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import type { Post } from "~/types/post";

export interface PostCardProps {
  post: Post;
  searchTerm?: string;
}

export const PostCard = component$<PostCardProps>((props) => {
  return <div>PostCard component works!</div>;
});
