import AddChurchBranch from "@/components/branches/AddChurchBranch"
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { useEffect } from 'react';
import { getAllChurchBranches } from '@/features/church-branches/churchBranchesSlice';
import BranchesTable from "@/components/branches/BranchesTable";
import PageHeader from "@/components/layout/PageHeader";


const ChurchBranchPage = () => {
  const dispatch = useAppDispatch()
  const churchBranches = useAppSelector(state => state.branches.data) || [];


  useEffect(() => {
    dispatch(getAllChurchBranches())
  }, [churchBranches])


  console.log(churchBranches)

  return (
    <>
      <main className="relative z-0 mb-24">
        <PageHeader title="Church Branch">
          <AddChurchBranch />
        </PageHeader>
        <div className="mt-4 mx-4">
          {/* <Table rows={formattedChurchBranches} headers={headers} link="church-branches"/> */}
          <BranchesTable branches={churchBranches ?? []} />
        </div>
      </main>
    </>
  )
}

export default ChurchBranchPage