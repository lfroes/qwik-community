import { component$ } from "@builder.io/qwik";
import { PostCard } from "../PostCard/PostCard";
import { Post } from "~/types/post";

export interface PostsProps {
  posts: Post[];
  searchTerm?: string;
}

export const Posts = component$<PostsProps>((props) => {
  const { posts, searchTerm } = props;

  return (
    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} searchTerm={searchTerm} />
      ))}
    </div>
  );
});
