import { Lesson, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export namespace LessonService {
	export const create = async (lessonData: Lesson) => {
		try {
			const lesson = await prisma.lesson.create({
				data: { ...lessonData },
			});
			return lesson;
		} catch (error: any) {
			throw new Error(error);
		}
	};

	export const findById = async (id: string) => {
		try {
			const lesson = await prisma.lesson.findFirst({
				where: { id },
			});
			return lesson;
		} catch (error: any) {
			throw new Error(error);
		}
	};

	export const updateById = async (id: string, updatedData: Partial<Lesson>) => {
		try {
			const updatedLesson = await prisma.lesson.update({
				where: { id },
				data: { ...updatedData },
			});
			return updatedLesson;
		} catch (error: any) {
			throw new Error(error);
		}
	};

	export const deleteById = async (id: string) => {
		try {
			await prisma.lesson.delete({
				where: { id },
			});
		} catch (error: any) {
			throw new Error(error);
		}
	};
}
