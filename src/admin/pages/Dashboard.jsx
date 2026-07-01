import React from 'react'
import Footer from '../../components/Footer'
import AdminSidebar from '../components/AdminSidebar'
import AdminHeader from '../components/AdminHeader';

import { FaBook } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { GrUserWorker } from "react-icons/gr";

import HighchartsReact from 'highcharts-react-official';
import HighCharts from 'highcharts';

function DashBoard() {

  // 📊 COLUMN CHART (Users vs Books Activity)
  const graphOptions = {
    chart: {
      type: 'column',
      backgroundColor: '#FAF7F2',
      style: { fontFamily: 'Inter, sans-serif' }
    },
    title: {
      text: 'User Activity vs Book Activity',
      style: { color: '#0D2818', fontWeight: '600', fontSize: '14px' }
    },
    xAxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      crosshair: true,
      accessibility: { description: 'Months' }
    },
    yAxis: {
      min: 0,
      title: { text: 'Count' }
    },
    plotOptions: {
      column: { pointPadding: 0.2, borderWidth: 0, borderRadius: 4 }
    },
    colors: ['#0D2818', '#C5A880', '#8B6F47'],
    series: [
      { name: 'New Users',        data: [120, 190, 300, 250, 400, 520] },
      { name: 'Books Added',      data: [80, 140, 210, 180, 300, 410] },
      { name: 'Books Purchased',  data: [60, 120, 180, 160, 270, 390] }
    ]
  };

  // 🥧 PIE CHART (Book Categories Distribution)
  const pieOptions = {
    chart: {
      type: 'pie',
      backgroundColor: '#FAF7F2',
      style: { fontFamily: 'Inter, sans-serif' }
    },
    title: {
      text: 'Book Category Distribution',
      style: { color: '#0D2818', fontWeight: '600', fontSize: '14px' }
    },
    tooltip: { valueSuffix: '%' },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '{point.name}: {point.percentage:.1f}%'
        }
      }
    },
    colors: ['#0D2818', '#C5A880', '#3D6B4F', '#8B6F47', '#1A5C38', '#E3DAC9'],
    series: [{
      name: 'Books',
      colorByPoint: true,
      data: [
        { name: 'Fiction',     y: 35 },
        { name: 'Non-Fiction', y: 20 },
        { name: 'Technology',  y: 15 },
        { name: 'Science',     y: 10 },
        { name: 'Biography',   y: 10 },
        { name: 'Others',      y: 10 }
      ]
    }]
  };

  const stats = [
    { icon: <FaBook className='text-2xl' />,       label: 'Total Books',     value: '500+', color: 'from-[#0D2818] to-[#1A5C38]' },
    { icon: <FaUsers className='text-2xl' />,      label: 'Total Users',     value: '300+', color: 'from-[#6B4226] to-[#C5A880]' },
    { icon: <GrUserWorker className='text-2xl' />, label: 'Total Employees', value: '25+',  color: 'from-[#2C3E50] to-[#4A6A80]' },
  ]

  return (
    <>
      <AdminHeader />

      <div className='min-h-[80vh] md:grid grid-cols-4 bg-[#FAF7F2]'>
        
        <div className='col-span-1'>
          <AdminSidebar />
        </div>

        <div className='col-span-3 p-6'>

          <div className="mb-6">
            <h1 className="font-serif-display text-2xl font-bold text-[#0D2818]">Dashboard Overview</h1>
            <p className="text-xs text-[#0D2818]/50 mt-1 uppercase tracking-[1.5px]">Real-time platform metrics</p>
          </div>

          {/* STAT CARDS */}
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-8'>

            {stats.map(({ icon, label, value, color }) => (
              <div key={label} className={`bg-gradient-to-br ${color} rounded-2xl p-6 text-white shadow-sm`}>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-white/10 rounded-xl">{icon}</div>
                  <span className='text-3xl font-bold'>{value}</span>
                </div>
                <p className='text-xs uppercase tracking-[1.5px] text-white/70 font-medium'>{label}</p>
              </div>
            ))}

          </div>

          {/* CHARTS */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
            
            <div className="bg-white rounded-2xl border border-[#E3DAC9]/60 shadow-sm p-4 overflow-hidden">
              <HighchartsReact highcharts={HighCharts} options={graphOptions} />
            </div>

            <div className="bg-white rounded-2xl border border-[#E3DAC9]/60 shadow-sm p-4 overflow-hidden">
              <HighchartsReact highcharts={HighCharts} options={pieOptions} />
            </div>

          </div>

        </div>
      </div>

      <Footer />
    </>
  )
}

export default DashBoard