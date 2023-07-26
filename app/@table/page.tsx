import axios from 'axios'

export const getTopGainer = async () => {
  return await axios.get(`${process.env.SERVER_URL}/api/v2/price/top10_gainer`)
}

export default async function TablePage() {
  // let res = await getTopGainer()

  return <div>test</div>
}
