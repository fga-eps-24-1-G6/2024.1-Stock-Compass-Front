import { DoughnutChart } from "@/components/DoughnutChart/DoughnutChart";
import { MoveDown, MoveUp } from "lucide-react";

async function getWalletData(id: string) {
    return {
        total: 20000,
        variation: 7.4,
        paymentMonths: [
            {
                month: "Agosto",
                frequency: 70.0
            },
            {
                month: "Maio",
                frequency: 30.0
            },
            {
                month: "Novembro",
                frequency: 10.0
            }
        ]
    };
}

interface WalletProps {
    id: string
};

export async function Wallet({ id }: WalletProps) {
    const {
        total,
        variation,
        paymentMonths,
    } = await getWalletData(id);

    function handlePaymentMonths() {
        const formattedPaymentMonths = paymentMonths.sort((a, b) => b.frequency - a.frequency);
        const months = formattedPaymentMonths.map((i) => i.month);
        const frequencies = formattedPaymentMonths.map((i) => i.frequency);
        return { months, frequencies };
    }

    return (
        <main className="flex flex-col md:flex-row gap-6">
            <section className="flex flex-col gap-6">
                <div className="flex justify-between">
                    <p className="text-2xl font-semibold flex justify-start">
                        R$ 20.000
                    </p>
                    <span className={`flex items-center text-2xl font-semibold ${variation > 0 ? 'text-teal-400' : 'text-amber-500'}`}>
                        {variation > 0 ? <MoveUp className="w-4 h-4" /> : <MoveDown className="w-4 h-4" />}
                        {`${Math.abs(variation)}%`}
                    </span>
                </div>
                <div className="w-full h-40 md:w-60 md:h-60 lg:w-80 lg:h-80 flex justify-center">
                    <DoughnutChart
                        data={handlePaymentMonths().frequencies}
                        labels={handlePaymentMonths().months}
                        showLegend={false}
                    />
                </div>
            </section>

            <section className="flex flex-grow bg-slate-400">
                batata
            </section>
        </main>
    )
}
