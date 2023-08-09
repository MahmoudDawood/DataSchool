import { Course } from "../types";

export interface CourseDao {
  getCourses(): Course[];
  getCourseById(courseId: string): Course | undefined;
  enroll(userId: string, courseId: string): void;
}
