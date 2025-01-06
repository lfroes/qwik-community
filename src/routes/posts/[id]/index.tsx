import { component$, useTask$, useContext } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { graphqlClient } from "~/lib/graphql/client";
import { GET_POST } from "~/lib/graphql/queries";
import { formatDate } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import { Link } from "@builder.io/qwik-city";
import { PostResponse } from "~/types/post";
import { PostsContext } from "~/lib/store/posts.context";

export const usePostLoader = routeLoader$(async ({ params }) => {
  try {
    const { post } = await graphqlClient.request<PostResponse>(GET_POST, {
      id: params.id,
    });

    return { post, id: params.id };
  } catch (error) {
    console.error("GraphQL API error:", error);
    return { post: null, id: params.id };
  }
});

const randomDate = () => {
  const start = new Date(2021, 0, 1);
  const end = new Date();
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime()),
  );
};

export default component$(() => {
  const store = useContext(PostsContext);
  const postSignal = usePostLoader();

  let post = postSignal.value.post;

  // We check if the post is from the API
  // If not, we check if the post is from the local store

  if (!post?.id) {
    post =
      store.combinedPosts.find((post) => post.id == postSignal.value.id) ||
      null;
  }

  if (post?.id == null) {
    return (
      <section>
        <div class="mb-6">
          <Link href="/">
            <Button variant="outline">← Back to Posts</Button>
          </Link>
        </div>
        <p class="text-center text-red-500">Post not found.</p>
      </section>
    );
  }

  return (
    <section>
      <div class="mb-6">
        <Link href="/">
          <Button variant="outline">← Back to Posts</Button>
        </Link>
      </div>
      <article class="prose prose-lg max-w-none">
        <h1 class="mb-4 text-4xl font-bold">{post.title}</h1>
        <p class="mb-6 text-muted-foreground">
          {post.createdAt
            ? formatDate(post.createdAt)
            : formatDate(randomDate())}
        </p>
        <div class="whitespace-pre-wrap">{post.body}</div>
        <p class="mt-2 text-muted-foreground">
          Written by: {post.user.username}
        </p>
      </article>
    </section>
  );
});
