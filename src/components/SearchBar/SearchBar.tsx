import { component$, $, PropFunction } from "@builder.io/qwik";
import { Input } from "../ui/Input";

export interface SearchBarProps {
  value: string;
  onSearch$: PropFunction<(value: string) => void>;
}

export const SearchBar = component$<SearchBarProps>((props) => {
  const { value, onSearch$ } = props;

  const handleInput$ = $((e: Event) => {
    const target = e.target as HTMLInputElement;
    onSearch$(target.value);
  });

  return (
    <section class="mb-6">
      {
        <Input
          type="search"
          placeholder="Search posts..."
          value={value}
          onInput$={handleInput$}
        />
      }
    </section>
  );
});
