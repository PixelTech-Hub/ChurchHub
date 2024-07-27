import { FC } from "react";
import { Users } from "../../types/Users";
import { Button, Pagination, Table } from "flowbite-react";
import { Link } from "react-router-dom";
import { HiArrowRight } from "react-icons/hi";

interface ChurchAdminTableProps {
    paginatedChurchAdmins: Users[];
    filteredChurchAdmins: Users[];
    loading: boolean;
    totalPages: number;
    currentPage: number;
    setCurrentPage: (page: number) => void;
    fetchChurchAdmins: () => void;
}

const ChurchAdminTable: FC<ChurchAdminTableProps> = ({ currentPage, filteredChurchAdmins, loading, paginatedChurchAdmins, setCurrentPage, totalPages }) => {
    if (loading) {
        return <p>Loading....</p>;
    }
    if (filteredChurchAdmins.length === 0) {
        return (
            <div className="text-center py-4">
                <p className="text-red-500 dark:text-gray-400">No Church Admin Found</p>
            </div>
        );
    }

    // const toggleChurchStatus = async (adminId: string, currentStatus: boolean) => {
    //     try {
    //         const response = await fetch(`${CHURCH_ADMIN_API_URL}/${adminId}`, {
    //             method: 'PATCH',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({ isEnabled: !currentStatus }),
    //         });

    //         if (!response.ok) {
    //             throw new Error('Failed to update church admin status');
    //         }

    //         fetchChurchAdmins();
    //     } catch (error) {
    //         console.error('Error updating church admin status:', error);
    //     }
    // };

    return (
        <>
            <Table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
                <Table.Head className="bg-gray-100 dark:bg-gray-700">
                    <Table.HeadCell>Name</Table.HeadCell>
                    <Table.HeadCell>Email</Table.HeadCell>
                    <Table.HeadCell>Title</Table.HeadCell>
                    <Table.HeadCell>Role</Table.HeadCell>
                    <Table.HeadCell>Church</Table.HeadCell>
                    <Table.HeadCell>Actions</Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
                    {paginatedChurchAdmins.map(admin => (
                        <Table.Row key={admin.id} className="hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                            <Table.Cell className="whitespace-nowrap p-4 text-sm font-normal text-gray-500 dark:text-gray-400">
                                <div className="text-base font-semibold text-gray-900 dark:text-white">
                                    {admin.name}
                                </div>
                            </Table.Cell>
                            <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
                                {admin.email}
                            </Table.Cell>
                            <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white capitalize">
                                {admin.title}
                            </Table.Cell>
                            <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
                                {admin.role}
                            </Table.Cell>
                            <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
                                {admin.church?.name || 'N/A'}
                            </Table.Cell>
                            <Table.Cell className="space-x-2 whitespace-nowrap p-4">
                                <div className="flex items-center gap-x-3">
                                    <Link to={`/church-admin/${admin.id}`} className="">
                                        <Button color="success">
                                            <HiArrowRight className="mr-2 text-lg" />
                                        </Button>
                                    </Link>
                                </div>
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
            <div className="flex overflow-x-auto sm:justify-center">
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                    showIcons={true}
                />
            </div>
        </>
    );
}

export default ChurchAdminTable;