import { createContextId, type QRL } from "@builder.io/qwik";

export interface ThemeStore {
  isDark: boolean;
  toggle: QRL<(store: ThemeStore) => void>;
}

export const ThemeContext = createContextId<ThemeStore>("theme-context");
