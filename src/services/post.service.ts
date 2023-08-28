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

	export const findAllCardInfo = async () => {
		try {
			const posts = await prisma.post.findMany({
				select: {
					id: true,
					authorId: true,
					title: true,
					image: true,
					topics: true,
					createdAt: true,
				},
			});
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

	export const searchByNameTopic = async (nameInput: string, topicsInput: string[]) => {
		try {
			const posts = await prisma.post.findMany({
				where: {
					OR: [
						{ title: { contains: nameInput, mode: "insensitive" } },
						{
							topics: {
								some: {
									name: { in: topicsInput, mode: "insensitive" },
								},
							},
						},
					],
				},
				include: { topics: true },
			});
			return posts;
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

	export const attachTopics = async (id: string, topicsArr: string[]) => {
		try {
			const post = await prisma.post.update({
				where: { id },
				data: {
					topics: { connect: topicsArr.map(topic => ({ id: topic })) },
				},
				include: { topics: true },
			});
			return post;
		} catch (error: any) {
			throw new Error(error);
		}
	};

	export const detachTopics = async (id: string, topicsArr: string[]) => {
		try {
			const post = await prisma.post.update({
				where: { id },
				data: {
					topics: { disconnect: topicsArr.map(topic => ({ id: topic })) },
				},
				include: { topics: true },
			});
			return post;
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
