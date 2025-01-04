export interface Post {
  id: string;
  title: string;
  body: string;
  createdAt: string;
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

export interface CreatePostInput {
  title: string;
  body: string;
}
