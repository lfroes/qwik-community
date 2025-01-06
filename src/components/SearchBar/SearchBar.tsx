import {
  component$,
  $,
  PropFunction,
  useSignal,
  useTask$,
} from "@builder.io/qwik";
import { Input } from "../ui/Input";

export interface SearchBarProps {
  value: string;
  onSearch$: PropFunction<(value: string) => void>;
}

export const SearchBar = component$<SearchBarProps>((props) => {
  const { value, onSearch$ } = props;
  const inputValue = useSignal(value);

  // debounce function
  useTask$(({ track, cleanup }) => {
    track(() => inputValue.value);

    const timeoutId = setTimeout(() => {
      onSearch$(inputValue.value);
    }, 300);

    cleanup(() => clearTimeout(timeoutId));
  });

  const handleInput$ = $((e: Event) => {
    const target = e.target as HTMLInputElement;
    inputValue.value = target.value;
  });

  return (
    <section class="mb-6">
      <Input
        type="search"
        placeholder="Search posts..."
        value={inputValue.value}
        onInput$={handleInput$}
      />
    </section>
  );
});
