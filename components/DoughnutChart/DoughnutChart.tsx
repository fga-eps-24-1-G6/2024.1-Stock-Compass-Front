'use client'

import { Doughnut } from 'react-chartjs-2'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
} from 'chart.js'
import Formatter from '@/utils/formatter';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);

interface DoughnutChartProps {
    data: number[],
    labels: string[],
    showLegend?: boolean,
    labelFunc?: (context: any) => string | void | string[]
}

type position = "right" | "center" | "left" | "top" | "bottom" | "chartArea" | undefined;
type align = "center" | "start" | "end" | undefined;

export function DoughnutChart({ data, labels, showLegend, labelFunc }: DoughnutChartProps) {
    const chartData = {
        labels,
        datasets: [{
            data,
            backgroundColor: [
                'rgba(255, 255, 255, 1)',
                'rgba(228, 228, 231, 1)',
                'rgba(161, 161, 170, 1)',
                'rgba(113, 113, 122, 1)',
                'rgba(59, 59, 64, 1)',
            ],
        }],
    };

    const options = {
        plugins: {
            legend: {
                display: showLegend,
                position: 'right' as position,
                align: 'start' as align,
                labels: {
                    useBorderRadius: true,
                    borderRadius: 20000,
                    boxWidth: 15,
                    color: 'rgba(255, 255, 255, 1)',
                    font: {
                        size: 16,
                        lineHeight: 28,
                    }
                }
            },
            tooltip: {
                displayColors: false,
                callbacks: {
                    label: labelFunc || function (context: any) {
                        return Formatter.percentage(context.parsed);
                    }
                }
            }
        },
        elements: {
            arc: {
                borderWidth: 5,
                borderColor: 'rgba(9, 9, 11, 1)',
            }
        },
        maintainAspectRatio: false,
        responsive: true
    };

    return (
        <Doughnut data={chartData} options={options} />
    )
}