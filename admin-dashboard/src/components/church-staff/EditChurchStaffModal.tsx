import { Button, Modal, Label, TextInput, Textarea } from "flowbite-react";
import { FC, useState } from "react";
import { HiPencilAlt, HiUpload } from "react-icons/hi";

const EditChurchStaffModal: FC = function () {
	const [isOpen, setOpen] = useState(false);

	return (
		<>
			<Button color="primary" onClick={() => setOpen(!isOpen)}>
				<HiPencilAlt className="mr-2 text-lg" />
			</Button>
			<Modal onClose={() => setOpen(false)} show={isOpen}>
				<Modal.Header className="border-b border-gray-200 !p-6 dark:border-gray-700">
					<strong>Edit product</strong>
				</Modal.Header>
				<Modal.Body>
					<form>
						<div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
							<div>
								<Label htmlFor="firstName">First Name</Label>
								<TextInput
									id="firstName"
									name="firstName"
									className="mt-1"
								/>
							</div>
							<div>
								<Label htmlFor="otherName">Other Name</Label>
								<TextInput
									id="otherName"
									name="otherName"
									className="mt-1"
								/>
							</div>
							<div>
								<Label htmlFor="gender">Gender</Label>
								<TextInput
									id="gender"
									name="gender"
									className="mt-1"
								/>
							</div>
							<div>
								<Label htmlFor="dob">Date of Birth</Label>
								<TextInput
									id="dob"
									name="dob"
									type="date"
									className="mt-1"
								/>
							</div>
							<div>
								<Label htmlFor="disability">Disability</Label>
								<TextInput
									id="disability"
									name="disability"
									type="text"
									className="mt-1"
								/>
							</div>
							<div>
								<Label htmlFor="telephone">Phone Number</Label>
								<TextInput
									id="telephone"
									name="telephone"
									type="text"
									className="mt-1"
								/>
							</div>
							<div>
								<Label htmlFor="emailAddress">Email Address</Label>
								<TextInput
									id="emailAddress"
									name="emailAddress"
									type="email"
									className="mt-1"
								/>
							</div>
							<div>
								<Label htmlFor="residence">Residence</Label>
								<TextInput
									id="residence"
									name="residence"
									type="text"
									className="mt-1"
								/>
							</div>
							<div className="lg:col-span-2">
								<Label htmlFor="producTable.Celletails">Description</Label>
								<Textarea
									id="producTable.Celletails"
									name="producTable.Celletails"
									placeholder="Tell us more about yourself..."
									rows={6}
									className="mt-1"
								/>
							</div>
							<div className="lg:col-span-2">
								<div className="flex w-full items-center justify-center">
									<label className="flex h-32 w-full cursor-pointer flex-col rounded border-2 border-dashed border-gray-300 hover:bg-gray-50 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-700">
										<div className="flex flex-col items-center justify-center pb-6 pt-5">
											<HiUpload className="text-4xl text-gray-300" />
											<p className="py-1 text-sm text-gray-600 dark:text-gray-500">
												Upload a file or drag and drop
											</p>
											<p className="text-xs text-gray-500 dark:text-gray-400">
												PNG, JPG, GIF up to 10MB
											</p>
										</div>
										<input type="file" className="hidden" />
									</label>
								</div>
							</div>
						</div>
					</form>
				</Modal.Body>
				<Modal.Footer>
					<Button color="primary" onClick={() => setOpen(false)}>
						Save all
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};

export default EditChurchStaffModal;