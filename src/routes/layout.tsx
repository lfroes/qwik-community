import {
  component$,
  Slot,
  useContextProvider,
  useStore,
} from "@builder.io/qwik";
import { type RequestHandler, routeLoader$ } from "@builder.io/qwik-city";
import {
  PostsContext,
  type PostsStore,
  initialPostsState,
} from "~/lib/store/posts.context";

export const useServerTimeLoader = routeLoader$(() => {
  return {
    date: new Date().toLocaleString(),
  };
});

export const onGet: RequestHandler = async ({ cacheControl }) => {
  // Control caching for this request for best performance and to reduce hosting costs:
  // https://qwik.dev/docs/caching/
  cacheControl({
    // Always serve a cached response by default, up to a week stale
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    // Max once every 5 seconds, revalidate on the server to get a fresh version of this page
    maxAge: 5,
  });
};

export default component$(() => {
  const store = useStore<PostsStore>(initialPostsState);

  useContextProvider(PostsContext, store);

  return (
    <>
      <main class="min-h-screen bg-background">
        <div class="container py-8">
          <Slot />
        </div>
      </main>
    </>
  );
});
