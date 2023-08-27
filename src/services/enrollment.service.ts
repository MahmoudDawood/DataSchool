import { Enrollment, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export namespace EnrollmentService {
	type EnrollData = Pick<Enrollment, "userId" | "courseId" | "payment">;
	export const create = async (data: EnrollData) => {
		try {
			const course = await prisma.course.findFirst({
				where: {
					id: data.courseId,
				},
				select: {
					price: true,
				},
			});
			if (!course || !course.price) {
				throw new Error("Couldn't fetch course price");
			}
			const originalPrice = course.price;
			const enrollment = await prisma.enrollment.create({
				data: { ...data, originalPrice },
			});
			return enrollment;
		} catch (error: any) {
			throw new Error(error);
		}
	};

	export const findByUserId = async (userId: string) => {
		try {
			const enrollments = await prisma.enrollment.findMany({
				where: { userId },
			});
			return enrollments;
		} catch (error: any) {
			throw new Error(error);
		}
	};

	export const findByCourseId = async (courseId: string) => {
		try {
			const enrollments = await prisma.enrollment.findMany({
				where: { courseId },
			});
			return enrollments;
		} catch (error: any) {
			throw new Error(error);
		}
	};

	export const deleteById = async (userId: string, courseId: string) => {
		try {
			await prisma.enrollment.delete({
				where: {
					userId_courseId: {
						userId,
						courseId,
					},
				},
			});
		} catch (error: any) {
			throw new Error(error);
		}
	};
}
