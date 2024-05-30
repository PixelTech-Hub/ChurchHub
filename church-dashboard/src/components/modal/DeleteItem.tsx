import React from 'react';
import { AiOutlineDelete } from 'react-icons/ai';

interface DeleteProps {
	children: any;
	title: string;
	handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
	showModal: boolean
	setShowModal: any
	isLoading: boolean
}

const DeleteItem = ({ children, handleSubmit, title, isLoading, setShowModal, showModal }: DeleteProps) => {
	return (
		<>
			<section className="mt-4">

			</section>
			<button className="text-white bg-red-500  font-bold p-2 rounded-md" type="button" onClick={() => setShowModal(true)}>
				<AiOutlineDelete color="white" size={20} />
			</button>
			{showModal ? (
				<div className="bg-black bg-opacity-80 backdrop-blur-sm justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
					<div className="relative  lg:my-10 lg:mx-24 mx-10 max-w-3xl  lg:mt-[-120px] mt-[270px]">
						{/*content*/}
						<div className="border-0 lg:p-4 p-2 rounded-lg shadow-lg relative flex flex-col lg:w-[600px] w-[400px] bg-white outline-none focus:outline-none">
							<div className='p-2 px-4'>
								<h1 className='font-bold text-2xl text-black'>Are you sure you want to delete <span className='text-red-500'>{title}</span></h1>
							</div>
							<form className="space-y-3 lg:p-5 p-2 lg:text-lg text-[14px]" onSubmit={handleSubmit}>
								{children}
								<div className='flex items-center gap-4'>
									<button type="submit" className="bg-[#200e32] text-white p-1 px-2 w-full rounded-lg">{isLoading ? 'Processing...' : 'Delete'}</button>
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

export default DeleteItem