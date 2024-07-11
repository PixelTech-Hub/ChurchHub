import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import { HiTrash, HiOutlineExclamationCircle } from "react-icons/hi";


type DeleteStaffProp = {
	staffId: string;
	staffFirstName: string;
	staffLastName: string;
}

const DeleteChurchStaffModal = function ({ staffId, staffFirstName, staffLastName }: DeleteStaffProp) {
	const [isOpen, setOpen] = useState(false);


	console.log("staffId:++++++++",staffId)
	return (
		<>
			<Button color="failure" onClick={() => setOpen(!isOpen)}>
				<HiTrash className="mr-2 text-lg" />

			</Button>
			<Modal onClose={() => setOpen(false)} show={isOpen} size="md">
				<Modal.Header className="px-3 pb-0 pt-3">
					<span className="sr-only">Delete Church Staff</span>
				</Modal.Header>
				<Modal.Body className="px-6 pb-6 pt-0">
					<div className="flex flex-col items-center gap-y-6 text-center">
						<HiOutlineExclamationCircle className="text-7xl text-red-600" />
						<p className="text-lg text-gray-500 dark:text-gray-300">
							Are you sure you want to delete <span className="text-red-600">{staffFirstName} {staffLastName}</span>?
						</p>
						<div className="flex items-center gap-x-3">
							<Button color="failure" onClick={() => setOpen(false)}>
								Yes, I'm sure
							</Button>
							<Button color="gray" onClick={() => setOpen(false)}>
								No, cancel
							</Button>
						</div>
					</div>
				</Modal.Body>
			</Modal>
		</>
	);
};

export default DeleteChurchStaffModal;