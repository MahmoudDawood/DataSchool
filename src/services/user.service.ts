import { PrismaClient, User } from "@prisma/client";
const prisma = new PrismaClient();

export namespace UserService {
	export const create = async (user: Omit<User, "id" | "createdAt">) => {
		// TODO: Hash user password with salt and pepper
		// TODO: Create jwt and return it in the response
		try {
			const userExists = await prisma.user.findFirst({
				where: {
					email: user.email,
				},
			});

			if (userExists) {
				throw new Error("A user with this email already exists");
			}
			const newUser = await prisma.user.create({
				data: { ...user },
			});
			return { user: newUser };
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
				},
			});
			if (!user) {
				throw new Error("Either username or password are wrong");
			}

			if (user.password !== userData.password) {
				throw new Error("Either username or password are wrong");
			}

			return;
		} catch (error: any) {
			throw new Error(error);
		}
	};

	export const findAll = async () => {
		// TODO: Make another one for instructors only, students only
		try {
			const users = await prisma.user.findMany({});
			return users;
		} catch (error: any) {
			throw new Error(error);
		}
	};
}
