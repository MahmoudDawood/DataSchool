import { PrismaClient, User } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const salt = process.env.BCRYPT_SALT || 10;
const pepper = process.env.BCRYPT_PEPPER;
const tokenSecret = process.env.TOKEN_SECRET || "1";
const expiresIn = "2 days";

export namespace UserService {
	export const create = async (userData: Omit<User, "id" | "createdAt">) => {
		try {
			const userExists = await prisma.user.findFirst({
				where: {
					OR: [{ email: userData.email }, { phone: userData.phone }],
				},
			});

			if (userExists) {
				throw new Error("A user with this email or phone already exists");
				// TODO: Split email and phone validations
			}
			const pepperPassword = userData.password + pepper;
			const hashedPassword = bcrypt.hashSync(pepperPassword, salt);
			const newUser = await prisma.user.create({
				data: {
					...userData,
					password: hashedPassword,
				},
			});
			const id = newUser.id;
			const payload = { id, role: "user" };
			const token = jwt.sign(payload, tokenSecret, { expiresIn });
			const user = { id, firstName: newUser.firstName, role: "user" };
			return { user, token };
		} catch (error: any) {
			throw new Error(error);
		}
	};

	export const login = async (userData: Pick<User, "email" | "password">) => {
		try {
			const user = await prisma.user.findFirst({
				where: {
					email: userData.email,
				},
			});
			if (!user) {
				if (
					userData.email == process.env.ADMIN_EMAIL &&
					userData.password == process.env.ADMIN_PASSWORD
				) {
					const token = jwt.sign({ role: "admin" }, tokenSecret, { expiresIn });
					return token;
				}
				throw new Error("Either username or password are wrong");
			}
			const pepperPassword = userData.password + pepper;
			const passwordMatch = bcrypt.compareSync(pepperPassword, user.password);
			if (!passwordMatch) {
				throw new Error("Either username or password are wrong");
			}
			const id = user.id;
			const payload = { id, role: "user" };
			const token = jwt.sign(payload, tokenSecret, { expiresIn });
			return { user: { id, firstName: user.firstName, role: "user" }, token };
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
					instructor: { is: null },
				},
				include: {
					enrollments: true,
				},
				orderBy: {
					createdAt: "desc",
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
			});
		} catch (error: any) {
			throw new Error(error);
		}
	};
}
