import { BarChart } from "@/components/BarChart/BarChart";
import { DoughnutChart } from "@/components/DoughnutChart/DoughnutChart";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";

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

interface DividendsProps {
    ticker: string
};

export async function Dividends({ ticker }: DividendsProps) {
    const {
        dividendYield,
        paymentMonths,
        yearlyPayments,
        dividends
    } = await getDividends(ticker);

    function renderDividendCards() {
        return dividends.map((item) => (
            <CarouselItem key={item['payment_date']} className="sm:basis-1/2 md:basis-full lg:basis-1/2">
                <Card className="rounded-2xl">
                    <CardContent className="flex flex-col p-4 gap-4">
                        <div className="flex justify-between text-base">
                            <p>{item.type}</p>
                            <p>R$ {item.payment}</p>
                        </div>

                        <div className="text-sm">
                            <div className="flex justify-between">
                                <p className="text-muted-foreground">Data com</p>
                                <p>{item['ownership_date']}</p>
                            </div>
                            <div className="flex justify-between">
                                <p className="text-muted-foreground">Pagamento</p>
                                <p>{item['payment_date']}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </CarouselItem>
        ))
    }

    function handlePaymentMonths() {
        const formattedPaymentMonths = paymentMonths.sort((a, b) => b.frequency - a.frequency);
        const months = formattedPaymentMonths.map((i) => i.month);
        const frequencies = formattedPaymentMonths.map((i) => i.frequency);
        return { months, frequencies };
    }

    function handleYearlyPayments() {
        const formattedYearlyPayments = yearlyPayments.sort((a, b) => a.year - b.year);
        const years = formattedYearlyPayments.map((i) => i.year.toString());
        const payments = formattedYearlyPayments.map((i) => i.payment);
        return { years, payments };
    }

    return (
        <main className="flex flex-col md:grid md:grid-cols-2 gap-6">
            <section className="flex flex-col gap-6">
                <div className="flex flex-col gap-4">
                    <p className="text-xl">Dividend Yield</p>
                    <div className="grid grid-cols-2 gap-4">
                        <Card className="rounded-2xl p-4 flex flex-col gap-9">
                            <div className="w-full text-lg font-semibold">ATUAL</div>
                            <div className="w-full text-2xl font-semibold flex justify-end text-teal-400">
                                {dividendYield['current']}%
                            </div>
                        </Card>

                        <Card className="rounded-2xl p-4 flex flex-col gap-9">
                            <div className="w-full text-lg font-semibold">MÉDIA 5A</div>
                            <div className="w-full text-2xl font-semibold flex justify-end text-teal-400">
                                {dividendYield['avg_five_years']}%
                            </div>
                        </Card>
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    <p className="text-xl">Meses de Pagamento</p>
                    <div className="w-full h-56 flex justify-center">
                        <DoughnutChart
                            showLegend={false}
                            data={handlePaymentMonths().frequencies}
                            labels={handlePaymentMonths().months}
                        />
                    </div>
                </div>
            </section>

            <section className="flex flex-col gap-4">
                <p className="text-xl">Proventos Pagos</p>
                <div className="flex flex-col h-full gap-4">
                    <div className="flex flex-grow md:overflow-hidden">
                        <BarChart
                            data={handleYearlyPayments().payments}
                            labels={handleYearlyPayments().years}
                            backgroundColor='rgba(113, 113, 122, 1)'
                        />
                    </div>

                    <div className="flex w-full">
                        <Carousel
                            opts={{
                                align: "start",
                            }}
                            className="w-full"
                        >
                            <CarouselContent>
                                {renderDividendCards()}
                            </CarouselContent>
                            <CarouselPrevious />
                            <CarouselNext />
                        </Carousel>
                    </div>
                </div>
            </section>
        </main>
    )
}
