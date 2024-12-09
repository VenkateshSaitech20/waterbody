'use client'
import { useEffect, useState, useMemo, useCallback } from 'react';
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import classnames from 'classnames';
import { rankItem } from '@tanstack/match-sorter-utils';
import PropTypes from "prop-types";
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable, getFilteredRowModel, getFacetedRowModel, getFacetedUniqueValues, getFacetedMinMaxValues, getPaginationRowModel, getSortedRowModel } from '@tanstack/react-table';
import TablePaginationComponent from '@components/TablePaginationComponent';
import tableStyles from '@core/styles/table.module.css';
import Loader from '@/components/loader';
import ConfirmationDialog from '@/components/dialogs/confirmation-dialog';
import { pageList, responseData } from '@/utils/message';
import apiClient from '@/utils/apiClient';
import { signOut } from 'next-auth/react';
import { getLocalizedUrl } from '@/utils/i18n';
import { CardContent } from '@mui/material';
import ReviewFilterForm from '@/components/ReviewFilterForm';
import apiWBDClient from '@/utils/apiWBDClient';
import { useParams, useRouter } from 'next/navigation';
const Icon = styled('i')({})

const fuzzyFilter = (row, columnId, value, addMeta) => {
    const itemRank = rankItem(row.getValue(columnId), value)
    addMeta({
        itemRank
    })
    return itemRank.passed
};

const columnHelper = createColumnHelper()

