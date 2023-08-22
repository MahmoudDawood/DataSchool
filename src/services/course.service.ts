import { Course, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export namespace CourseService {
	export const create = async (
		course: Pick<
			Course,
			"title" | "instructorId" | "description" | "duration" | "preview" | "price"
		>
	) => {
		try {
			const newCourse = await prisma.course.create({
				data: {
					...course,
				},
			});
			return newCourse;
		} catch (error: any) {
			throw new Error(error);
		}
	};

	export const findById = async (id: string) => {
		try {
			const courses = await prisma.course.findMany({
				where: { id },
				include: {
					instructor: true,
					topics: true,
					reviews: true,
					sections: true,
				},
			});
			return courses;
		} catch (error: any) {
			throw new Error(error);
		}
	};

	export const findByName = async (nameInput: string) => {
		try {
			const courses = await prisma.course.findMany({
				// TODO: Include courses having topic names equal to name input
				// TODO: Select only essential card info
				where: {
					title: { contains: nameInput },
				},
				select: {
					title: true,
					instructorId: true,
					description: true,
					preview: true,
					duration: true,
					price: true,
					createdAt: true,
					updatedAt: true,
				},
			});
			return courses;
		} catch (error: any) {
			throw new Error(error);
		}
	};

	export const findAll = async () => {
		try {
			// TODO: Select only essential card info
			const courses = await prisma.course.findMany({
				select: {
					title: true,
					instructorId: true,
					description: true,
					preview: true,
					duration: true,
					price: true,
					createdAt: true,
					updatedAt: true,
				},
			});
			return courses;
		} catch (error: any) {
			throw new Error(error);
		}
	};

	export const deleteById = async (id: string) => {
		try {
			await prisma.course.delete({
				where: {
					id: String(id),
				},
			});
		} catch (error: any) {
			throw new Error(error);
		}
	};
}
