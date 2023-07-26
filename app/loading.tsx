import {Skeleton} from '@/components/ui/skeleton'

export default function RootLoading() {
  return (
    <div className='flex flex-col gap-2'>
      <Skeleton className='h-10 w-28' />
      <Skeleton className='w-full h-14' />
      <Skeleton className='w-full h-14' />
      <Skeleton className='w-full h-14' />
    </div>
  )
}
