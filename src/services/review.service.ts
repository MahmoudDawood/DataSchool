import { PrismaClient, Review } from "@prisma/client";
const prisma = new PrismaClient();

export namespace ReviewService {
	type ReviewData = Omit<Review, "createdAt">;
	export const create = async (review: ReviewData) => {
		// TODO: Check if user made an earlier review to this course
		try {
			const createdReview = await prisma.review.create({
				data: { ...review },
			});
			return createdReview;
		} catch (error: any) {
			throw new Error(error);
		}
	};

	export const getCourseReviews = async (courseId: string) => {
		try {
			const reviews = await prisma.review.findMany({
				where: { courseId },
			});
			return reviews;
		} catch (error: any) {
			throw new Error(error);
		}
	};

	export const getUserReviews = async (userId: string) => {
		try {
			const reviews = await prisma.review.findMany({
				where: { userId },
			});
			return reviews;
		} catch (error: any) {
			throw new Error(error);
		}
	};

	export const updateReview = async (
		userId: string,
		courseId: string,
		data: Partial<Review>
	) => {
		try {
			const updatedReview = await prisma.review.update({
				where: {
					userId_courseId: {
						userId,
						courseId,
					},
				},
				data: { ...data },
			});
			return updatedReview;
		} catch (error: any) {
			throw new Error(error);
		}
	};

	export const deleteReview = async (userId: string, courseId: string) => {
		try {
			await prisma.review.delete({
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
