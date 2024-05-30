import { useAppDispatch, useAppSelector } from "@/app/hooks"
import PageHeader from "@/components/layout/PageHeader"
import AddChurchService from "@/components/services/AddChurchService"
import ServicesTable from "@/components/services/ServicesTable"
import { getAllChurchServices } from "@/features/church-services/churchServiceSlice"
import { useEffect } from "react"


const ChurchServicePage = () => {
	const dispatch = useAppDispatch()
	const churchServices = useAppSelector(state => state.services.data);


	useEffect(() => {
		dispatch(getAllChurchServices())
	}, [churchServices])
	return (
		<>
			<main className="relative z-0 mb-24">
				<PageHeader title="Church Service">
					<AddChurchService />
				</PageHeader>
				<div className="mt-4 mx-4">
					<ServicesTable
						services={churchServices ?? []}
					/>
				</div>
			</main>
		</>
	)
}

export default ChurchServicePage
