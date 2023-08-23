import { Instructor, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export namespace InstructorService {
	export const create = async (data: Instructor) => {
		try {
			let { userId, jobTitle, about, photo, socialMedia } = data;
			if (!socialMedia) {
				socialMedia = {};
			}
			const instructor = await prisma.instructor.create({
				data: {
					userId,
					jobTitle,
					about,
					photo,
					socialMedia,
				},
			});
			return instructor;
		} catch (error: any) {
			throw new Error(error);
		}
	};

	export const findAll = async () => {
		try {
			const instructors = await prisma.instructor.findMany({
				include: {
					user: true,
				},
			});
			return instructors;
		} catch (error: any) {
			throw new Error(error);
		}
	};

	export const findById = async (userId: string) => {
		try {
			const instructor = await prisma.instructor.findFirst({
				where: { userId },
			});
			return instructor;
		} catch (error: any) {
			throw new Error(error);
		}
	};

	export const updatedById = async (userId: string, data: Partial<Instructor>) => {
		try {
			let { jobTitle, about, photo, socialMedia } = data;
			if (!socialMedia) {
				socialMedia = {};
			}
			const updatedInstructor = await prisma.instructor.update({
				where: { userId },
				data: {
					jobTitle,
					about,
					photo,
					socialMedia,
				},
			});
			return updatedInstructor;
		} catch (error: any) {
			throw new Error(error);
		}
	};
}
