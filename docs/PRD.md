# Data School PRD

## Introduction

The Data School Platform is a web-based application that allows users to create accounts, log in, view and purchase courses, study course content, rate courses, read blog posts, and interact with the platform. This PRD (Product Requirements Document) outlines the key features, functionality, and requirements for the development of the Online Courses Platform.

## User Accounts and Authentication

- Users can create new accounts by providing their name, email address, and password.
- Users can log in to their accounts using their registered email address and password.
- Passwords should be securely stored and hashed.
- Users should have the option to reset their password if they forget it.
- (Or use OAuth -login by Google-)

## Course Management

- Courses should be categorized into different subjects or topics.
- Users can browse and search for courses based on subject, topic, or keywords.
- Each course should have a title, description, instructor name, duration, and price.
- Users can view detailed information about a course, including the course curriculum and any prerequisites.
- Users can purchase courses using a secure payment gateway.
- Upon successful purchase, users should have immediate access to the course content.

## Course Content

- Users can view the introductory and the first three videos as a trial.
- Course content can include text, images, videos, and quizzes.
- Users can navigate through the course content using a user-friendly interface.
- Users can mark their progress within a course and resume from where they left off.
- Users can rate courses based on their experience and provide feedback.

## Blog Posts

- The platform should have a blog section where the admin can post articles.
- Posts should be SEO.
- Posts have categories and tags.
- Users can read blog posts, share on social media, subscribe to newsletter without logging in.
- Logged-in users can comment on blog posts.
- Users can like or upvote blog posts and comments.
- Relevant courses at the end of the post.
- Relevant posts after the post.
- Admin has the ability to edit or delete blog posts and comments.

## User Dashboard

- Each user should have a personalized dashboard showing their enrolled courses, progress, and any upcoming events.
- Users should be able to manage their account settings, including profile information, email preferences, and password.

The endpoints required for the Online Courses Platform can vary based on the specific functionality and features you want to implement. However, here are some common endpoints that you may need:

## Endpoints

1. User Endpoints:

   - `POST /api/users/register`: Create a new user account.
   - `POST /api/users/login`: Authenticate and log in a user.
   - `GET /api/users/logout`: Log out the currently authenticated user.
   - `GET /api/users/me`: Get the profile information of the authenticated user.
   - `PUT /api/users/me`: Update the profile information of the authenticated user.
   - `PUT /api/users/me/password`: Update the password of the authenticated user.

2. Course Endpoints:

   - `GET /api/courses`: Get a list of available courses.
   - `GET /api/courses/{courseId}`: Get detailed information about a specific course.
   - `POST /api/courses/{courseId}/enroll`: Enroll the authenticated user in a course.
   - `GET /api/courses/{courseId}/content`: Get the content of a specific course.
   - `POST /api/courses/{courseId}/ratings`: Rate and provide feedback for a course.

3. Blog Endpoints:

   - `GET /api/blog/posts`: Get a list of all blog posts.
   - `GET /api/blog/posts/{postId}`: Get detailed information about a specific blog post.
   - `POST /api/blog/posts`: Create a new blog post (admin only).
   - `PUT /api/blog/posts/{postId}`: Update a specific blog post (admin only).
   - `DELETE /api/blog/posts/{postId}`: Delete a specific blog post (admin only).
   - `POST /api/blog/posts/{postId}/comments`: Add a comment to a specific blog post.
   - `PUT /api/blog/comments/{commentId}`: Update user's comment.
   - `DELETE /api/blog/comments/{commentId}`: Delete user's comment.

4. Payment Endpoints:
   - `POST /api/payments/checkout`: Initiate the checkout process for a course purchase.
   - `POST /api/payments/webhook`: Receive and process payment webhooks from the payment gateway.

## ERD

Entities:

1. User: Represents a registered user of the platform.

   - Attributes: UserID (Primary Key), Name, Email, Password, CreatedAt, UpdatedAt

2. Course: Represents a course available on the platform.

   - Attributes: CourseID (Primary Key), Title, Description, Instructor, Duration, Price, CreatedAt, UpdatedAt
   - Relationships: One-to-Many with User (Instructor)

3. Enrollment: Represents the enrollment of a user in a course.

   - Attributes: EnrollmentID (Primary Key), UserID (Foreign Key), CourseID (Foreign Key), EnrolledAt
   - Relationships: Many-to-One with User, Many-to-One with Course

4. Content: Represents the content of a course.

   - Attributes: ContentID (Primary Key), CourseID (Foreign Key), Title, Type, Description, CreatedAt, UpdatedAt
   - Relationships: Many-to-One with Course

5. Rating: Represents the rating given by a user for a course.

   - Attributes: RatingID (Primary Key), UserID (Foreign Key), CourseID (Foreign Key), Rating, Comment, RatedAt
   - Relationships: Many-to-One with User, Many-to-One with Course

6. BlogPost: Represents a blog post created by the admin.

   - Attributes: BlogPostID (Primary Key), Title, Content, Author, CreatedAt, UpdatedAt

7. Comment: Represents a comment made by a user on a blog post.
   - Attributes: CommentID (Primary Key), BlogPostID (Foreign Key), UserID (Foreign Key), Comment, CreatedAt, UpdatedAt
   - Relationships: Many-to-One with BlogPost, Many-to-One with User

## Conclusion

The Online Courses Platform aims to provide users with a convenient and engaging online learning experience. By implementing the features and requirements outlined in this PRD, we can create a robust and user-friendly platform that enables users to access and study a wide range of courses, interact with blog posts, and enhance their skills and knowledge.

## Tables

### Users

| Attribute | Type   | References     |
| --------- | ------ | -------------- |
| id        | int    | primary key    |
| name      | string |                |
| email     | string | unique         |
| password  | string |                |
| role      | string | default='user' |

### Courses

| Attribute     | Type   | References                       |
| ------------- | ------ | -------------------------------- |
| id            | int    | primary key                      |
| title         | string |                                  |
| description   | text   |                                  |
| price         | float  |                                  |
| category      | string |                                  |
| author_id     | int    | foreign key references users(id) |
| lessons       | json   |                                  |
| quizzes       | json   |                                  |
| video_preview | string |                                  |

### Lessons

| Attribute | Type   | References                         |
| --------- | ------ | ---------------------------------- |
| id        | int    | primary key                        |
| course_id | int    | foreign key references courses(id) |
| title     | string |                                    |
| content   | text   |                                    |
| quiz      | json   |                                    |

### Posts

| Attribute    | Type     | References                       |
| ------------ | -------- | -------------------------------- |
| id           | int      | primary key                      |
| title        | string   |                                  |
| content      | text     |                                  |
| author_id    | int      | foreign key references users(id) |
| published_at | datetime |                                  |

### Comments

| Attribute    | Type     | References                            |
| ------------ | -------- | ------------------------------------- |
| id           | int      | primary key                           |
| blog_post_id | int      | foreign key references blog_posts(id) |
| user_id      | int      | foreign key references users(id)      |
| content      | text     |                                       |
| created_at   | datetime |                                       |

### Likes

| Attribute  | Type      | References                | edits            |
| ---------- | --------- | ------------------------- | ---------------- |
| id         | int       | primary key               | Can be composite |
| post_id    | int       | foreign key to posts (id) |
| user_id    | int       | foreign key to users (id) |
| created_at | timestamp |                           | Ignored?         |
