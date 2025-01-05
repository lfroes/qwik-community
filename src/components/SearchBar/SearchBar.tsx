import { component$ } from "@builder.io/qwik";
import { Input } from "../ui/Input";

// TODO: Create Input Component

export interface SearchBarProps {
  value: string;
  onSearch$: (value: string) => void;
}

export const SearchBar = component$<SearchBarProps>((props) => {
  const { value, onSearch$ } = props;
  return (
    <section class="mb-6">
      {
        <Input
          type="search"
          placeholder="Search posts..."
          value={value}
          onInput$={(e) => onSearch$((e.target as HTMLInputElement).value)}
        />
      }
    </section>
  );
});
