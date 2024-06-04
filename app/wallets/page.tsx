import SingleColumn from "@/components/templates/SingleColumn";
import { Card } from "@/components/ui/card";
import { IconBadge } from "@/components/IconBadge/IconBadge";
import Link from "next/link";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { ErrorAlert } from "@/components/ErrorAlert/ErrorAlert";
import { NewWallet } from "./NewWallet";
import { WalletActions } from "../wallet/[id]/WalletActions";

interface Wallet {
  id: number,
  name: string,
  externalId: string
}

async function getUserWallets(userId: string): Promise<Wallet[] | null> {
  try {
    const response = await fetch(`${process.env.WALLET_API}/api/wallets/get/user/${userId}`, { cache: 'no-store' });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export default async function WalletsPage() {
  const user = await currentUser();

  if (!user) redirect(`/`);

  const wallets = await getUserWallets(user.id);

  function renderCards() {
    return wallets?.map((item, index) => (
      <Link href={`/wallet/${item.id}`} key={index + item.name}>
        <Card className="flex flex-col gap-4 p-4 rounded-2xl">
          <div className="w-full flex justify-between">
            <IconBadge variant={"wallet"} />
            <WalletActions walletId={item.id} currentName={item.name} />
          </div>

          <div className="flex flex-col gap-1">
            <h3 className="text-xl md:text-2xl font-semibold">{item.name}</h3>
          </div>
        </Card>
      </Link>
    ))
  }

  return (
    <SingleColumn>
      <div className="flex flex-col gap-4 w-full">
        <h1 className="text-3xl font-semibold tracking-tight">
          Carteiras de papel
        </h1>
        <p className="text-base md:text-xl">
          Simule diferentes estratégias de investiento sem o risco
          de usar seu proprio dinheiro
        </p>
      </div>

      <div className="flex flex-col w-full gap-4">
        <div className="w-full flex justify-between items-center">
          <h2 className="text-xl md:text-2xl font-semibold">Suas carteiras</h2>

          <NewWallet userId={user.id} />
        </div>

        {
          wallets ?
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
              {renderCards()}
            </div> :
            <ErrorAlert />
        }
      </div>
    </SingleColumn>
  );
}
