'use client'
import React from 'react'
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from "chart.js";

ChartJS.register(
    Title,
    Tooltip,
    Legend,
    BarElement, 
    CategoryScale,
    LinearScale
);

export default function BarChart({ lables, data, lable }: { lables: string[], data: number[], lable: string }) {
    const chartData = {
        labels: lables,
        datasets: [
            {
                label: lable ,
                data: data,
                borderWidth: 1, 
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 205, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(201, 203, 207, 0.2)'
                  ],
                  borderColor: [
                    'rgb(255, 99, 132)',
                    'rgb(255, 159, 64)',
                    'rgb(255, 205, 86)',
                    'rgb(75, 192, 192)',
                    'rgb(54, 162, 235)',
                    'rgb(153, 102, 255)',
                    'rgb(201, 203, 207)'
                  ],
            }
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const, 
            },
            tooltip: {
                callbacks: {
                    label: (context: any) => {
                        return `${context.dataset.label}: ${context.raw}`;
                    }
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true, 
                min: 0,
                max: Math.max(...data || [0]) * 1.3, 
            }
        }
    };

    return (
        <>
            <Bar data={chartData} options={options} />
        </>
    );
}
