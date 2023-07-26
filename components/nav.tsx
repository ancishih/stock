'use client'
import {Button} from './ui/button'
import Link from 'next/link'
import {usePathname} from 'next/navigation'
import {cn} from '../lib/utils'
import {Separator} from '@/components/ui/separator'
interface NaviProps extends React.HTMLAttributes<HTMLElement> {}
export default function Nav({className, ...props}: NaviProps) {
  const curPath = usePathname()

  return (
    <nav
      className={cn('flex flex-row gap-2 items-center', className)}
      {...props}
    >
      <Button asChild className='bg-transparent rounded-none'>
        <Link
          href='/'
          className={`
        text-timberwolf 
        ${curPath === '/' ? '' : 'text-onyx'}`}
        >
          Price
        </Link>
      </Button>
      <Separator orientation='vertical' className='h-6' />
      <Button className='bg-transparent rounded-none' asChild>
        <Link
          href='/profile'
          className={`
          ${curPath === '/profile' ? 'text-timberwolf' : 'text-onyx'}
          `}
        >
          Company Profile
        </Link>
      </Button>
      {/* <Separator orientation='vertical' className='h-6' />
      <Button asChild className='bg-transparent rounded-none'>
        <Link
          href='/calendar'
          className={`
          ${curPath === '/calendar' ? 'text-timberwolf' : 'text-onyx'}
          `}
        >
          Earning Calendar
        </Link>
      </Button> */}
    </nav>
  )
}
