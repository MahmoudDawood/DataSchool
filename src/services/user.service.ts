import { PrismaClient, User } from "@prisma/client";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();
const prisma = new PrismaClient();
const salt = process.env.BCRYPT_SALT || "1";
const pepper = process.env.BCRYPT_PEPPER;
const tokenSecret = process.env.TOKEN_SECRET || "1";

export namespace UserService {
	export const create = async (userData: Omit<User, "id" | "createdAt">) => {
		try {
			const userExists = await prisma.user.findFirst({
				where: {
					OR: [{ email: userData.email }, { phone: userData.phone }],
				},
			});

			if (userExists) {
				console.log({ userExists });
				throw new Error("A user with this email or phone already exists");
				// TODO: Split email and phone validations
			}
			const pepperPassword = userData.password + pepper;
			const hashedPassword = bcrypt.hashSync(pepperPassword, parseInt(salt));
			const newUser = await prisma.user.create({
				data: {
					...userData,
					password: hashedPassword,
				},
			});
			const token = jwt.sign(newUser, tokenSecret);
			const id = newUser.id;
			const email = newUser.email;
			return { token, id, email };
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
				throw new Error("Either username or password are wrong");
			}
			const pepperPassword = userData.password + pepper;
			const passwordMatch = bcrypt.compareSync(pepperPassword, user.password);
			if (!passwordMatch) {
				throw new Error("Either username or password are wrong");
			}
			const token = jwt.sign(user, tokenSecret);
			const id = user.id;
			const email = user.email;
			return { token, id, email };
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
