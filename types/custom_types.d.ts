interface StockPrice {
  symbol: string
  company_name: string
  change: number
  price: number
  mkt_cap: string
  sector: string
  intraday_record: {
    date: string
    open: number
    high: number
    low: number
    close: number
    volume: number
  }[]
}

interface SymbolPrice {
  symbol: string
  change: number
  daily_ema_indicator: {
    date: string
    period_5: number
    period_20: number
    period_60: number
  }[]
  daily_sma_indicator: {
    date: string
    period_5: number
    period_20: number
    period_60: number
  }[]
  daily_record: {
    date: string
    open: number
    high: number
    low: number
    close: number
    volume: number
  }[]
  price: number
}

interface Sector {
  sector_id: number
  sector_name: string
}

export {StockPrice, SymbolPrice, Sector}
