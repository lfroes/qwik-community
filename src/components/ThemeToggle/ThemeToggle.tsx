import { component$, useContext } from "@builder.io/qwik";
import { ThemeContext } from "~/lib/store/theme.context";
import { Button } from "../ui/button";

export const ThemeToggle = component$(() => {
  const themeStore = useContext(ThemeContext);

  return (
    <Button variant={"ghost"} onClick$={() => themeStore.toggle(themeStore)}>
      {themeStore.isDark ? "🌙" : "☀️"} Toggle Theme
    </Button>
  );
});
