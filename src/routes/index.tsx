import {
  component$,
  useContextProvider,
  useStore,
  useTask$,
} from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { graphqlClient } from "~/lib/graphql/client";
import { GET_POSTS } from "~/lib/graphql/queries";
import { PostsResponse } from "~/types/post";
import type { DocumentHead } from "@builder.io/qwik-city";

export const usePostsLoader = routeLoader$(async () => {
  const { posts } = await graphqlClient.request<PostsResponse>(GET_POSTS, {
    options: {
      paginate: {
        page: 1,
        limit: 10,
      },
    },
  });

  return posts;
});

export default component$(() => {
  return (
    <section>
      <div class="mb-8 flex items-center justify-between">
        <h1 class="text-4xl font-bold">Posts</h1>
      </div>
    </section>
  );
});

export const head: DocumentHead = {
  title: "Qwik Community",
  meta: [
    {
      name: "description",
      content: "Qwik community website",
    },
  ],
};
