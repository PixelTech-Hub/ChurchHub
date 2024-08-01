interface StatCardProps {
	title: string;
	value: number;
	change: number;
	icon: React.ReactNode;
	color: string;
}

const StatisticCard: React.FC<StatCardProps> = ({ title, value, change, icon, color }) => {
	return (
		<div className={`relative overflow-hidden rounded-xl shadow-lg ${color} p-6 transition-all duration-300 hover:shadow-xl hover:scale-105`}>
			<div className="absolute top-0 right-0 -mt-4 -mr-4 h-16 w-16 rounded-full bg-white opacity-10"></div>
			<div className="absolute bottom-0 left-0 -mb-4 -ml-4 h-16 w-16 rounded-full bg-white opacity-10"></div>
			<div className="relative z-10">
				<div className="flex items-center justify-between mb-2">
					<h3 className="text-xl font-bold text-white">{title}</h3>
					<div className="p-2 bg-white bg-opacity-30 rounded-lg">
						{icon}
					</div>
				</div>
				<div className="flex items-end justify-between">
					<div>
						<p className="text-4xl font-extrabold text-white mb-1">{value.toLocaleString()}</p>
						<p className={`text-sm font-medium ${change >= 0 ? 'text-green-300' : 'text-red-300'}`}>
							{change >= 0 ? '↑' : '↓'} {Math.abs(change)}% from last month
						</p>
					</div>
					<div className="text-white text-opacity-50 text-4xl font-bold">
						{(value % 100).toString().padStart(2, '0')}
					</div>
				</div>
			</div>
		</div>
	);
};
export default StatisticCard;