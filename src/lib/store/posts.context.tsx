import { createContextId } from "@builder.io/qwik"
import type { Post } from "~/types/post"

export interface PostsStore {
  posts: Post[];
  searchTerm: string;
  currentPage: number;
  totalPages: number;
  localPosts: Post[];
  searchPosts: Post[]; 
  combinedPosts: Post[]; 
  currentPosts: Post[];
}

export const PostsContext = createContextId<PostsStore>('posts-context');


export const initialPostsState: PostsStore = {
  posts: [],
  searchTerm: "",
  currentPage: 1,
  totalPages: 1,
  localPosts: [],
  searchPosts: [],
  combinedPosts: [],
  currentPosts: [],
}
