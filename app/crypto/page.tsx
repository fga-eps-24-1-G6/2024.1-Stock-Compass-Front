import SingleColumn from "@/components/templates/SingleColumn";
import CoinList from "./CoinList/CoinList";
import { Loading as CoinListLoading } from "./CoinList/Loading";
import { Suspense } from "react";

export default async function CryptoPage() {
  return (
    <SingleColumn>
      <span className="w-full">
        <h1 className="text-3xl font-semibold">Criptomoedas</h1>
      </span>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
        <Suspense fallback={<CoinListLoading />}>
          <CoinList />
        </Suspense>
      </div>
    </SingleColumn>
  );
}
