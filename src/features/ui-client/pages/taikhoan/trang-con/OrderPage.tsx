import React, { useEffect, useState } from 'react'
import { Card, CardBody, Input, Link, Tab, Tabs } from '@heroui/react'
import { Icon } from '@iconify/react'
import { Button } from '@/features/ui-client/components/ui/button'
import '@/features/ui-client/styles/account.css'
import { getBillByAccount } from '../service/api-bill-client-service'
import { Bill } from '../service/schema'

const statusConfig = {
  CHO_XAC_NHAN: { color: '#f5a524', text: 'Chờ xác nhận' },
  DA_XAC_NHAN: { color: '#339999', text: 'Đã xác nhận' },
  DANG_CHUAN_BI_HANG: { color: '#FF0099', text: 'Đang chuẩn bị hàng' },
  DANG_GIAO_HANG: { color: '#007bff', text: 'Đang giao hàng' },
  HOAN_THANH: { color: '#17c964', text: 'Hoàn thành' },
  DA_HUY: { color: 'red', text: 'Đã hủy' },
}

export const OrdersPage = () => {
  const [selected, setSelected] = React.useState('all')
  const [bills, setBills] = useState<Bill[]>([])
  const [searchKeyword, setSearchKeyword] = useState('')
  const [displayLimit, setDisplayLimit] = useState(5) // Increased initial display
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBills = async () => {
      try {
        setLoading(true)
        const data = await getBillByAccount()
        setBills(data)
      } catch (error) {
        console.error('Lỗi lấy bill:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchBills()
  }, [])

  const filteredOrders = bills
    .filter((bill) => {
      if (selected !== 'all' && bill.status !== selected) {
        return false
      }

      if (searchKeyword.trim()) {
        const keyword = searchKeyword.toLowerCase().trim()
        return (
          bill?.maBill?.toLowerCase().includes(keyword) ||
          bill?.billDetailResponesList?.some((detail) =>
            detail.productDetail?.productName?.toLowerCase().includes(keyword)
          )
        )
      }

      return true
    })
    .filter((bill) => bill.billDetailResponesList?.length > 0)

  const renderOrderCard = (order: Bill) => {
    const firstProduct = order?.billDetailResponesList?.[0]
    if (!firstProduct) return null

    return (
      <Card key={order?.id} className='mt-6'>
        <CardBody className='space-y-4'>
          {/* Header */}
          <div className='flex items-start justify-between border-b border-default-100 pb-4'>
            <div className='space-y-2'>
              <div className='flex flex-wrap items-center gap-4 text-sm text-default-600'>
                <span>
                  {order?.paymentDate
                    ? new Date(order.paymentDate).toLocaleDateString('vi-VN', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: false,
                      })
                    : ''}
                </span>
                <span>Mã đơn hàng: {order?.maBill}</span>
                <span>{order?.detailCount ?? 0} sản phẩm</span>
              </div>
            </div>
            <div className='flex items-center gap-2 text-sm font-medium'>
              <span style={{ color: statusConfig[order?.status]?.color }}>
                •
              </span>
              <span style={{ color: statusConfig[order?.status]?.color }}>
                {statusConfig[order?.status]?.text}
              </span>
            </div>
          </div>

          {/* Product Details */}
          <div className='flex flex-col justify-between gap-4 md:flex-row md:items-center'>
            <div className='flex items-center gap-4'>
              <img
                src={firstProduct.productDetail?.image}
                alt={firstProduct.productDetail?.productName}
                className='h-20 w-20 rounded-lg object-cover'
              />
              <div className='flex-1 space-y-1'>
                <Link
                  href={`/taikhoan/don-hang-cua-toi/thong-tin?id=${order?.id}`}
                  className='line-clamp-2 text-sm font-medium hover:text-[#4c7eea]'
                >
                  {`${firstProduct.productDetail?.productName} ${firstProduct.productDetail?.ram}/${firstProduct.productDetail?.rom}${firstProduct.productDetail?.descriptionRom} - ${firstProduct.productDetail?.color}`}
                </Link>
                <p className='text-sm text-default-500'>
                  Số lượng: {firstProduct.quantity}
                </p>
                <p className='text-sm font-bold'>
                  {firstProduct.totalPrice?.toLocaleString('vi-VN')} đ
                </p>
              </div>
            </div>
            <div className='text-right'>
              <p className='text-lg font-bold text-red-500'>
                {(order?.totalDue ?? 0).toLocaleString('vi-VN')} đ
              </p>
            </div>
          </div>
        </CardBody>
      </Card>
    )
  }

  if (loading) {
    return (
      <div className='loading-spinner'>
        <div className='spinner' />
      </div>
    )
  }

  return (
    <div className='container py-6'>
      <section className='mx-auto max-w-5xl'>
        <header className='order-header'>
          <h1 className='order-title'>Đơn hàng của tôi</h1>
          <Input
            placeholder='Tìm theo mã đơn hoặc tên sản phẩm'
            startContent={
              <Icon icon='lucide:search' className='text-default-400' />
            }
            className='search-input'
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
          />
        </header>

        <div className='order-tabs'>
          <Tabs
            selectedKey={selected}
            onSelectionChange={(key) => setSelected(key as string)}
            color='primary'
            className='min-w-max'
          >
            <Tab key='all' title='Tất cả' />
            {Object.entries(statusConfig).map(([key, { text }]) => (
              <Tab key={key} title={text} />
            ))}
          </Tabs>
        </div>

        {filteredOrders.length === 0 ? (
          <div className='empty-state'>
            <p className='empty-text'>Chưa có đơn hàng nào</p>
          </div>
        ) : (
          <>
            {filteredOrders.slice(0, displayLimit).map(renderOrderCard)}
            {filteredOrders.length > displayLimit && (
              <div className='load-more'>
                <Button
                  variant='outline'
                  onClick={() => setDisplayLimit((prev) => prev + 5)}
                  className='load-more-button'
                >
                  Xem thêm
                </Button>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  )
}
