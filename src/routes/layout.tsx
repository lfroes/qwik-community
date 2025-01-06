import {
  component$,
  Slot,
  useContextProvider,
  $,
  useStore,
  useVisibleTask$,
} from "@builder.io/qwik";
import { type RequestHandler, routeLoader$ } from "@builder.io/qwik-city";
import { ThemeContext, type ThemeStore } from "~/lib/store/theme.context";
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
  cacheControl({
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    maxAge: 5,
  });
};

export default component$(() => {
  const store = useStore<PostsStore>(initialPostsState);

  const toggleTheme = $((store: ThemeStore) => {
    store.isDark = !store.isDark;
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", store.isDark ? "dark" : "light");
      document.documentElement.classList.toggle("dark", store.isDark);
    }
  });

  const themeStore = useStore<ThemeStore>({
    isDark: false,
    toggle: toggleTheme,
  });

  // Sincroniza o estado inicial com o localStorage
  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    const theme = localStorage.getItem("theme");
    if (theme === "dark" && !themeStore.isDark) {
      themeStore.isDark = true;
      document.documentElement.classList.add("dark");
    } else if (theme === "light" && themeStore.isDark) {
      themeStore.isDark = false;
      document.documentElement.classList.remove("dark");
    }
  });

  useContextProvider(PostsContext, store);
  useContextProvider(ThemeContext, themeStore);

  return (
    <>
      <script
        dangerouslySetInnerHTML={`
          (function() {
            try {
              const theme = localStorage.getItem("theme") || "light";
              const isDark = theme === "dark";
              document.documentElement.classList.toggle("dark", isDark);
            } catch (e) {
              console.error("Error setting initial theme:", e);
            }
          })();
        `}
      />
      <main class="min-h-screen bg-background">
        <div class="container py-8">
          <Slot />
        </div>
      </main>
    </>
  );
});
