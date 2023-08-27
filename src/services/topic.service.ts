import { PrismaClient, Topic } from "@prisma/client";
const prisma = new PrismaClient();

export namespace TopicService {
	type TopicData = Pick<Topic, "name">;
	export const create = async (topicData: TopicData) => {
		try {
			const createdTopic = await prisma.topic.create({
				data: { ...topicData },
			});
			return createdTopic;
		} catch (error: any) {
			throw new Error(error);
		}
	};

	export const findAll = async () => {
		try {
			const topics = await prisma.topic.findMany({
				orderBy: {
					name: "asc",
				},
			});
			return topics;
		} catch (error: any) {
			throw new Error(error);
		}
	};

	export const deleteById = async (id: string) => {
		try {
			await prisma.topic.delete({
				where: { id },
			});
		} catch (error: any) {
			throw new Error(error);
		}
	};
}
