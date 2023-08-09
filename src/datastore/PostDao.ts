import { Post } from "../types";

export interface PostDao {
  getPosts(): Post[];
  getPost(id: string): Post | undefined;
  createPost(post: Post): void;
  updatePost(post: Post): void;
  deletePost(id: string): void;
}

// GET /api/blog/posts
// GET /api/blog/posts/{postId}
// POST /api/blog/posts
// PUT /api/blog/posts/{postId}
// DELETE /api/blog/posts/{postId}
// POST /api/blog/posts/{postId}
// PUT /api/blog/comments/{commentId}
// DELETE /api/blog/comments/{commentId}
