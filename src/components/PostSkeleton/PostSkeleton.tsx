import { component$ } from "@builder.io/qwik";

export const PostSkeleton = component$(() => {
  return (
    <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {/* Find a way to not use the number of elements direclty */}
      {Array(9)
        .fill(null)
        .map((_, index) => (
          <div
            key={index}
            class="flex animate-pulse flex-col rounded-lg border bg-card text-card-foreground shadow-sm"
          >
            <div class="space-y-4 p-6">
              {/* Title */}
              <div class="h-4 w-3/4 rounded bg-gray-200"></div>
              {/* Content */}
              <div class="space-y-2">
                <div class="h-3 rounded bg-gray-200"></div>
                <div class="h-3 w-5/6 rounded bg-gray-200"></div>
                <div class="w-4/2 h-3 rounded bg-gray-200"></div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
});
