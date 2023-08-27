import { PrismaClient, User } from "@prisma/client";
const prisma = new PrismaClient();

export namespace UserService {
	export const create = async (user: Omit<User, "id" | "createdAt">) => {
		// TODO: Hash user password with salt and pepper
		// TODO: Create jwt and return it in the response
		try {
			const userExists = await prisma.user.findFirst({
				where: {
					OR: [{ email: user.email }, { phone: user.phone }],
				},
			});

			if (userExists) {
				console.log({ userExists });
				throw new Error("A user with this email or phone already exists");
				// TODO: Split email and phone validations
			}
			const newUser = await prisma.user.create({
				data: { ...user },
			});
			return newUser;
		} catch (error: any) {
			throw new Error(error);
		}
	};

	export const login = async (userData: Pick<User, "email" | "password">) => {
		// TODO: Hash password and check it's correctness after validating email
		// TODO: return JWT on authentication
		try {
			const user = await prisma.user.findFirst({
				where: {
					email: userData.email,
					password: userData.password,
				},
			});
			if (!user) {
				throw new Error("Either username or password are wrong");
			}
			return; // Return token
		} catch (error: any) {
			throw new Error(error);
		}
	};

	export const logout = async () => {
		// TODO: Expire the current refresher token
		// TODO: Delete the token from the browser
		try {
		} catch (error: any) {
			throw new Error(error);
		}
	};

	export const findAll = async () => {
		try {
			const users = await prisma.user.findMany({
				where: {
					Instructor: { is: null },
				},
			});
			return users;
		} catch (error: any) {
			throw new Error(error);
		}
	};

	export const findById = async (id: string) => {
		try {
			const user = await prisma.user.findFirst({
				where: { id },
				include: {
					enrollments: true,
				},
			});
			return user;
		} catch (error: any) {
			throw new Error(error);
		}
	};

	export const updateById = async (id: string, newData: Partial<User>) => {
		try {
			const updatedUser = await prisma.user.update({
				where: { id },
				data: { ...newData },
			});
			return updatedUser;
		} catch (error: any) {
			throw new Error(error);
		}
	};

	export const updatePassword = async (id: string, password: string) => {
		try {
			// TODO: Hash Password before storing it
			const updatedUser = await prisma.user.update({
				where: { id },
				data: { password },
			});
			return updatedUser;
		} catch (error: any) {
			throw new Error(error);
		}
	};

	export const deleteById = async (id: string) => {
		try {
			await prisma.user.delete({
				where: { id },
				include: {
					Instructor: true,
				},
			});
		} catch (error: any) {
			throw new Error(error);
		}
	};
}
