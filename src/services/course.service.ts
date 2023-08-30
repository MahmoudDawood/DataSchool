import { Course, PrismaClient } from "@prisma/client";
import markdownToHTML from "../utils/markdownToHtml";

const prisma = new PrismaClient();

export namespace CourseService {
	type CourseData = Omit<Course, "id" | "createdAt" | "updatedAt" | "rating" | "views">;
	export const create = async (courseData: CourseData) => {
		try {
			const cleanHTML = markdownToHTML(courseData.content);
			const newCourse = await prisma.course.create({
				data: {
					...courseData,
					content: cleanHTML,
				},
				include: { topics: true },
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
					id: true,
					title: true,
					about: true,
					instructor: true,
					duration: true,
					price: true,
					rating: true,
					topics: true,
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
						{ title: { contains: nameInput, mode: "insensitive" } },
						{
							topics: {
								some: {
									name: { in: topicsInput, mode: "insensitive" }, // values are fixed, no need for mode here
								},
							},
						},
					],
				},
				select: {
					title: true,
					content: true,
					instructor: true,
					duration: true,
					price: true,
					topics: true,
				},
			});
			return courses;
		} catch (error: any) {
			throw new Error(error);
		}
	};

	export const updateById = async (id: string, dataUpdate: Partial<Course>) => {
		try {
			const updatedContent = dataUpdate.content;
			if (updatedContent) {
				const cleanHTML = markdownToHTML(updatedContent);
				dataUpdate.content = cleanHTML;
			}

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

	export const attachTopics = async (id: string, topics: string[]) => {
		try {
			const course = await prisma.course.update({
				where: { id },
				data: {
					topics: {
						connect: topics.map(topic => ({ id: topic })),
					},
				},
				include: { topics: true },
			});
			return course;
		} catch (error: any) {
			throw new Error(error);
		}
	};

	export const detachTopics = async (id: string, topics: string[]) => {
		try {
			const course = await prisma.course.update({
				where: { id },
				data: {
					topics: {
						disconnect: topics.map(topic => ({ id: topic })),
					},
				},
				include: { topics: true },
			});
			return course;
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
