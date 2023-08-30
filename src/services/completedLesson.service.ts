import { CompletedLesson, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export namespace CompletedLessonService {
	export const saveLesson = async (lessonData: CompletedLesson) => {
		try {
			const result = await prisma.completedLesson.create({
				data: { ...lessonData },
			});
			return result;
		} catch (error: any) {
			throw new Error(error);
		}
	};

	export const findCompletedLessons = async (
		lessonData: Omit<CompletedLesson, "lessonId">
	) => {
		try {
			const completedLessons = await prisma.completedLesson.findMany({
				where: { ...lessonData },
			});
			return completedLessons;
		} catch (error: any) {
			throw new Error(error);
		}
	};
}
