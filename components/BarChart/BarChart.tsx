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

interface BarChartProps {
    data: number[],
    labels: string[],
    backgroundColor: string
}

export function BarChart({ data, labels, backgroundColor }: BarChartProps) {
    const barChartData = {
        labels,
        datasets: [{
            data,
            backgroundColor: [
                backgroundColor,
            ],
            hoverBackgroundColor: [
                'rgba(228, 228, 231, 1)',
            ],
            borderWidth: 0
        }]
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
        <Bar data={barChartData} options={options} />
    )
}