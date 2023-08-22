import { Course, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export namespace CourseService {
	type CourseData = Omit<Course, "id" | "createdAt" | "updatedAt">;
	export const create = async (course: CourseData) => {
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

	export const findAllCardInfo = async () => {
		try {
			// TODO: Order the courses by views or enrollments
			const courses = await prisma.course.findMany({
				// TODO: Include course photo
				select: {
					title: true,
					description: true,
					instructor: true,
					duration: true,
					price: true,
				},
			});
			return courses;
		} catch (error: any) {
			throw new Error(error);
		}
	};

	export const findById = async (id: string) => {
		try {
			const course = await prisma.course.findFirst({
				where: { id },
				include: {
					instructor: true,
					topics: true,
					reviews: true,
					sections: true,
				},
			});
			return course;
		} catch (error: any) {
			throw new Error(error);
		}
	};

	export const searchByNameTopic = async (nameInput: string, topicsInput: string[]) => {
		try {
			const courses = await prisma.course.findMany({
				// TODO: Order the courses by views or enrollments
				where: {
					OR: [
						{ title: { contains: nameInput } },
						{
							topics: {
								some: {
									name: { in: topicsInput },
								},
							},
						},
					],
				},
				select: {
					title: true,
					description: true,
					instructor: true,
					duration: true,
					price: true,
				},
			});
			return courses;
		} catch (error: any) {
			throw new Error(error);
		}
	};

	export const updateById = async (id: string, dataUpdate: Partial<Course>) => {
		try {
			const updatedCourse = await prisma.course.update({
				where: { id },
				data: {
					...dataUpdate,
				},
			});
			return updatedCourse;
		} catch (error: any) {
			throw new Error(error);
		}
	};

	export const deleteById = async (id: string) => {
		try {
			await prisma.course.delete({
				where: { id },
			});
		} catch (error: any) {
			throw new Error(error);
		}
	};
}
