import { Comment, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export namespace CommentService {
	type CommentData = Omit<Comment, "id" | "createdAt">;
	export const create = async (comment: CommentData) => {
		try {
			const createdComment = await prisma.comment.create({
				data: { ...comment },
			});
			return createdComment;
		} catch (error: any) {
			throw new Error(error);
		}
	};

	export const getPostComments = async (postId: string) => {
		try {
			const comments = await prisma.comment.findMany({
				where: { postId },
			});
			return comments;
		} catch (error: any) {
			throw new Error(error);
		}
	};

	export const getUserComments = async (userId: string) => {
		try {
			const comments = await prisma.comment.findMany({
				where: { userId },
			});
			return comments;
		} catch (error: any) {
			throw new Error(error);
		}
	};

	type UpdatedCommentData = Pick<Comment, "id" | "comment">;
	export const updateById = async (commentData: UpdatedCommentData) => {
		try {
			const { id, comment } = commentData;
			const updatedComment = await prisma.comment.update({
				where: { id },
				data: { comment },
			});
			return updatedComment;
		} catch (error: any) {
			throw new Error(error);
		}
	};

	export const deleteById = async (id: string) => {
		try {
			const deletedComment = await prisma.comment.delete({
				where: { id },
			});
			return deletedComment;
		} catch (error: any) {
			throw new Error(error);
		}
	};
}
