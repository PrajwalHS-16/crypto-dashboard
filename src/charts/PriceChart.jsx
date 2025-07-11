import React, { useState } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, CategoryScale, BarElement, Tooltip, Legend } from 'chart.js';
import { Box, Typography, Button, ButtonGroup } from '@mui/material';

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, BarElement, Tooltip, Legend);

const PriceChart = ({ chartData }) => {
  const [chartType, setChartType] = useState('line');
  const [timeFrame, setTimeFrame] = useState('1d'); // Placeholder for time frame filter
  // Only keeping chartAppearance for now
  const [chartAppearance, setChartAppearance] = useState({
    colors: ['#1976d2', '#d32f2f'], // Blue and Red MUI colors
    fonts: ['Arial', 'Helvetica'],
    layout: 'vertical',
  });

  // Prepare data for charts
  const labels = chartData.map(d => new Date(d[0]).toLocaleDateString());
  const dataset = {
    label: 'Price in USD',
    data: chartData.map(d => d[1]),
    fill: false,
    borderColor: chartAppearance.colors[0],
    backgroundColor: chartAppearance.colors[1],
    tension: 0.1,
    pointHoverRadius: 5,
    pointHoverBackgroundColor: chartAppearance.colors[1],
  };

  const data = {
    labels,
    datasets: [dataset],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      tooltip: {
        enabled: true,
        displayColors: false,
        callbacks: {
          label: (context) => {
            const price = context.formattedValue;
            const date = context.chart.data.labels[context.dataIndex];
            return `Price: $${price} on ${date}`;
          },
        },
      },
      legend: {
        display: true,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Price (USD)',
        },
      },
    },
  };

  // Render the proper chart based on chartType state
  const renderChart = () => {
    switch (chartType) {
      case 'line':
        return <Line data={data} options={chartOptions} />;
      case 'bar':
        return <Bar data={data} options={chartOptions} />;
      // For candlestick and scatter, you'd need other plugins or libs like react-financial-charts or chartjs-chart-financial
      default:
        return <Line data={data} options={chartOptions} />;
    }
  };

  return (
    <Box>
      <Typography variant="h6" mb={2}>
        Price Chart
      </Typography>

      <ButtonGroup variant="contained" sx={{ mb: 3 }}>
        <Button onClick={() => setChartType('line')} disabled={chartType === 'line'}>
          Line Chart
        </Button>
        <Button onClick={() => setChartType('bar')} disabled={chartType === 'bar'}>
          Bar Chart
        </Button>
        {/* You can add more buttons with proper chart support later */}
      </ButtonGroup>

      {renderChart()}
    </Box>
  );
};

export default PriceChart;
