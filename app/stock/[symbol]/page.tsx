'use client'
import zoom from 'chartjs-plugin-zoom'
import axios from 'axios'
import React from 'react'
import {Line} from 'react-chartjs-2'
import {
  Chart as ChartJs,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from 'chart.js'
import {SymbolPrice} from '@/types/custom_types'
//
ChartJs.register(LineElement, CategoryScale, LinearScale, PointElement, zoom)
export default function Symbol({params}: {params: {symbol: string}}) {
  const [close, set_data] = React.useState<number[]>([])

  const [labels, set_labels] = React.useState<string[]>([])

  const get_stock_data = async () => {
    const res = await axios.get<SymbolPrice>(
      `http://127.0.0.1:8081/api/v1/price/${params.symbol}`,
    )

    if (res.status === 200) {
      let labels_collector = []
      let data_collector = []
      for (let i = 0; i < res.data.daily_record.length; i++) {
        labels_collector.push(res.data.daily_record[i].date)
        data_collector.push(res.data.daily_record[i].close)
      }
      set_data(data_collector)
      set_labels(labels_collector)
      // let labels_collector = res.data.daily_record.map(i => i.date)

      // set_labels(labels_collector)
    }
  }

  const data = {
    labels,
    datasets: [
      {
        labels: 'stock price',
        data: close,
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      // title: {},
      zoom: {
        pinch: {
          enabled: true,
        },
        wheel: {
          enabled: true,
        },
        mode: 'x',
      },
    },
  }

  React.useEffect(() => {
    // ChartJs.register(zoom)
    get_stock_data()
  }, [])

  return <>{<Line data={data} />}</>
}
