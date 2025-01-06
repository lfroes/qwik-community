import {
  component$,
  useTask$,
  useVisibleTask$,
  useContext,
  useSignal,
} from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { graphqlClient } from "~/lib/graphql/client";
import { GET_POSTS } from "~/lib/graphql/queries";
import { PostsResponse } from "~/types/post";
import type { DocumentHead } from "@builder.io/qwik-city";
import { PostsContext } from "~/lib/store/posts.context";
import { Posts } from "~/components/Posts/Posts";
import { SearchBar } from "~/components/SearchBar/SearchBar";
import { Pagination } from "~/components/Pagination/Pagination";
import { CreatePostButton } from "~/components/CreatePostButton/CreatePostButton";
import { PostSkeleton } from "~/components/PostSkeleton/PostSkeleton";
import { ThemeToggle } from "~/components/ThemeToggle/ThemeToggle";

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
  const isLoading = useSignal<boolean>(true);

  useTask$(({ track }) => {
    track(() => postsSignal.value.data);

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

    // We Can apply loading here if we change to get the data page by page

    const start = (store.currentPage - 1) * 9;
    const end = start + 9;

    // Maybe change to a normal if statement, it`s more readable`
    store.currentPosts = store.searchPosts.length
      ? store.searchPosts.slice(start, end)
      : store.combinedPosts.slice(start, end);
  });

  // ISSUE:: The use of useVisibleTask$ is not recommended,
  // but as we have a open issue on useResource$ we will be using for now
  // see https://github.com/QwikDev/qwik/issues/4328 for more information

  //WARN:: This code is just to simulate a real-life scenario,
  // it should not be used in production

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(async () => {
    const delay = (ms: number) =>
      new Promise((resolve) => setTimeout(resolve, ms));
    await delay(2000);

    isLoading.value = false;
  });

  return (
    <section>
      <div class="mb-8 flex flex-col items-center justify-between gap-3 md:flex-row md:gap-0">
        <h1 class="text-4xl font-bold dark:text-white">Posts</h1>
        <div class="flex gap-3">
          <ThemeToggle />
          <CreatePostButton text="Create Post" />
        </div>
      </div>
      <SearchBar
        value={store.searchTerm}
        onSearch$={(value) => (store.searchTerm = value)}
      />
      {isLoading.value ? (
        <PostSkeleton />
      ) : (
        <Posts
          posts={
            store.searchPosts.length ? store.searchPosts : store.currentPosts
          }
          searchTerm={store.searchTerm}
          currentPage={store.currentPage}
        />
      )}
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
