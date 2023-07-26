'use client'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card'
import {useRouter} from 'next/navigation'
import React from 'react'
export default function StockCard({
  record,
  symbol,
  company_name,
  change,
  price,
  ...props
}: {
  record: {close: number}[]
  symbol: string
  company_name: string
  change: number
  price: number
}) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null)

  const router = useRouter()

  React.useEffect(() => {
    if (record.length > 0 && canvasRef.current && canvasRef.current !== null) {
      let y_min = record[0].close
      let y_max = record[0].close
      let prev_price = price - change
      for (let i = 0; i < record.length; i++) {
        if (record[i].close > y_max) {
          y_max = record[i].close
        }
        if (record[i].close < y_min) {
          y_min = record[i].close
        }
      }
      let ctx = canvasRef.current.getContext('2d')
      let width = canvasRef.current.width
      let height = canvasRef.current.height
      let x_tick = width / record.length
      let y_tick = height / (y_max - y_min + 0.4 * Math.abs(change))
      let base = y_min - 0.2 * Math.abs(change)
      if (ctx === null) return
      for (let i = 0; i < record.length; i++) {
        if (i === 0) {
          ctx.moveTo(0, height - (prev_price - base) * y_tick)
          ctx.beginPath()
        }
        if (i !== 0) {
          ctx.lineTo(
            width - x_tick * i,
            height - (record[i].close - base) * y_tick,
          )
          ctx.lineWidth = 2
          if (prev_price - record[0].close > 0) {
            ctx.strokeStyle = '#059669'
          } else {
            ctx.strokeStyle = '#dc2626'
          }
        }
        if (i === record.length - 1) {
          ctx.stroke()
          ctx.beginPath()
          ctx.lineWidth = 1
          ctx.setLineDash([8, 4])
          ctx.moveTo(0, height - (prev_price - base) * y_tick)
          ctx.lineTo(width, height - (prev_price - base) * y_tick)
          ctx.stroke()
        }
      }
    }
  }, [])

  return (
    <Card
      className='flex flex-row mt-2 bg-transparent cursor-pointer w-fit text-stone-700 border-slate-950'
      onClick={() => router.push(`/stock/${symbol}`)}
    >
      <CardHeader className='px-4 py-4 @md:px-6'>
        <CardTitle className='text-lg @2xl:text-2xl'>{symbol}</CardTitle>
        <CardDescription className='w-24 @3xl:w-36 text-xs @2xl:text-sm text-stone-500'>
          {company_name}
        </CardDescription>
      </CardHeader>
      <CardContent className='flex flex-row gap-4 p-4 pl-0'>
        <canvas ref={canvasRef} width='144' height='96' />
        <div className='text-2xl @2xl:text-4xl w-20 @2xl:w-28 @3xl:w-36 text-end'>
          {Math.round(price * 100) / 100}
        </div>
      </CardContent>
    </Card>
  )
}
