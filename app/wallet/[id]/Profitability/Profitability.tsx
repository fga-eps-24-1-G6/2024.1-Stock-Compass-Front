'use client'

import { Bar } from 'react-chartjs-2'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js'

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

async function getDividends(id: string) {
    return {
        paymentMonths: [
            {
                month: "jan",
                frequency: 70.0
            },
            {
                month: "fev",
                frequency: 30.0
            },
            {
                month: "mar",
                frequency: 10.0
            },
            {
                month: "abr",
                frequency: 70.0
            },
            {
                month: "mai",
                frequency: 30.0
            },
            {
                month: "jun",
                frequency: 10.0
            },
            {
                month: "jul",
                frequency: 70.0
            },
            {
                month: "ago",
                frequency: 30.0
            },
            {
                month: "set",
                frequency: 10.0
            },
            {
                month: "out",
                frequency: 70.0
            },
            {
                month: "nov",
                frequency: 30.0
            },
            {
                month: "dez",
                frequency: 10.0
            }
        ],
    }
}

interface ProfitabilityProps {
    id: string
};

export function Profitability({ id }: ProfitabilityProps) {
    const barChartData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets: [{
            label: 'Dataset 1',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            data: [65, 59, 80, 81, 56, 55],
            stack: 'stack0', // Optional: Stack identifier (optional for multiple stacked datasets)
        },
        {
            label: 'Dataset 2',
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            data: [28, 48, 40, 19, 86, 27],
            stack: 'stack0', // Optional: Same stack identifier for stacking
        },]
    };

    const options = {
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: false,
            },
            tooltip: {
                boxPadding: 20,
                displayColors: false,
                callbacks: {
                    label: function (context: any) {
                        return 'R$ ' + context.parsed.y.toFixed(2).toString().replace('.', ',');
                    }
                }
            }
        },
        scales: {
            y: {
                ticks: {
                    display: false
                }
            }
        },
        maintainAspectRatio: false,
        responsive: true
    }

    return (
        <Bar data={barChartData}
        options={options}
        />
    )
}
