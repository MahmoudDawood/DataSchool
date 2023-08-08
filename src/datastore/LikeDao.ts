import { Like } from "../interface";

export interface LikeDao {
  createLike(like: Like): void,
  deleteLike(like: Like): void
}