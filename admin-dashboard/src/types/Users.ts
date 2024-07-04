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
	church?: Record<string, unknown>; // or define a more specific Church interface if you have the structure
	role?: string;
  }