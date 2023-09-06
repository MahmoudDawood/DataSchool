<!-- @format -->

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

## Database

### Schema

**User**

| Attribute   | Type         | Constraints | References      |
| ----------- | ------------ | ----------- | --------------- |
| id          | string(id)   |             |                 |
| fistName    | string       |             |                 |
| lastName    | string       |             |                 |
| gender      | Gender(enum) |             |                 |
| phone       | string       | unique      |                 |
| email       | string       | unique      |                 |
| password    | string       |             |                 |
| createdAt   | DateTime     |             |                 |
| instructor  | string?      | optional    | Instructor(1-1) |
| enrollments |              |             | Enrollment(1-m) |
| reviews     |              |             | Review(1-m)     |
| comments    |              |             | Comment(1-m)    |
| likes       |              |             | Like(1-m)       |

**Gender**

| enum1 | enum2  |
| ----- | ------ |
| MALE  | FEMALE |

**Instructor**

| Attribute   | Type       | Constraints | References     |
| ----------- | ---------- | ----------- | -------------- |
| jobTitle    | string     |             |                |
| about       | string     |             |                |
| photo       | string?    | optional    |                |
| socialMedia | Json?      | optional    |                |
| userId      | string(id) |             | User[id] (1-1) |
| courses     |            |             | Course(1-m)    |
| posts       |            |             | Post(1-m)      |

**Enrollment**

| Attribute        | Type       | Constraints | References                |
| ---------------- | ---------- | ----------- | ------------------------- |
| id               | composite  |             | [userId, courseId]        |
| userId           | string(id) |             | User[id] (m-1)            |
| courseId         | string(id) |             | Course[id] (m-1)          |
| payment          | float      |             |                           |
| originalPrice    | float      |             |                           |
| progress         | int?       | default(0)  |                           |
| currLesson       | int ?      | default(1)  |                           |
| enrolledAt       | DateTime   |             |                           |
| completedLessons |            |             | CompletedLesson[id] (1-m) |

**Course**

| Attribute    | Type       | Constraints | References           |
| ------------ | ---------- | ----------- | -------------------- |
| id           | string(id) |             | primary key          |
| title        | string     | unique      |                      |
| instructorId | string     |             | User[id] (m-1)       |
| about        | string     | string      |                      |
| content      | string     |             |                      |
| outcomes     | string[]   |             |                      |
| preview      | string     |             |                      |
| duration     | int        | default(0)  |                      |
| price        | float      |             |                      |
| photo        | string?    | optional    |                      |
| rating       | float      | default(0)  |                      |
| views        | int        | default(0)  |                      |
| createdAt    | DateTime   |             |                      |
| updatedAt    | DateTime   |             |                      |
| topics       |            |             | Topics[id] (m-m)     |
| enrollments  |            |             | Enrollment[id] (1-m) |
| reviews      |            |             | Reviews[id] (1-m)    |
| sections     |            |             | Sections[id] (1-m)   |

**Topic**

| Attribute | Type       | Constraints | References       |
| --------- | ---------- | ----------- | ---------------- |
| id        | string(id) |             | primary key      |
| name      | string     | unique      |                  |
| courses   |            |             | Course[id] (m-m) |
| posts     |            |             | Post[id] (m-m)   |

**Section**

| Attribute | Type       | Constraints | References       |
| --------- | ---------- | ----------- | ---------------- |
| id        | string(id) |             | primary key      |
| title     | string     |             |                  |
| duration  | int        | default(0)  |                  |
| order     | int        |             |                  |
| courseId  |            |             | Course[id] (m-1) |
| lessons   |            |             | Lesson[id] (1-m) |

**Lesson**

| Attribute        | Type       | Constraints | References                |
| ---------------- | ---------- | ----------- | ------------------------- |
| id               | string(id) |             | primary key               |
| title            | string     |             |                           |
| video            | string?    | optional    |                           |
| content          | string?    | optional    |                           |
| files            | string[]   |             |                           |
| links            | string[]   |             |                           |
| duration         | int        |             |                           |
| order            | int        |             |                           |
| sectionId        | string     |             | Section[id] (m-1)         |
| completedLessons |            |             | CompletedLesson[id] (1-m) |

**CompletedLesson**

| Attribute  | Type      | Constraints | References                   |
| ---------- | --------- | ----------- | ---------------------------- |
| id         | composite | Primary Key | [lessonId, userId, courseId] |
| lessonId   | string    |             | Lesson[id]                   |
| userId     | string    |             | User[id]                     |
| courseId   | string    |             | Course[id]                   |
| enrollment |           |             | Enrollment[id]               |

