export const GET_POSTS = `
  query GetPosts {
    posts {
      data {
        id
        title
        body
      }
    }
  }
`;

export const GET_POST = `
    query GetPost($id: ID!) {
      post(id: $id) {
        id
        title
        body
        user {
          username
        }
      }
    }
`;
