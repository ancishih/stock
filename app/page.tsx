'use client'
import axios from 'axios'
import React from 'react'
import {Button} from '@/components/ui/button'
import {Popover, PopoverTrigger, PopoverContent} from '@/components/ui/popover'
import {Checkbox} from '@/components/ui/checkbox'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import StockCard from '@/components/stockcard'
import {ScrollArea} from '@/components/ui/scroll-area'
import {StockPrice, Sector} from '@/types/custom_types'
import {Skeleton} from '@/components/ui/skeleton'

export default function Home() {
  const [sectors, set_sectors] = React.useState<
    {sector_name: string; selected: boolean; sector_id: number}[]
  >([])

  const [stocks, set_stocks] = React.useState<StockPrice[]>([])

  const [loading, set_loading] = React.useState(true)

  const get_stock = async () => {
    try {
      const res = await axios.get<StockPrice[]>(
        `${process.env.SERVER_URL}/api/v2/price/all-sectors`,
      )

      if (res.status === 200) {
        set_stocks(res.data)
        set_loading(false)
      }
    } catch (e) {}
  }

  const get_sector = async () => {
    try {
      const res = await axios.get<Sector[]>(
        `${process.env.SERVER_URL}/api/v1/sectors`,
      )
      if (res.status === 200) {
        const sector = res.data.map(i => ({...i, selected: true}))
        set_sectors(sector)
      }
    } catch (e) {
      if (axios.isCancel(e)) {
        console.log(e)
      }
    }
  }

  React.useEffect(() => {
    const source = axios.CancelToken.source()
    get_sector()
    get_stock()
    return () => {
      source.cancel('data is mounted.')
    }
  }, [])

  const add_stock_price = async (bool: boolean, index: number) => {
    set_sectors(sector =>
      sector.map((i, idx) => {
        if (idx === index) {
          i.selected = !bool
        }
        return i
      }),
    )
  }

  return (
    <ScrollArea className='h-[calc(100vh_-_8rem)]'>
      <Popover>
        <PopoverTrigger asChild>
          <Button className='text-blue-500 bg-slate-300 hover:bg-slate-400'>
            Add Sector
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className='flex flex-col text-lg text-stone-600'
          align='start'
        >
          {sectors.map((i, idx) => (
            <React.Fragment key={idx}>
              <div className='flex items-center gap-2'>
                <Checkbox
                  id={`${i.sector_name}_checkbox`}
                  defaultChecked={i.selected}
                  onCheckedChange={() => add_stock_price(i.selected, idx)}
                />
                <label htmlFor={`${i.sector_name}_checkbox`}>
                  {i.sector_name}
                </label>
              </div>
            </React.Fragment>
          ))}
        </PopoverContent>
      </Popover>
      <Accordion type='multiple'>
        {sectors.map(i => (
          <React.Fragment key={i.sector_id}>
            {i.selected ? (
              <AccordionItem value={i.sector_name}>
                <AccordionTrigger className='text-stone-600'>
                  {i.sector_name}
                </AccordionTrigger>
                <AccordionContent>
                  {loading ? (
                    <>loading...</>
                  ) : (
                    stocks
                      .filter(element => {
                        if (element.sector === i.sector_name) return element
                        else null
                      })
                      .map(e => (
                        <StockCard
                          key={e.symbol}
                          record={e.intraday_record}
                          {...e}
                        />
                      ))
                  )}
                  {/* {stocks.map(i => )} */}
                  {/* {typeof stock_price[i.sector_name] === 'undefined'
                    ? null
                    : stock_price[i.sector_name].map(i => (
                        <StockCard
                          key={i.symbol}
                          record={i.intraday_record}
                          {...i}
                        />
                      ))} */}
                </AccordionContent>
              </AccordionItem>
            ) : null}
          </React.Fragment>
        ))}
      </Accordion>
    </ScrollArea>
  )
}
