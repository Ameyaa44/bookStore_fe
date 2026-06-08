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
      type: 'column'
    },
    title: {
      text: 'User Activity vs Book Activity'
    },

    xAxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      crosshair: true,
      accessibility: {
        description: 'Months'
      }
    },

    yAxis: {
      min: 0,
      title: {
        text: 'Count'
      }
    },

    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0
      }
    },

    series: [
      {
        name: 'New Users',
        data: [120, 190, 300, 250, 400, 520]
      },
      {
        name: 'Books Added',
        data: [80, 140, 210, 180, 300, 410]
      },
      {
        name: 'Books Purchased',
        data: [60, 120, 180, 160, 270, 390]
      }
    ]
  };

  // 🥧 PIE CHART (Book Categories Distribution)
  const pieOptions = {
    chart: {
      type: 'pie'
    },

    title: {
      text: 'Book Category Distribution'
    },

    tooltip: {
      valueSuffix: '%'
    },

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

    series: [
      {
        name: 'Books',
        colorByPoint: true,
        data: [
          {
            name: 'Fiction',
            y: 35
          },
          {
            name: 'Non-Fiction',
            y: 20
          },
          {
            name: 'Technology',
            y: 15
          },
          {
            name: 'Science',
            y: 10
          },
          {
            name: 'Biography',
            y: 10
          },
          {
            name: 'Others',
            y: 10
          }
        ]
      }
    ]
  };

  return (
    <>
      <AdminHeader/>

      <div className='min-h-[60vh] md:grid grid-cols-4'>
        
        <div className='col-span-1'>
          <AdminSidebar/>
        </div>

        <div className='col-span-3 p-5'>
          
          <div className='md:grid grid-cols-3 gap-3 p-5'>

            <div className='w-full bg-violet-600/70 py-10 text-white rounded-sm mb-3'>
              <h1 className='text-xl flex justify-center gap-3 items-center'>
                <FaBook className='text-3xl'/>
                Total Books
              </h1>
              <h1 className='text-center text-lg font-bold'>500+</h1>
            </div>

            <div className='w-full bg-green-500/90 py-10 text-white rounded-sm mb-3'>
              <h1 className='text-xl flex justify-center gap-3 items-center'>
                <FaUsers className='text-4xl'/>
                Total Users
              </h1>
              <h1 className='text-center text-lg font-bold'>300+</h1>
            </div>

            <div className='w-full bg-yellow-400/80 py-10 text-white rounded-sm mb-3'>
              <h1 className='text-xl flex justify-center gap-3 items-center'>
                <GrUserWorker className='text-3xl'/>
                Total Employees
              </h1>
              <h1 className='text-center text-lg font-bold'>25+</h1>
            </div>

          </div>

          <div className='md:grid grid-cols-2 gap-5'>
            
            <HighchartsReact
              highcharts={HighCharts}
              options={graphOptions}
            />

            <HighchartsReact
              highcharts={HighCharts}
              options={pieOptions}
            />

          </div>

        </div>
      </div>

      <Footer/>
    </>
  )
}

export default DashBoard