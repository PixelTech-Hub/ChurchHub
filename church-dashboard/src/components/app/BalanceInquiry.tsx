import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";



const data = [
	{
		name: 'Jan - Mar',
		uv: 4000,
		pv: 2400,
		amt: 2400,
	},
	{
		name: 'Apri - Jun',
		uv: 3000,
		pv: 1398,
		amt: 2210,
	},
	{
		name: 'Jul - Sept',
		uv: 2000,
		pv: 9800,
		amt: 2290,
	},
	{
		name: 'Oct - Dev',
		uv: 2780,
		pv: 3908,
		amt: 2000,
	},
];




const BalanceInquiry = () => {
	return (
		<div className="bg-white lg:h-[750px] md:h-[400px] h-[350px]  w-full rounded-lg pb-10">
			<div className="lg:p-4 p-2">
				<div className=" font-bold text-xl flex justify-between">
					<h1>Church Transactions</h1>
					<p>2024</p>
				</div>

			</div>
			<ResponsiveContainer width="100%" height="100%" className="lg:p-10 md:p-8 p-5">
				<AreaChart
					width={200}
					height={400}
					data={data}
					margin={{
						top: 10,
						right: 20,
						left: 0,
						bottom: 0,
					}}
				>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey="name" />
					<YAxis color="#8d220a"/>
					<Tooltip />
					<Area type="monotone" dataKey="uv" stroke="#0c0c0c" fill="#0a082a" />
				</AreaChart>
			</ResponsiveContainer>
		</div>
	)
}

export default BalanceInquiry