import { Churches } from "./Churches";

export interface Users {
	id?: string;
	updatedAt?: string;
	createdAt?: string;
	lastSeen?: string;
	isEnabled?: boolean;
	churchId?: string;
	name?: string;
	title?: string;
	email?: string;
	password?: string;
	isEmailVerified?: string;
	role?: string;
	contact?: string;
	dob?: string;
	church?: Churches
}