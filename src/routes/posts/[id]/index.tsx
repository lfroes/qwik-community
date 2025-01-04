import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { graphqlClient } from "~/lib/graphql/client";
import { GET_POST } from "~/lib/graphql/queries";
import { formatDate } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import { Link } from "@builder.io/qwik-city";
import { PostResponse } from "~/types/post";

export const usePostLoader = routeLoader$(async ({ params }) => {
  const { post } = await graphqlClient.request<PostResponse>(GET_POST, {
    id: params.id,
  });

  return post;
});

// As the GraphQL API does not return a createdAt field, we gonna create a random date for the post.

const randomDate = () => {
  const start = new Date(2021, 0, 1);
  const end = new Date();
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime()),
  );
};

export default component$(() => {
  const post = usePostLoader();

  return (
    <section>
      <div class="mb-6">
        <Link href="/">
          <Button variant="outline">← Back to Posts</Button>
        </Link>
      </div>
      <article class="prose prose-lg max-w-none">
        <h1 class="mb-4 text-4xl font-bold">{post.value.title}</h1>
        <p class="mb-6 text-muted-foreground">{formatDate(randomDate())}</p>
        <div class="whitespace-pre-wrap">{post.value.body}</div>
      </article>
    </section>
  );
});
