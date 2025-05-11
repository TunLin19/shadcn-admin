import React from 'react'
import Cookies from 'js-cookie'
import { Link, useRouter } from '@tanstack/react-router'
import { Card } from '@heroui/react'
import { Icon } from '@iconify/react'
import '@/features/ui-client/styles/account.css'

interface AccountLayoutProps {
  children: React.ReactNode
}

export const AccountLayout: React.FC<AccountLayoutProps> = ({ children }) => {
  const router = useRouter()

  const menuItems = [
    {
      icon: 'lucide:user',
      label: 'Thông tin tài khoản',
      path: '/taikhoan/thong-tin-ca-nhan',
    },
    {
      icon: 'lucide:shopping-bag',
      label: 'Đơn hàng của tôi',
      path: '/taikhoan/don-hang-cua-toi',
    },
    {
      icon: 'lucide:log-out',
      label: 'Đăng xuất',
      path: '/logout',
      action: () => {
        Cookies.remove('jwt')
        localStorage.removeItem('profile')
        window.location.href = '/'
      },
    },
  ]

  return (
    <div className='account-container'>
      <div className='account-wrapper'>
        <div className='account-layout'>
          {/* Sidebar */}
          <Card className='sidebar'>
            <div className='flex flex-col gap-1'>
              {menuItems.map((item) => {
                const isActive = router.state.location.pathname === item.path

                return item.action ? (
                  <button
                    key={item.path}
                    onClick={item.action}
                    className='menu-item menu-item-default'
                  >
                    <Icon icon={item.icon} className='menu-icon' />
                    <span className='menu-text'>{item.label}</span>
                  </button>
                ) : (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`menu-item ${isActive ? 'menu-item-active' : 'menu-item-default'}`}
                  >
                    <Icon icon={item.icon} className='menu-icon' />
                    <span className='menu-text'>{item.label}</span>
                  </Link>
                )
              })}
            </div>
          </Card>

          {/* Main Content */}
          <Card className='content-card'>{children}</Card>
        </div>
      </div>
    </div>
  )
}
