import { Modal } from 'flowbite-react'
import { FC } from 'react'

interface DisableAppProp {
	setModalIsOpen: any
	closeModal: () => void
	modalIsOpen: boolean;
	userChurch: any
}


const DisableApp:FC<DisableAppProp> = ({modalIsOpen, setModalIsOpen, closeModal, userChurch}) => {
	return (
		<Modal
			onClose={() => setModalIsOpen(false)}
			show={modalIsOpen}
			size="xl"
			className="church-disabled-modal"
		>
			<Modal.Header className="bg-red-100 text-red-800 px-6 py-4 rounded-t-lg">
				<h2 className="text-2xl font-bold flex items-center">
					<svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
						<path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
					</svg>
					Church Account Disabled
				</h2>
			</Modal.Header>
			<Modal.Body className="px-6 py-4">
				<p className="mb-4 text-gray-700">
					We regret to inform you that <span className='text-red-500'>{userChurch.name}</span> account is currently disabled. This may be due to one of the following reasons:
				</p>
				<ul className="list-disc list-inside mb-4 text-gray-600">
					<li>Administrative review</li>
					<li>Payment issues</li>
					<li>Violation of terms of service</li>
					<li>Temporary maintenance</li>
				</ul>
				<p className="mb-4 text-gray-700">
					For more information or to reactivate your account, please contact our support team:
				</p>
				<div className="bg-blue-100 p-4 rounded-lg">
					<p className="text-blue-800 font-semibold">Support Contact:</p>
					<p className="text-blue-700">Email: support@churchhub.com</p>
					<p className="text-blue-700">Phone: (256) 772 837 541</p>
				</div>
			</Modal.Body>
			<Modal.Footer className="px-6 py-4 bg-gray-50 rounded-b-lg">
				<button
					onClick={closeModal}
					className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105"
				>
					Close
				</button>
			</Modal.Footer>
		</Modal>
	)
}

export default DisableApp