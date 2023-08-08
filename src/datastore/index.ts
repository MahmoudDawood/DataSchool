import { CommentDao } from "./CommentDao";
import { CourseDao } from "./CourseDao";
import { LikeDao } from "./LikeDao";
import { PostDao } from "./PostDao";
import { UserDao } from "./UserDao";
import { InMemoryDataStore } from "./memorydb";

export default interface DataStore extends UserDao, CourseDao , LikeDao, PostDao, CommentDao {
  
}

const database = new InMemoryDataStore 
export { database };
