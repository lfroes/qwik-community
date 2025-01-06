import { component$, useStore, useTask$, useContext } from "@builder.io/qwik";
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
import { Pagination } from "~/components/Pagination/Pagination";
import { CreatePostButton } from "~/components/CreatePostButton/CreatePostButton";

async function fetchPosts() {
  const { posts } = await graphqlClient.request<PostsResponse>(GET_POSTS);

  return posts;
}

export const usePostsLoader = routeLoader$(async () => {
  return await fetchPosts();
});

export default component$(() => {
  const postsSignal = usePostsLoader();

  const store = useContext(PostsContext);
  useContext(PostsContext, store);

  useTask$(({ track }) => {
    track(() => postsSignal.value.data);

    console.log(store.searchPosts);

    store.posts = postsSignal.value.data;
    store.totalPages = Math.ceil(store.combinedPosts.length / 9);
    store.combinedPosts = [...store.localPosts, ...store.posts];
  });

  useTask$(({ track }) => {
    track(() => store.searchTerm);

    if (store.searchTerm === "") return;

    //WARN:: This is without a debounce funtion because the amount of data is small.
    // In case of a large amount of data, consider using a debounce function.

    const filtered = store.combinedPosts.filter(
      (post) =>
        post.title.toLowerCase().includes(store.searchTerm.toLowerCase()) ||
        post.body.toLowerCase().includes(store.searchTerm.toLowerCase()),
    );

    store.searchPosts = filtered.slice(0, 9);
  });

  useTask$(({ track }) => {
    track(() => store.currentPage);

    const start = (store.currentPage - 1) * 9;
    const end = start + 9;

    store.currentPosts = store.searchPosts.length
      ? store.searchPosts.slice(start, end)
      : store.combinedPosts.slice(start, end);
  });

  return (
    <section>
      <div class="mb-8 flex items-center justify-between">
        <h1 class="text-4xl font-bold">Posts</h1>
        <CreatePostButton text="Create Post" />
      </div>
      <SearchBar
        value={store.searchTerm}
        onSearch$={(value) => (store.searchTerm = value)}
      />
      <Posts
        posts={
          store.searchPosts.length ? store.searchPosts : store.currentPosts
        }
        searchTerm={store.searchTerm}
        currentPage={store.currentPage}
      />
      <Pagination
        currentPage={store.currentPage}
        totalPages={store.totalPages}
        onPageChange$={(page) => (store.currentPage = page)}
      />
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
