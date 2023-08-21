import { Post, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export namespace PostService {
	export const findAll = async () => {
		try {
			const posts = await prisma.post.findMany({});
			return posts;
		} catch (error: any) {
			throw new Error(error);
		}
	};

	export const findById = async (id: string) => {
		try {
			const post = await prisma.post.findFirst({
				where: { id },
			});
			return post;
		} catch (error: any) {
			throw new Error(error);
		}
	};

	export const searchByName = async (name: string) => {
		try {
			const post = await prisma.post.findFirst({
				where: {
					title: { contains: name },
				},
			});
		} catch (error: any) {
			throw new Error(error);
		}
	};

	export const create = async (post: Omit<Post, "id" | "createdAt">) => {
		try {
			const newPost = await prisma.post.create({
				data: {
					...post,
				},
			});
			return newPost;
		} catch (error: any) {
			throw new Error(error);
		}
	};

	export const updateById = async (post: Omit<Post, "createdAt">) => {
		try {
			const updatedPost = await prisma.post.update({
				where: { id: post.id },
				data: {
					authorId: post.authorId,
					title: post.title,
					image: post.image,
					content: post.content,
				},
			});
			return updatedPost;
		} catch (error: any) {
			throw new Error(error);
		}
	};

	export const deleteById = async (id: string) => {
		try {
			const deletedPost = await prisma.post.delete({
				where: { id },
			});
			return deletedPost;
		} catch (error: any) {
			throw new Error(error);
		}
	};
}
