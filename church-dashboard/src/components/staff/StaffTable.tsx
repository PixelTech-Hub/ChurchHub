import { ColumnDef, ColumnFiltersState, SortingState, VisibilityState, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import { AiOutlineRight } from "react-icons/ai";
import { Link } from "react-router-dom";
import React from "react";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDownIcon } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChurchStaff } from "@/types/ChurchStaff";
import DeleteStaffCard from "./DeleteStaffCard";

const staffData: ColumnDef<ChurchStaff>[] = [
	{
		accessorKey: "first_name",
		header: "First Name",
		cell: ({ row }) => (
			<div className="lg:text-base text-[10px] w-52 capitalize truncate">{row.getValue("first_name")}</div>
		),
	},
	{
		accessorKey: "last_name",
		header: "Other Name",
		cell: ({ row }) => (
			<div className="lg:text-base text-[10px] w-52 capitalize truncate">{row.getValue("last_name")}</div>
		),
	},
	{
		accessorKey: "position",
		header: "Position",
		cell: ({ row }) => (
			<div className="lg:text-base text-[10px] w-52 capitalize truncate">{row.getValue("position")}</div>
		),
	},
	{
		accessorKey: "gender",
		header: "Gender",
		cell: ({ row }) => (
			<div className="lg:text-base text-[10px] w-52 capitalize truncate">{row.getValue("gender")}</div>
		),
	},
	{
		accessorKey: "career",
		header: "Career",
		cell: ({ row }) => (
			<div className="lg:text-base text-[10px] w-52 capitalize truncate">{row.getValue("career")}</div>
		),
	},
	{
		accessorKey: "marital_status",
		header: "Marital Status",
		cell: ({ row }) => (
			<div className="lg:text-base text-[10px] w-52 capitalize truncate">{row.getValue("marital_status")}</div>
		),
	},


	{
		accessorKey: "id",
		header: "ACTION",
		cell: ({ row }) => {
			const staffId: string = row.getValue("id");
			const staffFirstName = row.getValue("first_name")
			const staffLastName = row.getValue("last_name")

			return (
				<div className="flex items-center gap-1 text-[10px]">

					<Link to={`/app/church-staff/${staffId}`} className="bg-green-500 p-2.5 rounded-md">
						<AiOutlineRight color="white" size={20} />
					</Link>
					<DeleteStaffCard
						id={`${staffId}` ?? ''}
						firstname={`${staffFirstName}`}
						lastname={`${staffLastName}`}
					/>
				</div >
			);
		},
	},
]

interface StaffProps {
	staffs: ChurchStaff[];
}

const StaffTable = ({ staffs }: StaffProps) => {
	const [sorting, setSorting] = React.useState<SortingState>([])
	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
	const [columnVisibility, setColumnVisibility] =
		React.useState<VisibilityState>({})
	const [rowSelection, setRowSelection] = React.useState({})

	const table = useReactTable({
		data: staffs,
		columns: staffData,
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
		onRowSelectionChange: setRowSelection,
		state: {
			sorting,
			columnFilters,
			columnVisibility,
			rowSelection,
		},
	})
	return (
		<div className="w-full ">
			<div className="flex items-center py-4 gap-4">
				<Input
					placeholder="Filter church staff name..."
					value={(table.getColumn("first_name")?.getFilterValue() as string) ?? ""}
					onChange={(event) =>
						table.getColumn("first_name")?.setFilterValue(event.target.value)
					}
					className="max-w-sm"
				/>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="outline" className="ml-auto">
							Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						{table
							.getAllColumns()
							.filter((column) => column.getCanHide())
							.map((column) => {
								return (
									<DropdownMenuCheckboxItem
										key={column.id}
										className="capitalize"
										checked={column.getIsVisible()}
										onCheckedChange={(value) =>
											column.toggleVisibility(!!value)
										}
									>
										{column.id}
									</DropdownMenuCheckboxItem>
								)
							})}
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
			<div className="rounded-md border bg-white ">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead key={header.id}>
											{header.isPlaceholder
												? null
												: flexRender(
													header.column.columnDef.header,
													header.getContext()
												)}
										</TableHead>
									)
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody className="g">
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow
									key={row.id}
									data-state={row.getIsSelected() && "selected"}
									className="cursor-pointer hover:bg-[#00283A] hover:text-white"
								>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id} className="hover:text-white">
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext()
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									// colSpan={}
									className="h-24 text-center"
								>
									No Results found
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
			<div className="flex items-center justify-end space-x-2 py-4">
				<div className="flex-1 text-sm text-muted-foreground">
					{table.getFilteredSelectedRowModel().rows.length} of{" "}
					{table.getFilteredRowModel().rows.length} row(s) selected.
				</div>
				<div className="space-x-2">
					<Button
						variant="outline"
						size="sm"
						onClick={() => table.previousPage()}
						disabled={!table.getCanPreviousPage()}
					>
						Previous
					</Button>
					<Button
						variant="outline"
						size="sm"
						onClick={() => table.nextPage()}
						disabled={!table.getCanNextPage()}
					>
						Next
					</Button>
				</div>
			</div>
		</div>
	)
}

export default StaffTable