import { FC, useState } from "react";

interface InfoItemProps {
    icon: React.ReactNode;
    label: string;
    value: string;
    href?: string;
    tooltip?: string;
    isEmail?: boolean;
    recipientEmail?: string;  // Add this prop
}

const InfoItem: FC<InfoItemProps> = ({ icon, label, value, href, tooltip, isEmail }) => {
	const [showTooltip, setShowTooltip] = useState(false);

	const handleEmailClick = (e: React.MouseEvent) => {
		if (isEmail) {
			e.preventDefault();
			const subject = encodeURIComponent("Greetings from Church");
			const body = encodeURIComponent(`Dear ${value},\n\nI hope this email finds you well. I'm reaching out regarding...`);
			window.location.href = `mailto:${value}?subject=${subject}&body=${body}`;
		}
	};

	const content = (
		<>
			{icon}
			<div>
				<p className="text-sm font-medium text-gray-500 dark:text-gray-300">{label}</p>
				<p className="text-base font-semibold text-gray-800 dark:text-white">{value}</p>
			</div>
		</>
	);

	return (
		<div className="relative">
			{href ? (
				<a
					href={href}
					className="flex items-center space-x-3 bg-white dark:bg-gray-600 p-3 rounded-lg shadow hover:bg-gray-50 dark:hover:bg-gray-500 transition duration-150 ease-in-out"
					onMouseEnter={() => setShowTooltip(true)}
					onMouseLeave={() => setShowTooltip(false)}
					onClick={isEmail ? handleEmailClick : undefined}
					target={isEmail ? undefined : "_blank"}
					rel={isEmail ? undefined : "noopener noreferrer"}
				>
					{content}
				</a>
			) : (
				<div className="flex items-center space-x-3 bg-white dark:bg-gray-600 p-3 rounded-lg shadow">
					{content}
				</div>
			)}
			{tooltip && showTooltip && (
				<div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-gray-800 text-white text-xs rounded shadow">
					{tooltip}
				</div>
			)}
		</div>
	);
};
export default InfoItem;