import { Post, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export namespace PostService {
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
					title: { contains: name, mode: "insensitive" },
				},
			});
		} catch (error: any) {
			throw new Error(error);
		}
	};

	export const updateById = async (id: string, updatedData: Partial<Post>) => {
		try {
			const updatedPost = await prisma.post.update({
				where: { id },
				data: { ...updatedData },
			});
			return updatedPost;
		} catch (error: any) {
			throw new Error(error);
		}
	};

	export const deleteById = async (id: string) => {
		try {
			await prisma.post.delete({
				where: { id },
			});
		} catch (error: any) {
			throw new Error(error);
		}
	};
}
