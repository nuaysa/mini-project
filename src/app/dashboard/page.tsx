"use client"

import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import Link from 'next/link';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [filter, setFilter] = useState('day');

  // Dummy data
  const dataByDay = [1200, 2300, 1800, 2500, 3000, 2000, 1500];
  const dataByMonth = [32000, 45000, 28000, 50000, 60000, 40000, 55000];
  const dataByYear = [420000, 520000, 680000, 750000];

  const labelsByDay = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const labelsByMonth = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
  const labelsByYear = ['2024', '2025', '2026', '2027'];

  const chartData = {
    labels:
      filter === 'day'
        ? labelsByDay
        : filter === 'month'
        ? labelsByMonth
        : labelsByYear,
    datasets: [
      {
        label: 'Revenue',
        data:
          filter === 'day'
            ? dataByDay
            : filter === 'month'
            ? dataByMonth
            : dataByYear,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Revenue Chart',
      },
    },
  };

  return (
    <div className="dashboard">
      <h1 className='flex items-center font-bold text-2xl ml-20 mt-10 underline text-cyan-900 '>Promotor Dashboard</h1>
      <div className='flex flex-row'>

      <div className="filters flex flex-col items-start font-bold text-lg mt-14 ml-20 gap-20 text-cyan-900  ">
        <button onClick={() => setFilter('day')} disabled={filter === 'day'}>
          By Day
        </button>
        <button onClick={() => setFilter('month')} disabled={filter === 'month'}>
          By Month
        </button>
        <button onClick={() => setFilter('year')} disabled={filter === 'year'}>
          By Year
        </button>
        <div className="total-revenue flex items-center font-bold text-sm  underline italic text-gray-800 ">
        <h2>Total Revenue</h2>
        <p>
          ${
            filter === 'day'
              ? dataByDay.reduce((acc, curr) => acc + curr, 0)
              : filter === 'month'
              ? dataByMonth.reduce((acc, curr) => acc + curr, 0)
              : dataByYear.reduce((acc, curr) => acc + curr, 0)
          }
        </p>
        </div>
      </div>
      <div className="chart-container size-[800px]">
        <Bar data={chartData} options={options} />
      </div>   
     
      <Link href="/createEvent" className='bg-[#387874] rounded-xl py-3 h-[40px] text-white px-4 mx-10 text-center'>create event</Link>
      </div>
      {/* <div className=' text-white  justify-between mb-[100px] ml-[580px]'>
      <button className='bg-gray-800 mt-20 mb-20 ml-10 mr-10'>Create Event Now</button>   
      </div> */}
    </div>
  );
};

export default Dashboard;