import React from 'react';
import {
  ResponsiveContainer,
  BarChart as ReBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

const BarChart = ({ barChartData }) => {
  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        {barChartData.length > 0 ? (
          <ReBarChart
            data={barChartData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="income" fill="#22C55E" />
            <Bar dataKey="expense" fill="#EF4444" />
          </ReBarChart>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500 w-70 mt-15">
            No data to display for this filter.
          </div>
        )}
      </ResponsiveContainer>
    </div>
  );
};

export default BarChart;