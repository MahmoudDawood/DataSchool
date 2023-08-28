import { Comment, PrismaClient } from "@prisma/client";
import { PathOrFileDescriptor } from "fs";
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

	export const findPostComments = async (postId: string) => {
		try {
			const comments = await prisma.comment.findMany({
				where: { postId },
			});
			return comments;
		} catch (error: any) {
			throw new Error(error);
		}
	};

	export const findUserComments = async (userId: string) => {
		try {
			const comments = await prisma.comment.findMany({
				where: { userId },
			});
			return comments;
		} catch (error: any) {
			throw new Error(error);
		}
	};

	export const updateById = async (id: string, updatedData: Partial<Comment>) => {
		try {
			const updatedComment = await prisma.comment.update({
				where: { id },
				data: { ...updatedData },
			});
			return updatedComment;
		} catch (error: any) {
			throw new Error(error);
		}
	};

	export const deleteById = async (id: string) => {
		try {
			await prisma.comment.delete({
				where: { id },
			});
		} catch (error: any) {
			throw new Error(error);
		}
	};
}
