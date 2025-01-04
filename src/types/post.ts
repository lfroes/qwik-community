export interface Post {
  id: string;
  title: string;
  body: string;
  createdAt: string;
}

export interface PostsResponse {
  posts: {
    data: Post[];
    total: number;
  };
}

export interface CreatePostInput {
  title: string;
  body: string;
}
