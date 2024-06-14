

interface Props {
	value: string;
	setValue: any
	label: string;
	type: string
}

const Input = ({ value, label, type, setValue }: Props) => {
	return (
		<div className=' gap-2'>
			<label htmlFor={value} className='font-semibold lg:text-lg text:[12px]'>{label}:</label>
			<input
				type={type}
				className='outline-red-500 bg-gray-200 text-black w-full h-[2.5rem] px-2 rounded-md p-1 lg:text-[16px] text-[12px]'
				value={value}
				onChange={(e) => setValue(e.target.value)}
			/>

		</div>
	)
}

export default Input