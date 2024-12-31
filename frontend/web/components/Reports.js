import { useState } from 'react';
import { Line, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Reports = () => {
  const [reportType, setReportType] = useState('summary');
  const [dateRange, setDateRange] = useState('month');

  // Sample data for the charts
  const pieData = {
    labels: ['Melanoma', 'Benign', 'Uncertain', 'Other'],
    datasets: [{
      data: [12, 45, 8, 15],
      backgroundColor: [
        '#FF6384',
        '#36A2EB',
        '#FFCE56',
        '#4BC0C0'
      ]
    }]
  };

  const lineData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Scans Performed',
      data: [12, 19, 15, 25, 22, 30],
      fill: false,
      borderColor: '#4299e1',
      tension: 0.1
    }]
  };

  const generateReport = () => {
    // Report generation logic
    console.log('Generating report:', reportType, dateRange);
  };

  return (
    <div style={styles.container}>
      <div style={styles.controls}>
        <select
          value={reportType}
          onChange={(e) => setReportType(e.target.value)}
          style={styles.select}
        >
          <option value="summary">Summary Report</option>
          <option value="detailed">Detailed Analysis</option>
          <option value="trends">Trends Report</option>
        </select>

        <select
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value)}
          style={styles.select}
        >
          <option value="week">Last Week</option>
          <option value="month">Last Month</option>
          <option value="year">Last Year</option>
        </select>

        <button onClick={generateReport} style={styles.button}>
          Generate Report
        </button>
      </div>

      <div style={styles.charts}>
        <div style={styles.chart}>
          <h3>Condition Distribution</h3>
          <Pie data={pieData} />
        </div>

        <div style={styles.chart}>
          <h3>Analysis Trends</h3>
          <Line data={lineData} />
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '2rem',
    backgroundColor: 'white',
    borderRadius: '0.5rem',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  },
  controls: {
    display: 'flex',
    gap: '1rem',
    marginBottom: '2rem'
  },
  select: {
    padding: '0.5rem',
    borderRadius: '0.25rem',
    border: '1px solid #e2e8f0'
  },
  button: {
    padding: '0.5rem 1rem',
    backgroundColor: '#4299e1',
    color: 'white',
    border: 'none',
    borderRadius: '0.25rem',
    cursor: 'pointer'
  },
  charts: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '2rem'
  },
  chart: {
    padding: '1rem',
    backgroundColor: 'white',
    borderRadius: '0.5rem',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  }
};

export default Reports; 