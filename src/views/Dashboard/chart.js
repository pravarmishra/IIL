import React from 'react';
import ReactApexChart from 'react-apexcharts';

const colors = ['#EABE36', '#E62E2A', '#369126', '#3696E6', '#a639b9'];

const ApexChart = ({ data,state }) => {
  // const { totalSOInHouse, totalPending, expectingDelivery, containerPlanned, containerUnplanned } = data;
  // console.log("CAHRTDATA",data);
  // console.log("CAHRTDATA",state);


  const series =state? [{
    name: 'Count',
    data: [data.totalSOInHouse, data.totalPending, data.expectingDelivery, data.Delivered, data.DeliveryPendingtoCustomer],
  }]
  :[{
    name: 'Count',
    data: [data.totalSOInHouse, data.totalPending, data.expectingDelivery, data.Delivered],
  }];

  const options = {
    chart: {
      height: 350,
      type: 'bar',
      events: {
        click: function (chart, w, e) {
          // console.log(chart, w, e)
        },
      },
    },
   
    
    colors: colors,
    plotOptions: {
      bar: {
        columnWidth: '28%',
        distributed: true,
        borderRadius:4
      },
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    xaxis: {
      name: 'Count',
      categories:state? [
        'Total SO In House',
        'Total Pending',
        'Expecting Delivery',
        'Delivered',
        'Delivery pending customer',
      ]
      :[
        'Total SO In House',
        'Total Pending',
        'Expecting Delivery',
        'Delivered',
        // 'Container Unplanned',
      ],
      labels: {
        style: {
          fontSize: '10px',
          fontFamily: 'Montserrat, sans-serif', 
        },
      },
    },
  };

  return (
    <div id="chart">
      <ReactApexChart options={options} series={series} type="bar" height={270} />
    </div>
  );
};

export default ApexChart;