**Review**

| Attribute | Type      | Constraints | References         |
| --------- | --------- | ----------- | ------------------ |
| id        | composite | Primary Key | [userId, courseId] |
| userId    | string    |             | User[id]           |
| courseId  | string    |             | Course[id]         |
| comment   | string?   |             |                    |
| rating    | float     |             |                    |
| createdAt | DateTime  |             |                    |

**Post**

| Attribute | Type       | Constraints | References         |
| --------- | ---------- | ----------- | ------------------ |
| id        | string(id) | Primary Key |                    |
| authorId  | string     |             | Instructor[userId] |
| title     | string     |             |                    |
| image     | string?    | optional    |                    |
| content   | string     |             |                    |
| createdAt | DateTime   |             |                    |
| topics    |            |             | Topic[id] (m-m)    |
| comments  |            |             | Comment[id] (1-m)  |

**Comment**

| Attribute | Type       | Constraints | References |
| --------- | ---------- | ----------- | ---------- |
| id        | string(id) | Primary Key |            |
| userId    | string     |             | User[id]   |
| postId    | string     |             | Post[id]   |
| comment   | string     |             |            |
| createdAt | DateTime   |             |            |

**Like**
| Attribute | Type | Constraints | References |
| --------- | --------- | ----------- | ---------------- |
| id | composite | Primary Key | [userId, postId] |
| userId | string | | User[id] |
| postId | string | | Post[id] |
| createdAt | DateTime | | |

## Endpoints

**Start with /api**

**User:**

```
   - /users/signup             [POST]
   - /users/instructors/signup [POST]
   - /users/signup             [POST]
   - /users/login              [POST]
   - /users/logout             [POST]
   - /users/                   [GET]
   - /users/:id                [GET]
   - /users/instructors        [GET]
   - /users/instructors/:id    [GET]
   - /users/:id                [PUT]
   - /users/instructors/:id    [PUT]
   - /users/password/:id       [PUT]
   - /users/:id                [DELETE]
```

**Course:**

```
   - /courses/                  [POST]
   - /courses/topics/:id        [POST]
   - /courses/                  [GET]
   - /courses/search?name&topic [GET]
   - /courses/:id               [GET]
   - /courses/id                [PUT]
   - /courses/topics/:id        [DELETE]
   - /courses/:id               [DELETE]
```

**Enrollment:**

```
   - /enroll/                  [PUT]
   - /enroll/user/:id          [GET]
   - /enroll/course/:id        [GET]
   - /enroll/:userId/:courseId [DELETE]
```

**Section:**

```
   - /sections/    [POST]
   - /sections/    [GET]
   - /sections/:id [GET]
   - /sections/:id [PUT]
   - /sections/:id [DELETE]
```

**Lesson:**

```
   - /lessons/    [POST]
   - /lessons/    [GET]
   - /lessons/:id [GET]
   - /lessons/:id [PUT]
   - /lessons/:id [DELETE]
```

**CompletedLesson:**

```
   - /complete/                  [POST]
   - /complete/:userId/:courseId [GET]
```

**Review:**

```
   - /reviews/                  [POST]
   - /reviews/user/:id          [GET]
   - /reviews/:id               [GET]
   - /reviews/:userId/:courseId [PUT]
   - /reviews/:userId/:courseId [DELETE]
```

**Topic:**

```
   - /topics/    [POST]
   - /topics/    [GET]
   - /topics/:id [DELETE]
```

**Post:**

```
   - /posts/                  [POST]
   - /posts/topics/:id        [POST]
   - /posts/                  [GET]
   - /posts/search?name&topic [GET]
   - /posts/:id               [GET]
   - /posts/:id               [PUT]
   - /posts/topics/:id        [DELETE]
   - /posts/:id               [DELETE]
```

**Comment:**

```
         - /comments/         [POST]
         - /comments/user/:id [GET]
         - /comments/post/:id [GET]
         - /comments/:id      [PUT]
         - /comments/:id      [DELETE]
```

**Like:**

```
   - /likes/                     [POST]
   - /likes/user/:userId/:postId [GET]
   - /likes/user/:id             [GET]
   - /likes/post/:id             [GET]
   - /likes/:userId/:postId      [GET]
```

## Conclusion

The Online Courses Platform aims to provide users with a convenient and engaging online learning experience. By implementing the features and requirements outlined in this PRD, we can create a robust and user-friendly platform that enables users to access and study a wide range of courses, interact with blog posts, and enhance their skills and knowledge.
