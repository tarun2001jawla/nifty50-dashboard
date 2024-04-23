/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';

ChartJS.register(...registerables);
import "chart.js/auto";

interface Props {
    data: any[];
}

const Nifty50Graph: React.FC<Props> = ({ data }) => {
    // Process the data
    const processedData = data
    .filter(entry => entry.Date !== '') // Filter out entries with an empty string for Date
    .map((entry: { Date: any; Open: string; High: string; Low: string; Close: string; }) => ({
      Date: entry.Date,
      Open: parseFloat(entry.Open.replace(/,/g, '')),
      High: parseFloat(entry.High.replace(/,/g, '')),
      Low: parseFloat(entry.Low.replace(/,/g, '')),
      Close: parseFloat(entry.Close.replace(/,/g, '')),
    }));
// Define options for the chart
const options = {
  plugins: {
    title: {
      display: false,
    },
    legend: {
      position: 'bottom',
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      grid: {
        display: true,
      },
    },
  },
};
    const chartData = {
        labels: processedData.map((entry: { Date: any; }) => entry.Date),
        datasets: [
            {
                label: 'Open',
                data: processedData.map((entry) => entry.Open),
                fill: false,
                borderColor: 'rgb(255, 99, 132)',
                tension: 0.1,
            },
            {
                label: 'High',
                data: processedData.map((entry) => entry.High),
                fill: false,
                borderColor: 'rgb(54, 162, 235)',
                tension: 0.1,
            },
            {
                label: 'Low',
                data: processedData.map((entry) => entry.Low),
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1,
            },
            {
                label: 'Close',
                data: processedData.map((entry) => entry.Close),
                fill: false,
                borderColor: 'rgb(153, 102, 255)',
                tension: 0.1,
            },
        ]
    };

    return (
        <div>
        
            <Line data={chartData} options={options} />
        </div>
    );
}

export default Nifty50Graph;
