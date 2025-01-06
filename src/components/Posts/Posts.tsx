import { component$ } from "@builder.io/qwik";
import { PostCard } from "../PostCard/PostCard";
import { Post } from "~/types/post";

export interface PostsProps {
  posts: Post[];
  searchTerm?: string;
  currentPage?: number;
}

export const Posts = component$<PostsProps>((props) => {
  const { posts, searchTerm, currentPage } = props;

  return (
    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post, index) => (
        <PostCard key={post.id} post={post} searchTerm={searchTerm} />
      ))}
    </div>
  );
});
