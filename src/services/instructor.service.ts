import { Instructor, PrismaClient, User } from "@prisma/client";
const prisma = new PrismaClient();

export namespace InstructorService {
	export const create = async (data: Instructor & User) => {
		try {
			let {
				firstName,
				lastName,
				gender,
				phone,
				email,
				password,
				jobTitle,
				about,
				photo,
				socialMedia,
			} = data;
			if (!socialMedia) {
				// TODO: Create a default JSON value, convert data to const
				socialMedia = {};
			}
			const instructor = await prisma.instructor.create({
				data: {
					jobTitle,
					about,
					photo,
					socialMedia,
					user: {
						create: {
							firstName,
							lastName,
							gender,
							phone,
							email,
							password,
						},
					},
				},
				include: { user: true },
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
				include: { user: true },
			});
			return instructor;
		} catch (error: any) {
			throw new Error(error);
		}
	};

	type NewInstructorData = Instructor & Omit<User, "id" | "password">;
	export const updatedById = async (userId: string, data: NewInstructorData) => {
		try {
			let {
				firstName,
				lastName,
				gender,
				phone,
				email,
				jobTitle,
				about,
				photo,
				socialMedia,
			} = data;
			if (!socialMedia) {
				// TODO: Create a default JSON value, convert data to const
				socialMedia = {};
			}
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
					user: {
						update: {
							firstName,
							lastName,
							gender,
							phone,
							email,
						},
					},
				},
				include: { user: true },
			});
			return updatedInstructor;
		} catch (error: any) {
			throw new Error(error);
		}
	};
}
