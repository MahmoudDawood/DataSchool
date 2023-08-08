import { Course } from "../interface";

export interface CourseDao {
  getCourses(): Course[],
  getCourseById(courseId: string): Course | undefined
  enroll(userId: string, courseId: string): void
}