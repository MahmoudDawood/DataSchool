import DataStore from "..";
import { Comment, Course, Like, Post, User } from "../../types";

export class InMemoryDataStore implements DataStore {
  private users: User[] = [];
  private courses: Course[] = [];
  private posts: Post[] = [];
  private comments: Comment[] = [];
  private likes: Like[] = [];

  signup(user: User): void {
    this.users.push(user);
  }
  login(email: string, password: string): User | undefined {
    throw new Error("Method not implemented.");
  }
  getUsers(): User[] {
    return this.users;
  }
  getUserByEmail(email: string): User | undefined {
    return this.users.find((user) => user.email == email);
  }
  getCourses(): Course[] {
    return this.courses;
  }
  getCourseById(courseId: string): Course | undefined {
    return this.courses.find((course) => course.id == courseId);
  }
  enroll(userId: string, courseId: string): void {
    throw new Error("Method not implemented.");
  }
  createLike(like: Like): void {
    this.likes.push(like);
  }
  deleteLike(like: Like): void {}
  getPosts(): Post[] {
    return this.posts;
  }
  getPost(id: string): Post | undefined {
    return this.posts.find((post) => post.id == id);
  }
  createPost(post: Post): void {
    this.posts.push(post);
  }
  updatePost(post: Post): void {
    const index = this.posts.findIndex((p) => p.id == post.id);
    if (index == -1) {
      return;
    }
    this.posts[index] = post;
  }
  deletePost(id: string): void {
    const index = this.posts.findIndex((post) => post.id == id);
    if (index == -1) {
      return;
    }
    this.posts.splice(index, 1);
  }
  createComment(comment: Comment): void {
    this.comments.push(comment);
  }
  listComments(postId: string): Comment[] {
    return this.comments.filter((comment) => comment.postId == postId);
  }
  deleteComment(id: string): void {
    const index = this.comments.findIndex((comment) => comment.id == id);
    if (index == -1) {
      return;
    }
    this.comments.splice(index, 1);
  }
}
