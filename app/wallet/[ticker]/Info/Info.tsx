import { DoughnutChart } from "@/components/DoughnutChart/DoughnutChart";
import { ArrowUp } from "lucide-react";

async function getDividends(ticker: string) {
    return {
        dividendYield: {
            current: 8.50,
            avg_five_years: 7.95,
            avg_ten_years: 6.98,
        },
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
        ],
        yearlyPayments: [
            {
                year: 2023,
                payment: 5.07
            },
            {
                year: 2022,
                payment: 5.07
            },
            {
                year: 2021,
                payment: 5.07
            },
        ],
        dividends: [
            {
                type: "Dividendo",
                payment: 5.07,
                ownership_date: "08/12/2023",
                payment_date: "13/12/2023"
            },
            {
                type: "JCP",
                payment: 6.78,
                ownership_date: "08/05/2023",
                payment_date: "13/05/2023"
            },
        ]
    };
}

interface InfoProps {
    ticker: string
};

export async function Info({ ticker }: InfoProps) {
    const {
        paymentMonths,
    } = await getDividends(ticker);

    function handlePaymentMonths() {
        const formattedPaymentMonths = paymentMonths.sort((a, b) => b.frequency - a.frequency);
        const months = formattedPaymentMonths.map((i) => i.month);
        const frequencies = formattedPaymentMonths.map((i) => i.frequency);
        return { months, frequencies };
    }

    return (
        <main className="flex flex-col md:grid md:grid-cols-2 gap-6">
            <section className="flex flex-col gap-6">
                <div className="flex flex-row gap-1">
                    <p className="text-xl w-full flex justify-start">R$ 20.000</p>
                    <div className="w-full flex justify-end">
                    <ArrowUp color='rgba(45, 212, 191, 1)'></ArrowUp>
                    <p className="text-xl text-teal-400">7.40%</p>
                    </div>
                </div>
                    <div className="w-full h-56 flex justify-center">
                        <DoughnutChart
                            data={handlePaymentMonths().frequencies}
                            labels={handlePaymentMonths().months}
                            showLegend={false}
                        />
                </div>
            </section>

            <section className="flex flex-col gap-4">
               
            </section>
        </main>
    )
}
