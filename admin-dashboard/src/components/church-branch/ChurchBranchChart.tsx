import React from 'react';
import { Line } from 'react-chartjs-2';
import { ChurchBranch } from '../../types/ChurchBranches';
import { useTheme } from "flowbite-react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface ChurchBranchChartProps {
  data: ChurchBranch[] | null;
}

const ChurchBranchChart: React.FC<ChurchBranchChartProps> = ({ data }) => {
  const { mode } = useTheme();
  const isDarkTheme = mode === "dark";

  if (!data || data.length === 0) {
    return <div>No data available</div>;
  }

  const sortedBranches = data
    .filter((branch): branch is ChurchBranch & { createdAt: string } => 
      branch.createdAt !== undefined && branch.createdAt !== null
    )
    .sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return dateA - dateB;
    });

  const labels = sortedBranches.map(branch => 
    new Date(branch.createdAt).toLocaleDateString()
  );

  const cumulativeCounts = sortedBranches.map((_, index) => index + 1);

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Cumulative Church Branches',
        data: cumulativeCounts,
        borderColor: '#1A56DB',
        backgroundColor: 'rgba(26, 86, 219, 0.1)',
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#1A56DB',
        pointBorderColor: '#ffffff',
        pointHoverBackgroundColor: '#ffffff',
        pointHoverBorderColor: '#1A56DB',
        pointRadius: 4,
        pointHoverRadius: 6,
      }
    ]
  };

  const options: any = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: isDarkTheme ? '#374151' : '#ffffff',
        titleColor: isDarkTheme ? '#ffffff' : '#111827',
        bodyColor: isDarkTheme ? '#d1d5db' : '#4b5563',
        borderColor: isDarkTheme ? '#4b5563' : '#e5e7eb',
        borderWidth: 1,
        callbacks: {
          title: (context: any) => {
            return `Branch Created: ${context[0].label}`;
          },
          label: (context: any) => {
            const index = context.dataIndex;
            const branch = sortedBranches[index];
            const branchName = branch ? (branch.name || 'Unnamed Branch') : 'Unknown Branch';
            return [
              `Branch Name: ${branchName}`,
              `Total Branches: ${context.parsed.y}`
            ];
          }
        }
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: isDarkTheme ? '#9ca3af' : '#6b7280',
          maxRotation: 45,
          minRotation: 45,
        },
      },
      y: {
        grid: {
          color: isDarkTheme ? '#374151' : '#e5e7eb',
        },
        ticks: {
          color: isDarkTheme ? '#9ca3af' : '#6b7280',
          precision: 0,
        },
        beginAtZero: true,
      },
    },
    elements: {
      line: {
        borderWidth: 2,
      },
    },
    interaction: {
      intersect: false,
      mode: 'index',
    },
  };

  return (
    <div className="h-[350px] w-full">
      <Line options={options} data={chartData} />
    </div>
  );
};

export default ChurchBranchChart;