import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line, Bar, Pie, Doughnut } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const defaultDarkOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      labels: {
        color: '#94a3b8',
        font: { family: 'Inter', size: 12 },
        padding: 16,
      },
    },
    tooltip: {
      backgroundColor: '#1e293b',
      titleColor: '#f1f5f9',
      bodyColor: '#cbd5e1',
      borderColor: 'rgba(99, 102, 241, 0.2)',
      borderWidth: 1,
      cornerRadius: 12,
      padding: 12,
      titleFont: { family: 'Inter', weight: 'bold' },
      bodyFont: { family: 'Inter' },
    },
  },
  scales: {
    x: {
      ticks: { color: '#64748b', font: { family: 'Inter', size: 11 } },
      grid: { color: 'rgba(51, 65, 85, 0.3)' },
    },
    y: {
      ticks: { color: '#64748b', font: { family: 'Inter', size: 11 } },
      grid: { color: 'rgba(51, 65, 85, 0.3)' },
    },
  },
};

const ProgressChart = ({ type = 'line', data, options = {}, height = 300, title = '' }) => {
  const mergedOptions = {
    ...defaultDarkOptions,
    ...options,
    plugins: {
      ...defaultDarkOptions.plugins,
      ...options.plugins,
      title: title
        ? {
            display: true,
            text: title,
            color: '#e2e8f0',
            font: { family: 'Inter', size: 16, weight: 'bold' },
            padding: { bottom: 16 },
          }
        : { display: false },
    },
  };

  // Remove scales for pie/doughnut charts
  if (type === 'pie' || type === 'doughnut') {
    delete mergedOptions.scales;
  }

  const chartComponents = {
    line: Line,
    bar: Bar,
    pie: Pie,
    doughnut: Doughnut,
  };

  const ChartComponent = chartComponents[type] || Line;

  return (
    <div style={{ height }}>
      <ChartComponent data={data} options={mergedOptions} />
    </div>
  );
};

export default ProgressChart;
