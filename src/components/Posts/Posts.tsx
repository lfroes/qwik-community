import { component$ } from "@builder.io/qwik";
import { Post } from "~/types/post";

export interface PostsProps {
  posts: Post[];
  searchTerm?: string;
}

export const Posts = component$<PostsProps>((props) => {
  const { posts } = props;

  return (
    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <div>{post.title}</div>
      ))}
    </div>
  );
});
