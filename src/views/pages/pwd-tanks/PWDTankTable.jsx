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
import PWDTank from '@/components/dialogs/edit-pwd-tanks';

const Icon = styled('i')({})
const fuzzyFilter = (row, columnId, value, addMeta) => {
    const itemRank = rankItem(row.getValue(columnId), value)
    addMeta({
        itemRank
    })
    return itemRank.passed
};
const columnHelper = createColumnHelper();

const PWDTankTable = ({ pwdTankPermission }) => {
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
        tankName: ''
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
    const getPWDTankList = useCallback(async (searchFilter) => {
        setIsLoading(true);
        const response = await apiWBDClient.post("/pwd-tanks/get", {
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
    // const handlePWDTankAdded = () => {
    //     getPWDTankList(searchFilter);
    // };
    useEffect(() => {
        getPWDTankList(searchFilter);
    }, [getPWDTankList]);
    const handleConfirmation = async (confirmed) => {
        setIsLoading(true);
        if (confirmed) {
            const response = await apiWBDClient.put(`/pwd-tanks/${idToDelete}`);
            if (response.data.result === true) {
                await getPWDTankList(searchFilter);
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
    const handlePWDTankUpdate = () => {
        getPWDTankList(searchFilter);
    };
    const columns = useMemo(() => {
        const canDelete = pwdTankPermission?.deletePermission === 'Y';
        const canEdit = pwdTankPermission?.editPermission === 'Y';
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
            columnHelper.accessor('tank Name', {
                header: 'tank Name',
                cell: ({ row }) => (
                    <div className='flex items-center gap-2'>
                        <Typography color='text.primary' >
                            {row.original.tankName}
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
            columnHelper.accessor('taluk', {
                header: 'taluk',
                cell: ({ row }) => (
                    <div className='flex items-center gap-2'>
                        <Typography color='text.primary' >
                            {row.original.taluk}
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
            columnHelper.accessor('subBasin', {
                header: 'sub Basin',
                cell: ({ row }) => (
                    <div className='flex items-center gap-2'>
                        <Typography color='text.primary' >
                            {row.original.subBasin}
                        </Typography>
                    </div>
                )
            }),
            columnHelper.accessor('basin', {
                header: 'basin',
                cell: ({ row }) => (
                    <div className='flex items-center gap-2'>
                        <Typography color='text.primary' >
                            {row.original.basin}
                        </Typography>
                    </div>
                )
            }),
            columnHelper.accessor('section', {
                header: 'section',
                cell: ({ row }) => (
                    <div className='flex items-center gap-2'>
                        <Typography color='text.primary' >
                            {row.original.section}
                        </Typography>
                    </div>
                )
            }),
            columnHelper.accessor('subDn', {
                header: 'sub Dn',
                cell: ({ row }) => (
                    <div className='flex items-center gap-2'>
                        <Typography color='text.primary' >
                            {row.original.subDn}
                        </Typography>
                    </div>
                )
            }),
            columnHelper.accessor('division', {
                header: 'division',
                cell: ({ row }) => (
                    <div className='flex items-center gap-2'>
                        <Typography color='text.primary' >
                            {row.original.division}
                        </Typography>
                    </div>
                )
            }),
            columnHelper.accessor('circle', {
                header: 'circle',
                cell: ({ row }) => (
                    <div className='flex items-center gap-2'>
                        <Typography color='text.primary' >
                            {row.original.circle}
                        </Typography>
                    </div>
                )
            }),
            columnHelper.accessor('region', {
                header: 'region',
                cell: ({ row }) => (
                    <div className='flex items-center gap-2'>
                        <Typography color='text.primary' >
                            {row.original.region}
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
            columnHelper.accessor('capacity', {
                header: 'capacity (MCM)',
                cell: ({ row }) => (
                    <div className='flex items-center gap-2'>
                        <Typography color='text.primary' >
                            {row.original.capacity}
                        </Typography>
                    </div>
                )
            }),
            columnHelper.accessor('ftl', {
                header: 'ftl (m)',
                cell: ({ row }) => (
                    <div className='flex items-center gap-2'>
                        <Typography color='text.primary' >
                            {row.original.ftl}
                        </Typography>
                    </div>
                )
            }),
            columnHelper.accessor('mwl', {
                header: 'mwl (m)',
                cell: ({ row }) => (
                    <div className='flex items-center gap-2'>
                        <Typography color='text.primary' >
                            {row.original.mwl}
                        </Typography>
                    </div>
                )
            }),
            columnHelper.accessor('tbl', {
                header: 'tbl (m)',
                cell: ({ row }) => (
                    <div className='flex items-center gap-2'>
                        <Typography color='text.primary' >
                            {row.original.tbl}
                        </Typography>
                    </div>
                )
            }),
            columnHelper.accessor('storageDepth', {
                header: 'storage Depth (m)',
                cell: ({ row }) => (
                    <div className='flex items-center gap-2'>
                        <Typography color='text.primary' >
                            {row.original.storageDepth}
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
            columnHelper.accessor('catchment Area', {
                header: 'catchment Area (sqkm)',
                cell: ({ row }) => (
                    <div className='flex items-center gap-2'>
                        <Typography color='text.primary' >
                            {row.original.catchmentArea}
                        </Typography>
                    </div>
                )
            }),
            columnHelper.accessor('watSpread', {
                header: 'watSpread (ha)',
                cell: ({ row }) => (
                    <div className='flex items-center gap-2'>
                        <Typography color='text.primary' >
                            {row.original.watSpread}
                        </Typography>
                    </div>
                )
            }),
            columnHelper.accessor('noOFWeirs', {
                header: 'no OF Weirs (m)',
                cell: ({ row }) => (
                    <div className='flex items-center gap-2'>
                        <Typography color='text.primary' >
                            {row.original.noOFWeirs}
                        </Typography>
                    </div>
                )
            }),
            columnHelper.accessor('weirLength', {
                header: 'weir Length (m)',
                cell: ({ row }) => (
                    <div className='flex items-center gap-2'>
                        <Typography color='text.primary' >
                            {row.original.weirLength}
                        </Typography>
                    </div>
                )
            }),
            columnHelper.accessor('noOfSluices', {
                header: 'no Of Sluices',
                cell: ({ row }) => (
                    <div className='flex items-center gap-2'>
                        <Typography color='text.primary' >
                            {row.original.noOfSluices}
                        </Typography>
                    </div>
                )
            }),
            columnHelper.accessor('lowSill', {
                header: 'lowSill (m)',
                cell: ({ row }) => (
                    <div className='flex items-center gap-2'>
                        <Typography color='text.primary' >
                            {row.original.lowSill}
                        </Typography>
                    </div>
                )
            }),
            columnHelper.accessor('bund Length', {
                header: 'bund Length (m)',
                cell: ({ row }) => (
                    <div className='flex items-center gap-2'>
                        <Typography color='text.primary' >
                            {row.original.bundLength}
                        </Typography>
                    </div>
                )
            }),
            columnHelper.accessor('disCusecs', {
                header: 'disCusecs (cusec)',
                cell: ({ row }) => (
                    <div className='flex items-center gap-2'>
                        <Typography color='text.primary' >
                            {row.original.disCusecs}
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
                                    dialog={PWDTank}
                                    dialogProps={{
                                        data: data.find(item => item.id === row.original.id),
                                        id: row.original.id,
                                        handlePWDTankUpdate
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
    }, [data, filteredData, pwdTankPermission]);
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
    const handlePWDTankSearch = () => {
        getPWDTankList(searchFilter);
    };

    return (
        <>
            <Card>
                <CardContent className='flex justify-between flex-wrap max-sm:flex-col sm:items-center gap-3'>
                    <div className='flex gap-4 flex-wrap max-sm:flex-col max-sm:is-full'>
                        <TextFieldStyled
                            name="tankName"
                            value={searchFilter?.tankName ?? ''}
                            onChange={handleSearchTextChange}
                            placeholder='Tank Name'
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
                            name="block"
                            value={searchFilter?.block ?? ''}
                            onChange={handleSearchTextChange}
                            placeholder='Block'
                            className='max-sm:is-full w-[150px]'
                            InputLabelProps={{ shrink: true }}
                            variant='filled'
                        />
                        <Button variant='tonal' color='primary' onClick={handlePWDTankSearch}>
                            {isLoading ? <Loader type="btnLoader" /> : 'Search'}
                        </Button>
                    </div>
                    <div className='flex gap-4 max-sm:flex-col max-sm:is-full'>
                        {/* {pwdTankPermission && pwdTankPermission?.writePermission === "Y" && (
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
                <ConfirmationDialog open={open} setOpen={setOpen} type='delete-data' onConfirm={handleConfirmation} name={'PWD Tank'} />
            </Card>
            {/* <AddWBsTank
                open={addGWBOpen}
                handleClose={() => setAddGWBOpen(!addGWBOpen)}
                handlePWDTankAdded={handlePWDTankAdded}
            /> */}
        </>
    )
}
PWDTankTable.propTypes = {
    pwdTankPermission: PropTypes.any,
}
export default PWDTankTable
