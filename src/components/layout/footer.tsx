'use client'

import { Link } from '@tanstack/react-router'
import { Facebook, Mail, MapPin, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function Footer() {
  // Custom Zalo icon
  const ZaloIcon = () => (
    <svg
      viewBox='0 0 24 24'
      className='h-6 w-6 fill-current'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M12.492 21.5h-1.459a.476.476 0 0 1-.32-.12.465.465 0 0 1-.16-.31c-.04-.82-.32-2.01-.56-2.68-2.05-.74-3.95-2.6-4.4-4.75-.51-2.46.35-4.8 2.42-6.37 2.06-1.57 4.85-2.11 7.28-1.4 2.43.71 4.3 2.54 5 4.89.74 2.47.2 5.15-1.44 7.08-1.63 1.93-4.1 2.87-6.77 2.45h-.59zm.82-1.24h.43c2.24.34 4.42-.46 5.9-2.07 1.47-1.6 1.95-3.83 1.33-5.92-.58-1.93-2.12-3.5-4.15-4.12-2.04-.62-4.42-.14-6.13 1.26-1.71 1.4-2.44 3.5-2.03 5.65.34 1.72 1.88 3.26 3.6 3.86.18.06.3.22.3.41v.73c.04.46.12 1.2.18 1.56.04.18.18.3.35.3h.39z' />
      <path d='M14.492 16.94c-.34 0-.66-.14-.88-.4a1.3 1.3 0 0 1-.25-1.01l.28-2.14-1.85-1.22a.755.755 0 0 1-.2-.98c.16-.26.48-.38.77-.3l2.49.66 1.29-2.07c.14-.22.39-.34.65-.34h.04c.24 0 .47.12.61.32l1.43 2.15a.75.75 0 0 1-.12.95l-2.13 1.93.34 2.31c.04.26-.05.52-.24.7-.19.18-.45.27-.71.24l-2.31-.34a.97.97 0 0 1-.58-.3z' />
    </svg>
  )

  return (
    <footer className='relative overflow-hidden border-t bg-gradient-to-b from-background via-muted/5 to-muted/10 shadow-md'>
      {/* Decorative elements */}
      {/* <div className='absolute inset-0 opacity-5 [mask-image:linear-gradient(to_bottom,transparent,white)]'>
        <div className='absolute inset-0 bg-[url(/grid.svg)] bg-center [mask-image:linear-gradient(to_bottom,transparent,white)]' />
      </div> */}

      {/* Main Content */}
      <div className='container relative mx-auto px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16'>
        <div className='grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-12 lg:grid-cols-3'>
          {/* Brand Section */}
          <div className='space-y-4 sm:space-y-6'>
            <Link href='/' className='inline-block'>
              <h2 className='bg-gradient-to-r from-primary via-blue-600 to-purple-600 bg-clip-text text-2xl font-bold text-transparent sm:text-3xl'>
                HopeStar
              </h2>
            </Link>
            <p className='max-w-[300px] text-sm font-medium leading-relaxed text-muted-foreground/90'>
              Chào mừng quý khách đến với Hopestar điểm đến lý tưởng cho những
              ai đam mê công nghệ và đang tìm kiếm những chiếc điện thoại chất
              lượng với mức giá hợp lý
            </p>
            <div className='flex space-x-3'>
              {[
                {
                  icon: Facebook,
                  href: '#',
                  label: 'Facebook',
                  className: 'hover:bg-blue-600/10 hover:text-blue-600',
                },
                {
                  icon: ZaloIcon,
                  href: "#",
                  label: "Zalo",
                  className: "hover:bg-blue-400/10 hover:text-[#0068ff]"
                },
              ].map(({ icon: Icon, href, label, className }) => (
                <Link
                  key={label}
                  href={href}
                  className={`group relative rounded-xl bg-muted/50 p-2.5 transition-all duration-300 ${className}`}
                  aria-label={label}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <Icon className='h-6 w-6' />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className='space-y-4 sm:space-y-6'>
            <h3 className='text-lg font-semibold text-foreground/90 sm:text-xl'>
              Khám phá
            </h3>
            <ul className='space-y-2.5 sm:space-y-3'>
              {[
                { label: 'Trang chủ', href: '/' },
                {
                  label: 'Chính sách của cửa hàng',
                  href: '/chinh-sach-cua-cua-hang',
                },
                {
                  label: 'Giới thiệu về cửa hàng',
                  href: '/gioi-thieu-cua-hang',
                },
                { label: 'Điện thoại', href: '/dienthoai' },
                { label: 'Liên hệ', href: '/lien-he' },
              ].map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className='flex items-center font-medium text-muted-foreground/90 transition-colors hover:text-primary'
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Section */}
          <div className='space-y-4 sm:space-y-6'>
            <h3 className='text-lg font-semibold text-foreground/90 sm:text-xl'>
              Thông tin liên hệ
            </h3>
            <ul className='space-y-3 sm:space-y-4'>
              <li className='flex items-start space-x-3'>
                <MapPin className='mt-0.5 h-5 w-5 flex-shrink-0 text-primary' />
                <span className='line-clamp-2 text-sm font-medium text-muted-foreground/90 transition-colors hover:text-primary'>
                  Ng. 124 Phố Hoè Thị, Hòe Thị, Phương Canh, Nam Từ Liêm, Hà Nội
                </span>
              </li>
              <li className='flex items-center space-x-3'>
                <Phone className='h-5 w-5 flex-shrink-0 text-primary' />
                <Link
                  href='tel:+84-358-168-699'
                  className='text-sm font-medium text-muted-foreground/90 transition-colors hover:text-primary'
                >
                  +84 358 168 699
                </Link>
              </li>
              <li className='flex items-center space-x-3'>
                <Mail className='h-5 w-5 flex-shrink-0 text-primary' />
                <Link
                  href='mailto:info@hopestar.com'
                  className='text-sm font-medium text-muted-foreground/90 transition-colors hover:text-primary'
                >
                  contact@hopestar.com
                </Link>
              </li>
            </ul>

            <Button
              asChild
              className='mt-4 w-full bg-primary/90 px-4 py-2 text-sm font-semibold text-white shadow-md hover:bg-primary sm:mt-6 sm:text-base'
            >
              <Link href='/lien-he'>
                <span className='mr-2'>✉️</span>
                Liên hệ ngay
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className='border-t border-muted/20 bg-muted/5'>
        <div className='container mx-auto px-4 py-4 sm:px-6 sm:py-6 lg:px-8'>
          <div className='flex flex-col items-center justify-between gap-2 text-xs sm:flex-row sm:gap-3 sm:text-sm'>
            <p className='text-center font-medium text-muted-foreground/70'>
              © {new Date().getFullYear()} Cửa hàng bán điện thoại HopeStar.
            </p>
            <div className='flex items-center space-x-4'>
              <Link
                href='/privacy'
                className='font-medium text-muted-foreground/70 transition-colors hover:text-primary'
              >
                Chính sách của chúng tôi
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
