'use client'
import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Checkbox from '@mui/material/Checkbox'
import MenuItem from '@mui/material/MenuItem'
import TablePagination from '@mui/material/TablePagination'
import classnames from 'classnames'
import { rankItem } from '@tanstack/match-sorter-utils'
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
} from '@tanstack/react-table'
import AddCustomerDrawer from './AddCustomerDrawer'
import CustomAvatar from '@core/components/mui/Avatar'
import CustomTextField from '@core/components/mui/TextField'
import TablePaginationComponent from '@components/TablePaginationComponent'
import { getInitials } from '@/utils/getInitials'
import { getLocalizedUrl } from '@/utils/i18n'
import tableStyles from '@core/styles/table.module.css'

export const paymentStatus = {
    1: { text: 'Paid', color: 'success' },
    2: { text: 'Pending', color: 'warning' },
    3: { text: 'Cancelled', color: 'secondary' },
    4: { text: 'Failed', color: 'error' }
}
export const statusChipColor = {
    Delivered: { color: 'success' },
    'Out for Delivery': { color: 'primary' },
    'Ready to Pickup': { color: 'info' },
    Dispatched: { color: 'warning' }
}

const fuzzyFilter = (row, columnId, value, addMeta) => {
    // Rank the item
    const itemRank = rankItem(row.getValue(columnId), value)

    // Store the itemRank info
    addMeta({
        itemRank
    })

    // Return if the item should be filtered in/out
    return itemRank.passed
}

const DebouncedInput = ({ value: initialValue, onChange, debounce = 500, ...props }) => {
    // States
    const [value, setValue] = useState(initialValue)

    useEffect(() => {
        setValue(initialValue)
    }, [initialValue])
    useEffect(() => {
        const timeout = setTimeout(() => {
            onChange(value)
        }, debounce)

        return () => clearTimeout(timeout)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value])

    return <CustomTextField {...props} value={value} onChange={e => setValue(e.target.value)} />
}

// Column Definitions
const columnHelper = createColumnHelper()

const CustomerListTable = ({ customerData }) => {
    // States
    const [customerUserOpen, setCustomerUserOpen] = useState(false)
    const [rowSelection, setRowSelection] = useState({})
    const [data, setData] = useState(...[customerData])
    const [globalFilter, setGlobalFilter] = useState('')

    // Hooks
    const { lang: locale } = useParams()

    const columns = useMemo(
        () => [
            {
                id: 'select',
                header: ({ table }) => (
                    <Checkbox
                        {...{
                            checked: table.getIsAllRowsSelected(),
                            indeterminate: table.getIsSomeRowsSelected(),
                            onChange: table.getToggleAllRowsSelectedHandler()
                        }}
                    />
                ),
                cell: ({ row }) => (
                    <Checkbox
                        {...{
                            checked: row.getIsSelected(),
                            disabled: !row.getCanSelect(),
                            indeterminate: row.getIsSomeSelected(),
                            onChange: row.getToggleSelectedHandler()
                        }}
                    />
                )
            },
            columnHelper.accessor('customer', {
                header: 'Customers',
                cell: ({ row }) => (
                    <div className='flex items-center gap-3'>
                        {getAvatar({ avatar: row.original.avatar, customer: row.original.customer })}
                        <div className='flex flex-col items-start'>
                            <Typography
                                variant='h6'
                                component={Link}
                                href={getLocalizedUrl(`/apps/ecommerce/customers/details/${row.original.customerId}`, locale)}
                                className='hover:text-primary'
                            >
                                {row.original.customer}
                            </Typography>
                            <Typography variant='body2'>{row.original.email}</Typography>
                        </div>
                    </div>
                )
            }),
            columnHelper.accessor('customerId', {
                header: 'Customer Id',
                cell: ({ row }) => <Typography color='text.primary'>#{row.original.customerId}</Typography>
            }),
            columnHelper.accessor('country', {
                header: 'Country',
                cell: ({ row }) => (
                    <div className='flex items-center gap-2'>
                        <img src={row.original.countryFlag} height={22} />
                        <Typography>{row.original.country}</Typography>
                    </div>
                )
            }),
            columnHelper.accessor('order', {
                header: 'Orders',
                cell: ({ row }) => <Typography>{row.original.order}</Typography>
            }),
            columnHelper.accessor('totalSpent', {
                header: 'Total Spent',
                cell: ({ row }) => <Typography variant='h6'>${row.original.totalSpent.toLocaleString()}</Typography>
            })
        ],
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []
    )

    const table = useReactTable({
        data: data,
        columns,
        filterFns: {
            fuzzy: fuzzyFilter
        },
        state: {
            rowSelection,
            globalFilter
        },
        initialState: {
            pagination: {
                pageSize: 10
            }
        },
        enableRowSelection: true, //enable row selection for all rows
        // enableRowSelection: row => row.original.age > 18, // or enable row selection conditionally per row
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

    const getAvatar = params => {
        const { avatar, customer } = params

        if (avatar) {
            return <CustomAvatar src={avatar} skin='light' size={34} />
        } else {
            return (
                <CustomAvatar skin='light' size={34}>
                    {getInitials(customer)}
                </CustomAvatar>
            )
        }
    }

    return (
        <>
            <Card>
                <CardContent className='flex justify-between flex-wrap max-sm:flex-col sm:items-center gap-4'>
                    <DebouncedInput
                        value={globalFilter ?? ''}
                        onChange={value => setGlobalFilter(String(value))}
                        placeholder='Search'
                        className='max-sm:is-full'
                    />
                    <div className='flex gap-4 max-sm:flex-col max-sm:is-full'>
                        <CustomTextField
                            select
                            value={table.getState().pagination.pageSize}
                            onChange={e => table.setPageSize(Number(e.target.value))}
                            className='max-sm:is-full sm:is-[80px]'
                        >
                            <MenuItem value='10'>10</MenuItem>
                            <MenuItem value='25'>25</MenuItem>
                            <MenuItem value='50'>50</MenuItem>
                            <MenuItem value='100'>100</MenuItem>
                        </CustomTextField>
                        <Button variant='tonal' color='secondary' startIcon={<i className='bx-export' />}>
                            Export
                        </Button>
                        <Button
                            variant='contained'
                            color='primary'
                            className='max-sm:is-full'
                            startIcon={<i className='bx-plus' />}
                            onClick={() => setCustomerUserOpen(!customerUserOpen)}
                        >
                            Add Customer
                        </Button>
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
                                                <>
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
                                                </>
                                            )}
                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </thead>
                        {table.getFilteredRowModel().rows.length === 0 ? (
                            <tbody>
                                <tr>
                                    <td colSpan={table.getVisibleFlatColumns().length} className='text-center'>
                                        No data available
                                    </td>
                                </tr>
                            </tbody>
                        ) : (
                            <tbody>
                                {table
                                    .getRowModel()
                                    .rows.slice(0, table.getState().pagination.pageSize)
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
                <TablePagination
                    component={() => <TablePaginationComponent table={table} />}
                    count={table.getFilteredRowModel().rows.length}
                    rowsPerPage={table.getState().pagination.pageSize}
                    page={table.getState().pagination.pageIndex}
                    onPageChange={(_, page) => {
                        table.setPageIndex(page)
                    }}
                />
            </Card>
            <AddCustomerDrawer
                open={customerUserOpen}
                handleClose={() => setCustomerUserOpen(!customerUserOpen)}
                setData={setData}
                customerData={data}
            />
        </>
    )
}

export default CustomerListTable