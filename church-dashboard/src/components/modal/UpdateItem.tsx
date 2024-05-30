import React, { } from 'react';
import { AiOutlineEdit } from 'react-icons/ai';

interface Props {
	children: any;
	subtitle: string;
	handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
	isLoading: boolean;
	showModal: boolean;
	setShowModal: any
}

const UpdateItem = ({ children, subtitle, handleSubmit, isLoading, showModal, setShowModal }: Props) => {
	// const [showModal, setShowModal] = useState(false);

	return (
		<>

			<button className="px-2 text-white flex items-center lg:text-base text-[12px] bg-green-500 rounded-sm  font-bold lg:p-2 p-2" type="button" onClick={() => setShowModal(true)}>
				<AiOutlineEdit size={20} />Update
			</button>
			{showModal ? (
				<div className="bg-black bg-opacity-80 backdrop-blur-sm justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
					<div className="relative   lg:my-10 -my-52 lg:mx-24 mx-10 max-w-3xl  lg:mt-[-120px] md:mt-[0px]  mt-[70px]">
						{/*content*/}
						<div className="border-0 lg:p-4 md:p-10 p-8 rounded-lg shadow-lg relative flex flex-col lg:w-[600px] md:w-[500px] w-[400px] bg-white outline-none focus:outline-none">
							<div className='p-2 px-4'>
								<h1 className='font-bold text-2xl text-black'>{subtitle}</h1>
							</div>
							<form className="space-y-3 lg:p-5 p-2 lg:text-lg text-[14px]" onSubmit={handleSubmit}>
								{children}
								<div className='flex items-center gap-4'>
									<button type="submit" className="bg-[#200e32] text-white p-1 px-2 w-full rounded-lg">{isLoading ? 'Processing' : 'Create'}</button>
									<button type="submit" className="bg-red-500 text-white p-1 px-2 w-full rounded-lg" onClick={() => setShowModal(false)}>Cancel</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			) : null}
		</>
	)
}

export default UpdateItem