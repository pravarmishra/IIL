
import React from 'react';
import ReactApexChart from 'react-apexcharts';
import "./newCss.css";

const isMobile = window.innerWidth < 900;



const PieChart = ({data}) => {
  const state = {
    series: data?[data.farmer,data.retailer,data.distributor,data.agriExpert]:[44, 55, 41, 17],
    options: {
      chart: {
        type: 'donut',
      },
      labels: ["Farmer   ", "Retailer", "Distributor", "Agri Expert"],
      plotOptions: {
        pie: {
          startAngle: -90,
          endAngle: 270,
          
        },
      },
      dataLabels: {
        enabled: true, 
        formatter: function (val, opts) {
          return opts.w.globals.series[opts.seriesIndex];
        },
        style: {
          colors: ['#FFFFFF'], // Set data label color to white
        },
      },
      fill: {
        type: 'gradient',
      },
      legend: {
        enabled: true,
        // formatter: function (val, opts) {
        //   const labels = ["Farmers  ", "Retailer   ", "Distributor", "Agri Expert "];
        //   return labels[opts.seriesIndex] ;
        // },
        position: 'right',
        marker: {
          fillColors: ['#FFFFFF'], // Set legend marker color to white
        },
      },
      title: {
        text: 'Visit', // Change the title
        align: 'center', // Align the title in the center
        style: {
          fontSize: '20px', // Change the font size
          fontFamily: 'Montserrat, sans-serif', // Change the font style
        },
      },

      responsive: [
        {
          breakpoint: 550,
          options: {
            
            legend: {
              position: 'top',
            },
          },
        },
      ],
      exporting: {
        enabled: true, // Enable chart exporting
      },
    },
  };

  

  return (
    <div id="chart" style={{ width: '100%' }}>
      <div className="donut-chart-container">
        
      <ReactApexChart options={state.options} series={state.series} type="donut"  />
      <div className="center-text" style={{marginTop:isMobile&&"-30px"}}><strong>Total : {data?data?.farmer+data?.retailer+data?.distributor+data?.agriExpert:"100"}</strong></div>
      </div>
    </div>
  );
};

export default PieChart;
