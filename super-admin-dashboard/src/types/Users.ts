import { Churches } from "./Churches";

export interface Users {
	id?: string;
	updatedAt?: string;
	createdAt?: string;
	lastSeen?: string;
	isEnabled?: boolean;
	churchId?: string;
	name: string;
	title?: string;
	email?: string;
	password?: string;
	isEmailVerified?: boolean;
	role?: string;
	church?: Churches
  }