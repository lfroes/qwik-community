import { component$, PropFunction, $ } from "@builder.io/qwik";
import { Button } from "../ui/button";

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange$: PropFunction<(page: number) => void>;
}

export const Pagination = component$<PaginationProps>((props) => {
  const { currentPage, totalPages, onPageChange$ } = props;

  return (
    <section class="mt-6 flex justify-center gap-2">
      <Button
        variant="outline"
        disabled={currentPage === 1}
        onClick$={() => onPageChange$(currentPage - 1)}
      >
        Previous
      </Button>
      <span class="flex items-center px-4 dark:text-muted-foreground">
        Page {currentPage} of {totalPages}
      </span>
      <Button
        variant="outline"
        disabled={currentPage === totalPages}
        onClick$={() => onPageChange$(currentPage + 1)}
      >
        Next
      </Button>
    </section>
  );
});
