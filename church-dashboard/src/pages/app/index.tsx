import { useAppDispatch, useAppSelector } from '@/app/hooks'
import BalanceInquiry from '@/components/app/BalanceInquiry'
import ChurchCard from '@/components/app/ChurchCard'
import Transaction from '@/components/app/Transaction'
import ChurchMembers from '@/components/members/ChurchMembers'
import { getAccountBalance } from '@/features/account/accountSlice'
import { useEffect } from 'react'

const AppPage = () => {
	const dispatch = useAppDispatch()

	const accountBalance = useAppSelector(state => state.accounts.data);
	const loading = useAppSelector(state => state.accounts.loading);
	// const errors = useAppSelector(state => state.insights.error)


	useEffect(() => {
		dispatch(getAccountBalance())
	}, [])


	return (
		<main className='lg:mt-10 mt-4 text-black  flex-1 mb-24' >
			<ChurchCard />
			<div className='mx-4 mt-4 grid lg:grid-cols-2 grid-cols-1 gap-4'>
				<ChurchMembers />
				<Transaction />
			</div>
			<div className='mx-4 mt-4 grid grid-cols-1 gap-4'>
				<BalanceInquiry />
			</div>





			{/* <AnalyticCard />
				<ChurchCard />
				<AnalyticCard /> */}
			<p></p>
		</main>
	)
}

export default AppPage