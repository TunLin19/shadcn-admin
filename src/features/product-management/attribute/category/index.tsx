import React from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { TasksDialogs } from './components/category-dialogs'
import { TasksPrimaryButtons } from './components/category-primary-buttons'
import { DataTable } from './components/data-table'
import { StatusSwitch } from './components/status-switch'
import TasksProvider from './context/categories-context'
import type { Category } from './data/schema'

const columns: ColumnDef<Category>[] = [
  {
    accessorKey: 'id',
    header: 'STT',
    cell: ({ row }) => {
      // Lấy index của row và cộng thêm 1 vì index bắt đầu từ 0
      return <div>{row.index + 1}</div>
    },
  },
  {
    accessorKey: 'name',
    header: 'Tên danh mục', // Chuyển sang tiếng Việt
  },
  {
    accessorKey: 'status',
    header: 'Trạng thái', // Chuyển sang tiếng Việt
    cell: ({ row }) => {
      const category = row.original as Category
      return <StatusSwitch category={category} />
    },
  },
]

export default function Category() {
  return (
    <TasksProvider>
      <Header fixed>
        <Search />
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>

      <Main>
        <div className='mb-2 flex flex-wrap items-center justify-between gap-x-4 space-y-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>
              Quản lý danh mục
            </h2>{' '}
            {/* Chuyển sang tiếng Việt */}
            <p className='text-muted-foreground'>
              Danh sách các danh mục của bạn! {/* Chuyển sang tiếng Việt */}
            </p>
          </div>
          <TasksPrimaryButtons />
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
          <DataTable columns={columns} />
        </div>
      </Main>

      <TasksDialogs />
    </TasksProvider>
  )
}
