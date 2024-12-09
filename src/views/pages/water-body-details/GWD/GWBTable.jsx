'use client'
import { useEffect, useState, useMemo, useCallback } from 'react';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/material/styles';
import Link from '@components/Link';
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
import tableStyles from '@core/styles/table.module.css';
import Loader from '@/components/loader';
import ConfirmationDialog from '@/components/dialogs/confirmation-dialog';
import OpenDialogOnElementClick from '@components/dialogs/OpenDialogOnElementClick';
import { pageList, responseData } from '@/utils/message';
import apiWBDClient from '@/utils/apiWBDClient';
import { signOut } from 'next-auth/react';
import { CardContent } from '@mui/material';
import AddGWB from './AddGWB';
import GWBDialog from '@/components/dialogs/edit-GWB';

const Icon = styled('i')({})
const fuzzyFilter = (row, columnId, value, addMeta) => {
    const itemRank = rankItem(row.getValue(columnId), value)
    addMeta({
        itemRank
    })
    return itemRank.passed
};
const columnHelper = createColumnHelper();

const GWBTable = ({ gwbPermission }) => {
    const [addGWBOpen, setAddGWBOpen] = useState(false)
    const [rowSelection, setRowSelection] = useState({})
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [idToDelete, setIdToDelete] = useState('');
    const [searchFilter, setSearchFilter] = useState({
        taluk: '',
        village: '',
        pond: '',
        uniqueId: ''
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(Number(pageList[0].value));
    const [totalPages, setTotalPages] = useState();

    const typographyProps = {
        children: (
            <IconButton >
                <i className='bx-edit-alt text-textSecondary text-[22px]' />
            </IconButton>
        ),
        component: Link,
        color: 'primary',
        onClick: e => e.preventDefault()
    }
    const handleDelete = async cId => {
        setIdToDelete(cId);
        setOpen(true);
    };
    const getGWBList = useCallback(async (searchFilter) => {
        setIsLoading(true);
        const response = await apiWBDClient.post("/water-body-details/gwb/get", {
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
    }, [currentPage, pageSize]);
    const handleGWBAdded = () => {
        getGWBList(searchFilter);
    };
    useEffect(() => {
        getGWBList(searchFilter);
    }, [getGWBList]);
    const handleConfirmation = async (confirmed) => {
        setIsLoading(true);
        if (confirmed) {
            const response = await apiWBDClient.put(`/water-body-details/gwb/${idToDelete}`);
            if (response.data.result === true) {
                await getGWBList(searchFilter);
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
    const handleGWBUpdate = () => {
        getGWBList(searchFilter);
    };
    const columns = useMemo(() => {
        const canDelete = gwbPermission?.deletePermission === 'Y';
        const canEdit = gwbPermission?.editPermission === 'Y';
        const baseColumns = [
            columnHelper.accessor('Unique ID', {
                header: 'Unique ID',
                cell: ({ row }) => (
                    <div className='flex items-center gap-2'>
                        <Typography color='text.primary'>
                            {row.original.uniqueId}
                        </Typography>
                    </div>
                )
            }),
            columnHelper.accessor('Ponds', {
                header: 'Ponds/OO',
                cell: ({ row }) => (
                    <div className='flex items-center gap-2'>
                        <Typography color='text.primary' >
                            {row.original.pond}
                        </Typography>
                    </div>
                )
            }),
            columnHelper.accessor('Latitude', {
                header: 'Latitude',
                cell: ({ row }) => (
                    <div className='flex items-center gap-2'>
                        <Typography color='text.primary' >
                            {row.original.latitude}
                        </Typography>
                    </div>
                )
            }),
            columnHelper.accessor('Longitude', {
                header: 'Longitude',
                cell: ({ row }) => (
                    <div className='flex items-center gap-2'>
                        <Typography color='text.primary' >
                            {row.original.longitude}
                        </Typography>
                    </div>
                )
            }),
            columnHelper.accessor('Taluk', {
                header: 'Taluk',
                cell: ({ row }) => (
                    <div className='flex items-center gap-2'>
                        <Typography color='text.primary' >
                            {row.original.taluk}
                        </Typography>
                    </div>
                )
            }),
            columnHelper.accessor('Village', {
                header: 'Village',
                cell: ({ row }) => (
                    <div className='flex items-center gap-2'>
                        <Typography color='text.primary' >
                            {row.original.village}
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
                            {canDelete && (
                                <IconButton onClick={() => handleDelete(row.original.id)}>
                                    <i className='bx-trash text-textSecondary text-[22px]' />
                                </IconButton>
                            )}
                            {canEdit && (
                                <OpenDialogOnElementClick
                                    element={Typography}
                                    elementProps={typographyProps}
                                    dialog={GWBDialog}
                                    dialogProps={{
                                        data: data.find(item => item.id === row.original.id),
                                        id: row.original.id,
                                        handleGWBUpdate
                                    }}
                                />
                            )}
                        </div>
                    ),
                    enableSorting: false
                })
            );
        }
        return baseColumns;
    }, [data, filteredData, gwbPermission]);
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
        onGlobalFilterChange: setSearchFilter,
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFacetedRowModel: getFacetedRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
        getFacetedMinMaxValues: getFacetedMinMaxValues()
    })
    const handleSearchTextChange = (e) => {
        const { name, value } = e.target;
        setSearchFilter(prevFilters => ({
            ...prevFilters,
            [name]: value
        }));
    };

    const handleCountrySearch = () => {
        getGWBList(searchFilter);
    };

    return (
        <>
            <Card>
                <CardContent className='flex justify-between flex-wrap max-sm:flex-col sm:items-center gap-3'>
                    <div className='flex gap-4 flex-wrap max-sm:flex-col max-sm:is-full'>
                        <TextFieldStyled
                            name="taluk"
                            value={searchFilter?.taluk ?? ''}
                            onChange={handleSearchTextChange}
                            placeholder='Taluk'
                            className='max-sm:is-full w-[150px]'
                            InputLabelProps={{ shrink: true }}
                            variant='filled'
                        />
                        <TextFieldStyled
                            name="village"
                            value={searchFilter?.village ?? ''}
                            onChange={handleSearchTextChange}
                            placeholder='Village'
                            className='max-sm:is-full w-[150px]'
                            InputLabelProps={{ shrink: true }}
                            variant='filled'
                        />
                        <TextFieldStyled
                            name="pond"
                            value={searchFilter?.pond ?? ''}
                            onChange={handleSearchTextChange}
                            placeholder='Ponds'
                            className='max-sm:is-full w-[150px]'
                            InputLabelProps={{ shrink: true }}
                            variant='filled'
                        />
                        <TextFieldStyled
                            name="uniqueId"
                            value={searchFilter?.uniqueId ?? ''}
                            onChange={handleSearchTextChange}
                            placeholder='Unique Id'
                            className='max-sm:is-full w-[150px]'
                            InputLabelProps={{ shrink: true }}
                            variant='filled'
                        />
                        <Button variant='tonal' color='primary' onClick={handleCountrySearch}>
                            {isLoading ? <Loader type="btnLoader" /> : 'Search'}
                        </Button>
                    </div>
                    <div className='flex gap-4 max-sm:flex-col max-sm:is-full'>
                        {gwbPermission && gwbPermission?.writePermission === "Y" && (
                            <Button
                                variant='contained'
                                startIcon={<i className='bx-plus' />}
                                onClick={() => setAddGWBOpen(!addGWBOpen)}
                                className='max-sm:is-full'
                            >
                                Add GWB
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
                                {table.getRowModel()
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
                <ConfirmationDialog open={open} setOpen={setOpen} type='delete-gwb' onConfirm={handleConfirmation} />
            </Card>
            <AddGWB
                open={addGWBOpen}
                handleClose={() => setAddGWBOpen(!addGWBOpen)}
                handleGWBAdded={handleGWBAdded}
            />
        </>
    )
}
GWBTable.propTypes = {
    gwbPermission: PropTypes.any,
}
export default GWBTable
