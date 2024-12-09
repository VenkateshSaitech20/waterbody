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
import AddWBsTank from './AddWBsTank';
import TankWB from '@/components/dialogs/edit-tank-wb';

const Icon = styled('i')({})
const fuzzyFilter = (row, columnId, value, addMeta) => {
    const itemRank = rankItem(row.getValue(columnId), value)
    addMeta({
        itemRank
    })
    return itemRank.passed
};
const columnHelper = createColumnHelper();

const WBsTankTable = ({ tankWBDPermission }) => {
    const [addGWBOpen, setAddGWBOpen] = useState(false)
    const [rowSelection, setRowSelection] = useState({})
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [idToDelete, setIdToDelete] = useState('');
    const [searchFilter, setSearchFilter] = useState({
        village: '',
        block: '',
        panchayat: ''
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
    const getTankWBList = useCallback(async (searchFilter) => {
        setIsLoading(true);
        const response = await apiWBDClient.post("/tank-water-bodies/get", {
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
    // const handleTankWBAdded = () => {
    //     getTankWBList(searchFilter);
    // };
    useEffect(() => {
        getTankWBList(searchFilter);
    }, [getTankWBList]);
    const handleConfirmation = async (confirmed) => {
        setIsLoading(true);
        if (confirmed) {
            const response = await apiWBDClient.put(`/tank-water-bodies/${idToDelete}`);
            if (response.data.result === true) {
                await getTankWBList(searchFilter);
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
        getTankWBList(searchFilter);
    };
    const columns = useMemo(() => {
        const canDelete = tankWBDPermission?.deletePermission === 'Y';
        const canEdit = tankWBDPermission?.editPermission === 'Y';
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
            columnHelper.accessor('tankName', {
                header: 'tank Name',
                cell: ({ row }) => (
                    <div className='flex items-center gap-2'>
                        <Typography color='text.primary' >
                            {row.original.tankName}
                        </Typography>
                    </div>
                )
            }),
            columnHelper.accessor('district', {
                header: 'district',
                cell: ({ row }) => (
                    <div className='flex items-center gap-2'>
                        <Typography color='text.primary' >
                            {row.original.district}
                        </Typography>
                    </div>
                )
            }),
            columnHelper.accessor('block', {
                header: 'block',
                cell: ({ row }) => (
                    <div className='flex items-center gap-2'>
                        <Typography color='text.primary' >
                            {row.original.block}
                        </Typography>
                    </div>
                )
            }),
            columnHelper.accessor('panchayat', {
                header: 'panchayat',
                cell: ({ row }) => (
                    <div className='flex items-center gap-2'>
                        <Typography color='text.primary' >
                            {row.original.panchayat}
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
            columnHelper.accessor('tankType', {
                header: 'tank Type',
                cell: ({ row }) => (
                    <div className='flex items-center gap-2'>
                        <Typography color='text.primary' >
                            {row.original.tankType}
                        </Typography>
                    </div>
                )
            }),
            columnHelper.accessor('ayacut', {
                header: 'ayacut (ha)',
                cell: ({ row }) => (
                    <div className='flex items-center gap-2'>
                        <Typography color='text.primary' >
                            {row.original.ayacut}
                        </Typography>
                    </div>
                )
            }),
            columnHelper.accessor('watSprAr', {
                header: 'Wat Spr Ar',
                cell: ({ row }) => (
                    <div className='flex items-center gap-2'>
                        <Typography color='text.primary' >
                            {row.original.watSprAr || "None"}
                        </Typography>
                    </div>
                )
            }),
            columnHelper.accessor('capMcm', {
                header: 'Cap MCM',
                cell: ({ row }) => (
                    <div className='flex items-center gap-2'>
                        <Typography color='text.primary' >
                            {row.original.capMcm}
                        </Typography>
                    </div>
                )
            }),
            columnHelper.accessor('noOfSluices', {
                header: 'No of Sluices',
                cell: ({ row }) => (
                    <div className='flex items-center gap-2'>
                        <Typography color='text.primary' >
                            {row.original.noOfSluices || "None"}
                        </Typography>
                    </div>
                )
            }),
            columnHelper.accessor('sluicesType', {
                header: 'Sluices Type',
                cell: ({ row }) => (
                    <div className='flex items-center gap-2'>
                        <Typography color='text.primary' >
                            {row.original.sluicesType}
                        </Typography>
                    </div>
                )
            }),
            columnHelper.accessor('bundLength', {
                header: 'Bund Length (m)',
                cell: ({ row }) => (
                    <div className='flex items-center gap-2'>
                        <Typography color='text.primary' >
                            {row.original.bundLength}
                        </Typography>
                    </div>
                )
            }),
            columnHelper.accessor('tbl', {
                header: 'TBL (m)',
                cell: ({ row }) => (
                    <div className='flex items-center gap-2'>
                        <Typography color='text.primary' >
                            {row.original.tbl || "None"}
                        </Typography>
                    </div>
                )
            }),
            columnHelper.accessor('mwl', {
                header: 'MWL (m)',
                cell: ({ row }) => (
                    <div className='flex items-center gap-2'>
                        <Typography color='text.primary' >
                            {row.original.mwl || "None"}
                        </Typography>
                    </div>
                )
            }),
            columnHelper.accessor('ftl', {
                header: 'FTL (m)',
                cell: ({ row }) => (
                    <div className='flex items-center gap-2'>
                        <Typography color='text.primary' >
                            {row.original.ftl || "None"}
                        </Typography>
                    </div>
                )
            }),
            columnHelper.accessor('stoDepth', {
                header: 'Sto Depth (m)',
                cell: ({ row }) => (
                    <div className='flex items-center gap-2'>
                        <Typography color='text.primary' >
                            {row.original.stoDepth || "None"}
                        </Typography>
                    </div>
                )
            }),
            columnHelper.accessor('catchment', {
                header: 'catchment',
                cell: ({ row }) => (
                    <div className='flex items-center gap-2'>
                        <Typography color='text.primary' >
                            {row.original.catchment || "None"}
                        </Typography>
                    </div>
                )
            }),
            columnHelper.accessor('noOFWeirs', {
                header: 'No of Weirs',
                cell: ({ row }) => (
                    <div className='flex items-center gap-2'>
                        <Typography color='text.primary' >
                            {row.original.noOFWeirs || "None"}
                        </Typography>
                    </div>
                )
            }),
            columnHelper.accessor('weirLength', {
                header: 'Weir Length (m)',
                cell: ({ row }) => (
                    <div className='flex items-center gap-2'>
                        <Typography color='text.primary' >
                            {row.original.weirLength || "None"}
                        </Typography>
                    </div>
                )
            }),
            columnHelper.accessor('lowSill', {
                header: 'Low Sill (m)',
                cell: ({ row }) => (
                    <div className='flex items-center gap-2'>
                        <Typography color='text.primary' >
                            {row.original.lowSill || "None"}
                        </Typography>
                    </div>
                )
            }),
            columnHelper.accessor('disCusecs', {
                header: 'Dis Cusecs',
                cell: ({ row }) => (
                    <div className='flex items-center gap-2'>
                        <Typography color='text.primary' >
                            {row.original.disCusecs || "None"}
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
                                    dialog={TankWB}
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
    }, [data, filteredData, tankWBDPermission]);
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
    const handleTankWBSearch = () => {
        getTankWBList(searchFilter);
    };

    return (
        <>
            <Card>
                <CardContent className='flex justify-between flex-wrap max-sm:flex-col sm:items-center gap-3'>
                    <div className='flex gap-4 flex-wrap max-sm:flex-col max-sm:is-full'>
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
                            name="block"
                            value={searchFilter?.block ?? ''}
                            onChange={handleSearchTextChange}
                            placeholder='Block'
                            className='max-sm:is-full w-[150px]'
                            InputLabelProps={{ shrink: true }}
                            variant='filled'
                        />
                        <TextFieldStyled
                            name="panchayat"
                            value={searchFilter?.panchayat ?? ''}
                            onChange={handleSearchTextChange}
                            placeholder='Panchayat'
                            className='max-sm:is-full w-[150px]'
                            InputLabelProps={{ shrink: true }}
                            variant='filled'
                        />
                        <Button variant='tonal' color='primary' onClick={handleTankWBSearch}>
                            {isLoading ? <Loader type="btnLoader" /> : 'Search'}
                        </Button>
                    </div>
                    <div className='flex gap-4 max-sm:flex-col max-sm:is-full'>
                        {/* {tankWBDPermission && tankWBDPermission?.writePermission === "Y" && (
                            <Button
                                variant='contained'
                                startIcon={<i className='bx-plus' />}
                                onClick={() => setAddGWBOpen(!addGWBOpen)}
                                className='max-sm:is-full'
                            >
                                Add GWB
                            </Button>
                        )} */}
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
                <ConfirmationDialog open={open} setOpen={setOpen} type='delete-data' onConfirm={handleConfirmation} name={'Tank WB'} />
            </Card>
            {/* <AddWBsTank
                open={addGWBOpen}
                handleClose={() => setAddGWBOpen(!addGWBOpen)}
                handleTankWBAdded={handleTankWBAdded}
            /> */}
        </>
    )
}
WBsTankTable.propTypes = {
    tankWBDPermission: PropTypes.any,
}
export default WBsTankTable
