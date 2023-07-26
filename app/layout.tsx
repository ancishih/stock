'use client'
import './globals.css'
import {Inter} from 'next/font/google'
const inter = Inter({subsets: ['latin']})
// components
import Nav from '@/components/nav'
import {Separator} from '@/components/ui/separator'
import SearchBar from '@/components/searchbar'
import {Provider} from 'react-redux'
import {store} from './store'
export default function RootLayout({
  children,
  table,
}: {
  children: React.ReactNode
  table: React.ReactNode
}) {
  return (
    <html lang='en'>
      <head>
        <title>Stock App</title>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </head>
      <Provider store={store}>
        <body className={inter.className}>
          <main className='@container container min-h-screen text-timberwolf'>
            <Nav className='w-full py-2' />
            <Separator />
            <div className='flex flex-row w-full'>
              <div className='w-full max-w-2xl'>
                <div className='my-3'>
                  <SearchBar />
                </div>
                {children}
              </div>
              <div className='hidden w-60 @2xl:block'>{table}</div>
            </div>
          </main>
        </body>
      </Provider>
    </html>
  )
}
