import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { registerData, responseData } from '@/utils/message';
import { validateFields } from '../api-utlis/helper';
import { sendMail } from '../api-utlis/mailService';

const bcrypt = require('bcrypt');
const prisma = new PrismaClient();

// User registration
export async function POST(req) {
	const saltRounds = 10;
	async function hashPassword(password) {
		return bcrypt.hash(password, saltRounds);
	}
	try {
		const body = await req.json();
		const { firstName, lastName, email, password, deviceToken } = body;
		const fields = { firstName, lastName, email, password };
		const emptyFieldErrors = {};
		if (firstName.trim() === "") {
			emptyFieldErrors.firstName = registerData.firstNameReq;
		}
		if (lastName.trim() === "") {
			emptyFieldErrors.lastName = registerData.lastNameReq;
		}
		if (email.trim() === "") {
			emptyFieldErrors.email = registerData.emailReq;
		}
		if (password.trim() === "") {
			emptyFieldErrors.password = registerData.passwordReq;
		}
		if (Object.keys(emptyFieldErrors).length > 0) {
			return NextResponse.json({ result: false, message: emptyFieldErrors });
		};
		const validatingFields = {
			firstName: { type: "firstName", message: registerData.nameFieldVal },
			lastName: { type: "lastName", message: registerData.nameFieldVal },
			email: { type: "email", message: registerData.emailValMsg },
		};
		let fieldErrors = validateFields(fields, validatingFields);
		if (Object.keys(fieldErrors).length > 0) {
			return NextResponse.json({ result: false, message: fieldErrors });
		};
		const hashedPassword = await hashPassword(password);
		const existUser = await prisma.user.findFirst({ where: { email: email, isDeleted: "N" } })
		if (existUser) {
			return NextResponse.json({ result: false, message: { email: responseData.emailExists } });
		};
		let name = firstName + ' ' + lastName;
		const inserted = await prisma.user.create({
			data: { firstName, lastName, name, email, password: hashedPassword, profileStatus: "Active", deviceToken, companyName: name },
		});
		const createdBy = inserted.id;
		await prisma.user.update({ where: { id: createdBy }, data: { createdBy } });
		const getWelcomeMailTemplate = await prisma.mail_templates.findFirst({ where: { templateType: 'welcome-mail' } });
		if (getWelcomeMailTemplate) {
			const subject = getWelcomeMailTemplate.subject;
			const message = getWelcomeMailTemplate.message.replace('{name}', name);
			try {
				await sendMail(email, subject, message);
			} catch (error) {
				console.log("error:", error);
			}
		}
		return NextResponse.json({ result: true, message: responseData.userCreated });
	} catch (error) {
		return NextResponse.json({ error: error.message });
	}
};
