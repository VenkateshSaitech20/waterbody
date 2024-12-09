'use client'
import { useEffect, useState, useMemo, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/material/styles';
import classnames from 'classnames';
import { rankItem } from '@tanstack/match-sorter-utils';
import PropTypes from "prop-types";
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
    getFilteredRowModel,
    getFacetedRowModel,
    getFacetedUniqueValues,
    getFacetedMinMaxValues,
    getPaginationRowModel,
    getSortedRowModel
} from '@tanstack/react-table';
import TextFieldStyled from '@core/components/mui/TextField';
import TablePaginationComponent from '@components/TablePaginationComponent';
import { getLocalizedUrl } from '@/utils/i18n';
import tableStyles from '@core/styles/table.module.css';
import Loader from '@/components/loader';
import ConfirmationDialog from '@/components/dialogs/confirmation-dialog';
import { pageList, responseData } from '@/utils/message';
import apiClient from '@/utils/apiClient';
import { signOut } from 'next-auth/react';
import CustomAvatar from '@/@core/components/mui/Avatar';
import AddPlan from './AddPlan';
import { CardContent } from '@mui/material';

const Icon = styled('i')({})

const fuzzyFilter = (row, columnId, value, addMeta) => {
    const itemRank = rankItem(row.getValue(columnId), value)
    addMeta({
        itemRank
    })
    return itemRank.passed
};

const columnHelper = createColumnHelper()

