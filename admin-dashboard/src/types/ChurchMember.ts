import { ChurchMinistries } from "./ChurchMinistries";

export interface ChurchMembers {
	id?: string;
	churchId: string;
	full_name: string;
	gender: string;
	phone_number: string;
	email: string;
	job: string;
	residence: string;
	age: string;
	marital_status: string;
	no_of_children: string;
	education_level: string;
	church_ministries_ids: ChurchMinistries[];
	ministries: ChurchMinistries[];
	updatedAt: string;
}