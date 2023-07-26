'use client'
import {Button} from '@/components/ui/button'
import {Input} from '../components/ui/input'
import $ from 'jquery'
import React from 'react'
import {InputProps} from './ui/input'
import axios from 'axios'
import {useSelector, useDispatch} from 'react-redux'
import {RootState} from '../app/store'
import {debounce} from 'lodash'
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover'

interface SearchBarProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export default function SearchBar({
  onClick,
  ...props
}: InputProps & SearchBarProps) {
  const dispatch = useDispatch()
  const endpoint = useSelector((state: RootState) => state.endpoint)
  const inputRef = React.useRef<HTMLInputElement>(null)

  const [inputValue, setInputValue] = React.useState<string>('')

  const [isOpen, setIsOpen] = React.useState<boolean>(false)

  const handler = (e: Event) => {
    const {value} = e.target as HTMLInputElement
    if (value.length) {
      $('#search_btn').addClass('active')
    } else {
      $('#search_btn').removeClass('active')
    }
  }

  const input_handler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target
    // setInputValue(value)
  }

  const handle_focus = () => {
    setIsOpen(true)
  }

  const handle_blur = () => {
    setIsOpen(false)
  }

  React.useEffect(() => {
    if (inputRef && inputRef.current) {
      inputRef.current.addEventListener('change', handler, false)

      return () => {
        if (inputRef && inputRef.current) {
          inputRef.current.removeEventListener('change', handler, false)
        }
      }
    }
  }, [])

  // const onDebounce = debounce({delay: 100}, input_handler)

  return (
    <div className='flex flex-row gap-4'>
      <div className='flex flex-col flex-grow max-w-md'>
        <Input
          {...props}
          ref={inputRef}
          value={inputValue}
          onChange={input_handler}
          className='border-slate-400 text-night placeholder:text-gray-500 focus-visible:ring-cocoabrown'
          placeholder='Enter ticker symbol'
        />
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverContent></PopoverContent>
        </Popover>
      </div>

      <Button id='search_btn' className=''>
        Search
      </Button>
    </div>
  )
}
