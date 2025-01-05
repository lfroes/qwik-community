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
import {
  PostsContext,
  type PostsStore,
  initialPostsState,
} from "~/lib/store/posts.context";
import { Posts } from "~/components/Posts/Posts";
import { SearchBar } from "~/components/SearchBar/SearchBar";

export const usePostsLoader = routeLoader$(async () => {
  const { posts } = await graphqlClient.request<PostsResponse>(GET_POSTS, {
    options: {
      paginate: {
        page: 1,
        limit: 9,
      },
    },
  });

  return posts;
});

export default component$(() => {
  const postsSignal = usePostsLoader();
  const store = useStore<PostsStore>({
    ...initialPostsState,
    posts: postsSignal.value.data,
    totalPages: Math.ceil(postsSignal.value.meta.totalCount / 9),
  });

  useContextProvider(PostsContext, store);

  useTask$(({ track }) => {
    track(() => store.searchTerm);

    //WARN: This is without a debounce funtion because the amount of data is small.
    // In case of a large amount of data, consider using a debounce function.

    const filtered = store.posts.filter(
      (post) =>
        post.title.toLowerCase().includes(store.searchTerm.toLowerCase()) ||
        post.body.toLowerCase().includes(store.searchTerm.toLowerCase()),
    );

    store.localPosts = filtered;
  });

  return (
    <section>
      <div class="mb-8 flex items-center justify-between">
        <h1 class="text-4xl font-bold">Posts</h1>
        {
          //TODO: Add button to create Posts
        }
      </div>
      <SearchBar
        value={store.searchTerm}
        onSearch$={(value) => (store.searchTerm = value)}
      />
      <Posts
        posts={store.localPosts.length ? store.localPosts : store.posts}
        searchTerm={store.searchTerm}
      />

      {
        //TODO: Add Pagination component
      }
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
