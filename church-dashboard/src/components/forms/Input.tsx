

interface Props {
	placeholder: string;
	value: string;
	setValue: any
	label: string;
	type: string
}

const Input = ({value, label, type, placeholder, setValue}: Props) => {
	return (
		<div className=' gap-2'>
			<label htmlFor="name" className='text-gray-500 '>{label}</label>
			<input
				type={type}
				className='outline-[#200e32] bg-gray-200 text-black w-full rounded-md p-1 lg:text-[14px] text-[12px]'
				placeholder={placeholder}
				value={value}
				onChange={(e) => setValue(e.target.value)}
			/>

		</div>
	)
}

export default Input