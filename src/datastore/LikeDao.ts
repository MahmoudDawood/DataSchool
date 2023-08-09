import { Like } from "../types";

export interface LikeDao {
  createLike(like: Like): void;
  deleteLike(like: Like): void;
}
