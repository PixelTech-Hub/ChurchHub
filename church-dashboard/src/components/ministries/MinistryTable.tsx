import { ColumnDef, ColumnFiltersState, SortingState, VisibilityState, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table"
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDownIcon } from "lucide-react";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table"
import { ChurchMinistry } from "@/types/ChurchMinistry";
import EditChurchMinistry from "./EditChurchMinistry";
import DeleteChurchMinistry from "./DeleteChurchMinistry";


const ministryData: ColumnDef<ChurchMinistry>[] = [
	{
		accessorKey: "name",
		header: "Name",
		cell: ({ row }) => (
			<div className="lg:text-base text-[10px] w-52 capitalize">{row.getValue("name")}</div>
		),
	},
	{
		accessorKey: "leader",
		header: "Leader",
		cell: ({ row }) => (
			<div className="lg:text-base text-[10px]">{row.getValue("leader")}</div>
		),
	},
	{
		accessorKey: "description",
		header: "Description",
		cell: ({ row }) => (

			<p className=" lg:text-base text-[10px] md:px-4 px-2 truncate">	{row.getValue("description")}</p>
		),
	},

	{
		accessorKey: "id",
		header: "ACTION",
		cell: ({ row }) => {
			// const branchId = row.getValue("id");

			return (
				<div className="flex items-center gap-1  text-[10px]">

					<EditChurchMinistry
						id={row.getValue("id")}
						name={row.getValue("name")}
						leader={row.getValue("leader")}
						description={row.getValue("description")}
					/>
					<DeleteChurchMinistry
						id={row.getValue("id")}
						name={row.getValue("name")}
					/>
				</div>
			);
		},
	},
]



interface Props {
	ministries: ChurchMinistry[];
}


const MinistryTable = ({ ministries, }: Props): React.ReactElement => {
	const [sorting, setSorting] = React.useState<SortingState>([])
	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
	const [columnVisibility, setColumnVisibility] =
		React.useState<VisibilityState>({})
	const [rowSelection, setRowSelection] = React.useState({})

	const table = useReactTable({
		data: ministries,
		columns: ministryData,
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
					placeholder="Filter church ministry category..."
					value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
					onChange={(event) =>
						table.getColumn("name")?.setFilterValue(event.target.value)
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

export default MinistryTable