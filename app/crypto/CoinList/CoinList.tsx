import Formatter from "@/utils/formatter";
import { Card } from "../../../components/ui/card";
import { ArrowUp } from "lucide-react";

interface CryptoCoin {
  name: string,
  value: number,
  marketCap: number,
  last24hVolume: number,
  last24hChange: number
}

async function getCryptoCoins(): Promise<CryptoCoin[]> {
  try {
    const response = await fetch(`${process.env.CRYPTO_BOT_API}/crypto_currency/coins-summary`, { cache: 'no-store' });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const dataEntries = Object.entries(data);

    const coins = dataEntries.map((item: any) => {
      return {
        name: item[0],
        value: item[1]['brl'],
        marketCap: item[1]['brl_market_cap'],
        last24hVolume: item[1]['brl_24h_vol'],
        last24hChange: item[1]['brl_24h_change'],
      }
    })

    return coins;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export default async function CoinList() {
  const coins = await getCryptoCoins();

  function handleCompanyThumb(name: string) {
    if (!name) return '';

    return name.slice(0, 2).toUpperCase();
  }

  return coins?.map((item, index) => (
    <Card key={index} className="flex flex-col p-6 rounded-2xl gap-4">
      <div className="flex items-center justify-between text-xl font-semibold">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-slate-700 flex justify-center items-center p-4 text-slate-300">
            {handleCompanyThumb(item.name)}
          </div>
          <p>{Formatter.titleCase(item.name)}</p>
        </div>

        <p>{Formatter.currency(item.value)}</p>
      </div>

      <div className="flex flex-grow flex-col">
        <div className="flex justify-between text-muted-foreground">
          <p>Variação 24h</p>

          <div className="flex justify-center items-center">
            <ArrowUp className="h-4 w-4 text-teal-400" />
            <p className="text-teal-400">{Formatter.percentage(item.last24hChange)}</p>
          </div>
        </div>

        <div className="flex justify-between text-muted-foreground">
          <p>Volume de negociação de 24h</p>
          <p>{Formatter.shortCurrency(item.last24hVolume)}</p>
        </div>

        <div className="flex justify-between text-muted-foreground">
          <p>Valor de mercado</p>
          <p>{Formatter.shortCurrency(item.marketCap)}</p>
        </div>
      </div>
    </Card>
  ));
}
