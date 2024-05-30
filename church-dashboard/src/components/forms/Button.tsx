
interface ButtonProps {
	children: string;
}

const Button = ({ children, }: ButtonProps) => {
	return (
		<button type="submit" className="bg-green-950 text-white p-1 px-2 w-full rounded-lg">{children}</button>
	)
}

export default Button