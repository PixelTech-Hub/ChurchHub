import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import AddChurchMinistry from "@/components/ministries/AddChurchMinistry"
import MinistryTable from "@/components/ministries/MinistryTable";
import { getAllChurchMinistries } from "@/features/church-ministry/churchMinistrySlice";


const ChurchMinistriesPage = () => {
	const dispatch = useAppDispatch()
	const ministries = useAppSelector(state => state.ministries.data) || [];


	useEffect(() => {
		dispatch(getAllChurchMinistries())
	}, [ministries])

	console.log(ministries)
	return (
		<main className="relative z-0 mb-24">
			<div className="flex  flex-1 items-center justify-between gap-4 m-4 px-4   lg:p-2 p-1 rounded-md bg-white ">
				<div className="flex items-center  tracking-wider font-bold lg:text-xl text-[10px] ">
					CHURCH MINISTIRES
				</div>
				<div className="">
					<AddChurchMinistry />
				</div>
			</div>
			<div className="mt-4 mx-4">
				<MinistryTable
					ministries={ministries}
				/>
			</div>
		</main>
	)
}

export default ChurchMinistriesPage