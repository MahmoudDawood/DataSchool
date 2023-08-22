import { PrismaClient, Section } from "@prisma/client";
const prisma = new PrismaClient();

export namespace SectionService {
	type SectionData = Omit<Section, "id">;
	export const create = async (section: SectionData) => {
		try {
			const newSection = await prisma.section.create({
				data: {
					...section,
				},
			});
			return newSection;
		} catch (error: any) {
			throw new Error(error);
		}
	};

	export const findById = async (id: string) => {
		try {
			const section = await prisma.section.findFirst({
				where: { id },
				include: { lessons: true },
			});
			return section;
		} catch (error: any) {
			throw new Error(error);
		}
	};

	export const updateById = async (id: string, updatedData: Partial<Section>) => {
		try {
			const section = await prisma.section.update({
				where: { id },
				data: { ...updatedData },
			});
			return section;
		} catch (error: any) {
			throw new Error(error);
		}
	};

	export const deleteById = async (id: string) => {
		try {
			await prisma.section.delete({
				where: { id },
			});
		} catch (error: any) {
			throw new Error(error);
		}
	};
}