const PlanTable = ({ mySubscriptionPermission }) => {
    const [addPackageOpen, setAddPackageOpen] = useState(false)
    const [rowSelection, setRowSelection] = useState({})
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [globalFilter, setGlobalFilter] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [idToDelete, setIdToDelete] = useState('');
    const [searchText, setSearchText] = useState('');
    const router = useRouter();
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(Number(pageList[0].value));
    const [totalPages, setTotalPages] = useState();
    const [apiErrors, setApiErrors] = useState({});

    const handleDelete = async userId => {
        setApiErrors({});
        setIdToDelete(userId);
        setOpen(true);
    };

    const getPackageDetails = useCallback(async (searchText) => {
        setIsLoading(true);
        const response = await apiClient.post("/api/package-plans/list", {
            searchText,
            page: currentPage,
            pageSize
        });
        if (response?.data?.result === true) {
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
    }, [currentPage, pageSize]);

    const handleConfirmation = async (confirmed) => {
        setIsLoading(true);
        if (confirmed) {
            const response = await apiClient.put('/api/package-plans', { id: idToDelete });
            if (response.data.result === true) {
                await getPackageDetails(searchText);
                setOpen(false);
            } else if (response.data.result === false) {
                if (response?.data?.message?.roleError?.name === responseData.tokenExpired || response?.data?.message?.invalidToken === responseData.invalidToken) {
                    await signOut({ callbackUrl: process.env.NEXT_PUBLIC_APP_URL });
                    sessionStorage.removeItem("token");
                } else if (response?.data?.message?.delError === responseData.planDelmsg) {
                    setApiErrors(response?.data?.message);
                    setOpen(true);
                    return false;
                }
            }
        };
        setIsLoading(false);
        setIdToDelete(null);
    };

    const handleViewPackage = (id) => {
        const url = getLocalizedUrl(`/pages/my-subscription/${id}`, locale)
        router.push(url);
    };

    useEffect(() => {
        getPackageDetails(searchText);
    }, [getPackageDetails]);

    const { lang: locale } = useParams()

    const getAvatar = params => {
        const { avatar } = params

        if (avatar) {
            return <CustomAvatar src={avatar} size={34} />
        }
    }

    const columns = useMemo(() => {
        const canDelete = mySubscriptionPermission?.deletePermission === 'Y';
        const canEdit = mySubscriptionPermission?.editPermission === 'Y';

        const baseColumns = [
            columnHelper.accessor('image', {
                header: 'Image',
                cell: ({ row }) => (
                    <div className='flex items-center gap-4'>
                        {getAvatar({ avatar: row.original.image })}
                    </div>
                )
            }),
            columnHelper.accessor('title', {
                header: 'Title',
                cell: ({ row }) => (
                    <div className='flex items-center gap-4'>
                        <div className='flex flex-col'>
                            <Typography variant='h6'>{row.original.title}</Typography>
                        </div>
                    </div>
                )
            }),
            columnHelper.accessor('subtitle', {
                header: 'subtitle',
                cell: ({ row }) => (
                    <div className='flex items-center gap-2'>
                        <Typography color='text.primary'>
                            {row.original.subTitle}
                        </Typography>
                    </div>
                )
            }),
            columnHelper.accessor('rolename', {
                header: 'rolename',
                cell: ({ row }) => (
                    <div className='flex items-center gap-2'>
                        <Typography color='text.primary'>
                            {row.original.roleName}
                        </Typography>
                    </div>
                )
            }),
            columnHelper.accessor('monthlyprice', {
                header: 'monthly price',
                cell: ({ row }) => (
                    <div className='flex items-center gap-2'>
                        <Typography color='text.primary'>
                            {row.original.monthlyPrice}
                        </Typography>
                    </div>
                )
            }),
            columnHelper.accessor('annual price', {
                header: 'annual price',
                cell: ({ row }) => (
                    <div className='flex items-center gap-2'>
                        <Icon />
                        <Typography color='text.primary' >
                            {row.original.yearlyPlan.monthly}/Month - {row.original.yearlyPlan.annually}/Year
                        </Typography>
                    </div>
                )
            }),
            columnHelper.accessor('Features', {
                header: 'Features',
                cell: ({ row }) => {
                    const features = row.original.planBenefits;
                    const featureList = features.map(feature => feature.feature).join(', ');
                    return (
                        <div className='flex items-center gap-2'>
                            <Icon />
                            <Typography className='truncate w-[350px]' color='text.primary'>
                                {featureList}
                            </Typography>
                        </div>
                    );
                }
            }),
        ];

        if (canDelete || canEdit) {
            baseColumns.push(
                columnHelper.accessor('action', {
                    header: 'Action',
                    cell: ({ row }) => (
                        <div className='flex items-center'>
                            {canEdit && (
                                <IconButton onClick={() => handleDelete(row.original.id)}>
                                    <i className='bx-trash text-textSecondary text-[22px]' />
                                </IconButton>
                            )}
                            {canEdit && (
                                <IconButton onClick={() => handleViewPackage(row.original.id)}>
                                    <i className='bx-show text-textSecondary text-[22px]' />
                                </IconButton>
                            )}
                        </div>
                    ),
                    enableSorting: false
                })
            );
        }

        return baseColumns;
    }, [data, filteredData, mySubscriptionPermission]);

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

    const handlePackageAdded = async () => {
        await getPackageDetails(searchText);
    };

    const handleSearchTextChange = (e) => {
        setGlobalFilter(e.target.value);
        setSearchText(e.target.value);
    };
    const handlePlanSearch = () => {
        getPackageDetails(searchText);
    };
    return (
        <>
            <Card>
                <CardContent className='flex justify-between flex-wrap max-sm:flex-col sm:items-center gap-4'>
                    <div className='flex gap-4 max-sm:flex-col max-sm:is-full'>
                        <TextFieldStyled
                            value={globalFilter ?? ''}
                            onChange={handleSearchTextChange}
                            placeholder='Search Plan'
                            className='max-sm:is-full min-is-[220px]'
                            InputLabelProps={{ shrink: true }}
                            variant='filled'
                        />
                        <Button variant='tonal' color='primary' onClick={handlePlanSearch}>
                            {isLoading ? <Loader type="btnLoader" /> : 'Search'}
                        </Button>
                    </div>
                    <div className='flex gap-4 max-sm:flex-col max-sm:is-full'>
                        {mySubscriptionPermission && mySubscriptionPermission?.writePermission === "Y" && (
                            <Button
                                variant='contained'
                                startIcon={<i className='bx-plus' />}
                                onClick={() => setAddPackageOpen(!addPackageOpen)}
                                className='max-sm:is-full'
                            >
                                Add Plan
                            </Button>
                        )}
                        <TextFieldStyled
                            select
                            value={pageSize}
                            onChange={e => {
                                setPageSize(Number(e.target.value));
                                setCurrentPage(1);
                            }}
                            className='page-drop-size'
                            InputLabelProps={{ shrink: true }}
                            variant='filled'
                        >
                            {pageList?.map(item => (
                                <MenuItem key={item.value} value={item.value}>{item.value}</MenuItem>
                            ))}
                        </TextFieldStyled>
                    </div>
                </CardContent>
                <div className='overflow-x-auto'>
                    <table className={tableStyles.table}>
                        <thead>
                            {table.getHeaderGroups().map(headerGroup => (
                                <tr key={headerGroup.id}>
                                    {headerGroup.headers.map(header => (
                                        <th key={header.id}>
                                            {header.isPlaceholder ? null : (
                                                <div
                                                    className={classnames({
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
                                        })}
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
                <ConfirmationDialog open={open} setOpen={setOpen} type='delete-plan' onConfirm={handleConfirmation} errorMsg={apiErrors?.delError} />
            </Card>
            <AddPlan
                open={addPackageOpen}
                handleClose={() => setAddPackageOpen(!addPackageOpen)}
                handlePackageAdded={handlePackageAdded}
            />
        </>
    )
}

PlanTable.propTypes = {
    mySubscriptionPermission: PropTypes.any,
}

export default PlanTable
