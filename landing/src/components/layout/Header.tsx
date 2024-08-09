import { FaChurch } from "react-icons/fa"
import { Button } from "../ui/button"


const Header = () => {
	return (
		<header className="py-4 px-4 sm:px-6 lg:px-8">
			<nav className="flex flex-col sm:flex-row justify-between items-center">
				<div className="flex items-center space-x-2 mb-4 sm:mb-0">
					<FaChurch className="text-indigo-600 text-3xl" />
					<span className="text-2xl font-bold text-gray-800">Church Hub</span>
				</div>
				<div className="flex flex-wrap justify-center space-x-2 space-y-2 sm:space-y-0">
					<Button variant="ghost" className="w-full sm:w-auto">Features</Button>
					<Button variant="ghost" className="w-full sm:w-auto">Pricing</Button>
					<Button variant="ghost" className="w-full sm:w-auto">Contact</Button>
					<Button variant="default" className="w-full sm:w-auto">Get Started</Button>
					
				</div>
			</nav>
		</header>
	)
}

export default Header