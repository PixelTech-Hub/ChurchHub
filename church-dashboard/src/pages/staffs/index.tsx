import { useAppDispatch, useAppSelector } from "@/app/hooks";
import PageHeader from "@/components/layout/PageHeader";
import StaffTable from "@/components/staff/StaffTable";
import { getAllChurchStaffs } from "@/features/staffs/staffSlice";
import { useEffect } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { Link } from "react-router-dom";


const ChurchEmployeesPage = () => {
	const dispatch = useAppDispatch()
	const staffs = useAppSelector(state => state.staff.data) || [];


	useEffect(() => {
		dispatch(getAllChurchStaffs())
	}, [])


	console.log(staffs)


	return (
		<>
			<main className="relative z-0 mb-24">
				<PageHeader title="Church Staffs">
					{/* <AddChurchEvent /> */}
					<Link to='/app/church-staff/new' className="flex items-center font-bold lg:text-xl text-[10px]">
						<AiOutlinePlus size={25}/>
						Add New Staff
					</Link>
				</PageHeader>
				<div className="mt-4 mx-4">
					<StaffTable staffs={staffs ?? []} />
				</div>
			</main >
		</>
	)
}

export default ChurchEmployeesPage