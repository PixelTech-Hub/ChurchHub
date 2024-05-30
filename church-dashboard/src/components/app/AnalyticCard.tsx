import BalanceInquiry from "./BalanceInquiry"


const AnalyticCard = () => {
	return (
		<div className='mx-4 mt-6 mb-2'>
			<div className="flex flex-1 lg:flex-row flex-col items-center lg:gap-10 gap-4">
				<BalanceInquiry />
				<BalanceInquiry />
				
			</div>
		</div>
	)
}

export default AnalyticCard