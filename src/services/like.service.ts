import { Like, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export namespace LikeService {
	type LikeData = Omit<Like, "createdAt">;
	export const create = async (newData: LikeData) => {
		try {
			const createdLike = await prisma.like.create({
				data: { ...newData },
			});
			return createdLike;
		} catch (error: any) {
			throw new Error(error);
		}
	};

	export const findLikesCount = async (postId: string) => {
		try {
			const likesCount = await prisma.like.count({
				where: { postId },
			});
			return likesCount;
		} catch (error: any) {
			throw new Error(error);
		}
	};

	export const findUserLikes = async (userId: string) => {
		try {
			const userLikes = await prisma.like.findMany({
				where: { userId },
			});
			return userLikes;
		} catch (error: any) {
			throw new Error(error);
		}
	};

	export const getLikeState = async ({ userId, postId }: LikeData) => {
		try {
			const state = await prisma.like.findFirst({
				where: { userId, postId },
			});
			return state ? true : false;
		} catch (error: any) {
			throw new Error(error);
		}
	};

	export const deleteLike = async ({ userId, postId }: LikeData) => {
		try {
			await prisma.like.delete({
				where: {
					userId_postId: {
						userId,
						postId,
					},
				},
			});
		} catch (error: any) {
			throw new Error(error);
		}
	};
}
