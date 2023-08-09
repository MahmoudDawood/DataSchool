export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  createdAt: number;
  editedAt: number;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  duration: number;
  price: number;
  createdAt: number;
  updateAt: number;
}

export interface Enrollment {
  id: string;
  userId: string;
  courseId: string;
  enrolledAt: number;
}

export interface Rating {
  id: string;
  userId: string;
  courseId: string;
  rating: number;
  comment: string;
  createdAt: number;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: number;
  updatedAt: number;
}

export interface Comment {
  id: string;
  postId: string;
  userId: string;
  comment: string;
  createdAt: number;
  updatedAt: number;
}

export interface Like {
  id: string;
  blogId: string;
  userId: string;
  createdAt: number;
}
