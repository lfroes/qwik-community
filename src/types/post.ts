import type { FieldValues } from "@modular-forms/qwik";

export type User = {
  username: string;
};

export interface Post {
  id: string;
  title: string;
  body: string;
  createdAt: string;
  user: User;
}

type Meta = {
  totalCount: number;
};

export interface PostResponse {
  post: Post;
}

export interface PostsResponse {
  posts: {
    data: Post[];
    meta: Meta;
  };
}

export type CreatePostInput = {
  title: string;
  body: string;
  user: User;
};