const ApprovedReviewTable = ({ approvedReviewPermission }) => {
    const [rowSelection, setRowSelection] = useState({})
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [globalFilter, setGlobalFilter] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [idToDelete, setIdToDelete] = useState('');
    const [searchFilter, setSearchFilter] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(Number(pageList[0].value));
    const [totalPages, setTotalPages] = useState();
    const router = useRouter();

    const getReviews = useCallback(async (searchFilter) => {
        setIsLoading(true);
        const response = await apiWBDClient.post("water-body-details/review/get-approved-reviews", {
            searchFilter,
            page: currentPage,
            pageSize
        });
        if (response.data.result === true) {
            setData(response.data.message);
            setFilteredData(response.data.message)
            setTotalPages(response.data.totalPages);
            setIsLoading(false);
        } else if (response.data.result === false) {
            if (response?.data?.message?.roleError?.name === responseData.tokenExpired || response?.data?.message?.invalidToken === responseData.invalidToken) {
                await signOut({ callbackUrl: process.env.NEXT_PUBLIC_APP_URL });
                sessionStorage.removeItem("token");
            }
            setIsLoading(false);
        }
    }, [searchFilter, currentPage]);

    const { lang: locale } = useParams()

    const handleViewPage = (id) => {
        const url = getLocalizedUrl(`/pages/waterbody-details/approved-reviews/${id}`, locale)
        router.push(url);
    };

    useEffect(() => {
        getReviews(searchFilter);
    }, [searchFilter, currentPage, pageSize]);

    const handleConfirmation = async (confirmed) => {
        setIsLoading(true);
        if (confirmed) {
            const response = await apiClient.put('/api/master-data-settings/taluk', { id: idToDelete });
            if (response.data.result === true) {
                await getReviews(searchFilter);
                setOpen(false);
            } else if (response.data.result === false) {
                if (response?.data?.message?.roleError?.name === responseData.tokenExpired || response?.data?.message?.invalidToken === responseData.invalidToken) {
                    await signOut({ callbackUrl: process.env.NEXT_PUBLIC_APP_URL });
                    sessionStorage.removeItem("token");
                }
            }
        };
        setIsLoading(false);
        setIdToDelete(null);
    };

    const columns = useMemo(() => {
        const canDelete = approvedReviewPermission?.deletePermission === 'Y';
        const canEdit = approvedReviewPermission?.editPermission === 'Y';
        const baseColumns = [
            columnHelper.accessor('surveyNumber', {
                header: 'Survey Number',
                cell: ({ row }) => (
                    <div className='flex items-center gap-2'>
                        <Icon />
                        <Typography className='capitalize' color='text.primary'>
                            {row.original.surveyNumber}
                        </Typography>
                    </div>
                )
            }),
            columnHelper.accessor('waterBodyId', {
                header: 'Unique ID',
                cell: ({ row }) => (
                    <div className='flex items-center gap-2'>
                        <Icon />
                        <Typography color='text.primary' >
                            {row.original.waterBodyId}
                        </Typography>
                    </div>
                )
            }),
            columnHelper.accessor('waterBodyName', {
                header: 'Waterbody Name',
                cell: ({ row }) => (
                    <div className='flex items-center gap-2'>
                        <Icon />
                        <Typography color='text.primary' >
                            {row.original.waterBodyName}
                        </Typography>
                    </div>
                )
            }),
            columnHelper.accessor('waterBodyType', {
                header: 'Waterbody Type',
                cell: ({ row }) => (
                    <div className='flex items-center gap-2'>
                        <Icon />
                        <Typography color='text.primary' >
                            {row.original.waterBodyType}
                        </Typography>
                    </div>
                )
            }),
            columnHelper.accessor('waterBodyAvailability', {
                header: 'Availability',
                cell: ({ row }) => (
                    <div className='flex items-center gap-2'>
                        <Icon />
                        <Typography color='text.primary' >
                            {row.original.waterBodyAvailability}
                        </Typography>
                    </div>
                )
            }),
            columnHelper.accessor('taluk', {
                header: 'Taluk',
                cell: ({ row }) => (
                    <div className='flex items-center gap-2'>
                        <Icon />
                        <Typography color='text.primary' >
                            {row.original.taluk}
                        </Typography>
                    </div>
                )
            }),
            columnHelper.accessor('block', {
                header: 'Block',
                cell: ({ row }) => (
                    <div className='flex items-center gap-2'>
                        <Icon />
                        <Typography color='text.primary' >
                            {row.original.block}
                        </Typography>
                    </div>
                )
            }),
            columnHelper.accessor('village', {
                header: 'Village',
                cell: ({ row }) => (
                    <div className='flex items-center gap-2'>
                        <Icon />
                        <Typography color='text.primary' >
                            {row.original.village}
                        </Typography>
                    </div>
                )
            }),
            columnHelper.accessor('jurisdiction', {
                header: 'Jurisdiction',
                cell: ({ row }) => (
                    <div className='flex items-center gap-2'>
                        <Icon />
                        <Typography color='text.primary' >
                            {row.original.jurisdiction}
                        </Typography>
                    </div>
                )
            }),
            columnHelper.accessor('ward', {
                header: 'Ward',
                cell: ({ row }) => (
                    <div className='flex items-center gap-2'>
                        <Icon />
                        <Typography color='text.primary' >
                            {row.original.ward}
                        </Typography>
                    </div>
                )
            }),
        ];

        if (canDelete || canEdit) {
            baseColumns.push(
                columnHelper.accessor('action', {
                    header: 'Action',
                    cell: ({ row }) => (
                        <div className='flex items-center'>
                            <IconButton onClick={() => handleViewPage(row.original.id)}>
                                <i className='bx-show text-textSecondary text-[22px]' />
                            </IconButton>
                        </div>
                    ),
                    enableSorting: false
                })
            );
        }
        return baseColumns;
    }, [data, filteredData, approvedReviewPermission]);

    const table = useReactTable({
        data: filteredData,
        columns,
        pageCount: totalPages,
        manualPagination: true,
        state: {
            rowSelection,
        },
        initialState: {
            pagination: {
                pageSize: pageSize
            }
        },
        onPaginationChange: ({ pageSize, pageIndex }) => {
            setPageSize(pageSize);
            setCurrentPage(pageIndex + 1);
        },
        enableRowSelection: true,
        globalFilterFn: fuzzyFilter,
        onRowSelectionChange: setRowSelection,
        getCoreRowModel: getCoreRowModel(),
        onGlobalFilterChange: setGlobalFilter,
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFacetedRowModel: getFacetedRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
        getFacetedMinMaxValues: getFacetedMinMaxValues()
    })

    return (
        <Card>
            <CardContent>
                <ReviewFilterForm setSearchFilter={setSearchFilter} />
            </CardContent>
            <div className='overflow-x-auto'>
                <table className={tableStyles.table}>
                    <thead>
                        {table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map(header => (
                                    <th key={header.id}>
                                        {header.isPlaceholder ? null : (
                                            <div className={classnames({
                                                'flex items-center': header.column.getIsSorted(),
                                                'cursor-pointer select-none': header.column.getCanSort()
                                            })}
                                                onClick={header.column.getToggleSortingHandler()}
                                            >
                                                {flexRender(header.column.columnDef.header, header.getContext())}
                                                {{
                                                    asc: <i className='bx-chevron-up text-xl' />,
                                                    desc: <i className='bx-chevron-down text-xl' />
                                                }[header.column.getIsSorted()] ?? null}
                                            </div>
                                        )}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    {table.getFilteredRowModel().rows.length === 0 ? (
                        <tbody>
                            <tr>
                                <td colSpan={table.getVisibleFlatColumns().length ?? 0} className='text-center'>
                                    {isLoading ? <Loader /> : 'No data available'}
                                </td>
                            </tr>
                        </tbody>
                    ) : (

                        <tbody>
                            {isLoading ?
                                <tr>
                                    <td colSpan={table.getVisibleFlatColumns().length ?? 0} className='text-center'>
                                        <Loader />
                                    </td>
                                </tr>
                                :
                                table.getRowModel()
                                    .rows.slice(0, pageSize)
                                    .map(row => {
                                        return (
                                            <tr key={row.id} className={classnames({ selected: row.getIsSelected() })}>
                                                {row.getVisibleCells().map(cell => (
                                                    <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                                                ))}
                                            </tr>
                                        )
                                    })
                            }
                        </tbody>
                    )}
                </table>
            </div>
            <TablePaginationComponent
                table={table}
                totalPages={totalPages}
                pageSize={pageSize}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
            <ConfirmationDialog open={open} setOpen={setOpen} type='delete-data' onConfirm={handleConfirmation} name="taluk" />
        </Card>
    )
}

ApprovedReviewTable.propTypes = {
    approvedReviewPermission: PropTypes.any,
}

export default ApprovedReviewTable
