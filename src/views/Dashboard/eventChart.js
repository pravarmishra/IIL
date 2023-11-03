import React from 'react';
import ReactApexChart from 'react-apexcharts';
import "./newCss.css";

const isMobile = window.innerWidth < 900;

const EventChart = ({ data }) => {
  console.log("DATAA", data);

  // Define custom colors for each segment
  const customColors = ["#008ffb", "#00e396","#feb019", "#FF3399",  "#FFD700", "#33FF33", "#9933FF"];

  // Define custom labels for each segment (corresponding to data points)
  const customLabels = ["Spot Demo", "Normal Demo", "Van Campaign", "Demo LPD", "Farmer Meet", "KVK Visit", "Krishi Mela"];

  // Generate the data for the pie chart
  const seriesData = data ? [data.spotDemo, data.normalDemo, data.vanCampaign, data.demoLpd, data.farmerMeet, data.kvk, data.krishiMela] : [44, 55, 41, 17, 20, 22, 12];

  const state = {
    series: seriesData,
    options: {
      chart: {
        type: 'donut',
      },
      labels: customLabels, // Use the custom labels
      plotOptions: {
        pie: {
          startAngle: -90,
          endAngle: 270,
         
        },
      },
      colors: customColors, // Use the custom colors
      dataLabels: {
        enabled: true,
        formatter: function (val, opts) {
          return opts.w.globals.series[opts.seriesIndex];
        },
      
      },
      fill: {
        type: 'gradient',
        colors: customColors, // Use the custom colors for each data point
      },
      legend: {
        show: true,
        position: 'right',
        markers: {
          fillColors: customColors, // Use the custom colors for legend markers
        },
      },
      title: {
        text: 'Event', // Change the title
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
    <div id="chart" style={{ width: '106%',marginLeft:"-10px" }}>
      <div className="donut-chart-container">
        <ReactApexChart options={state.options} series={state.series} type="donut" />
        <div className="center-text" style={{ marginTop: isMobile && "-30px" }}><strong>Total : {seriesData.reduce((acc, val) => acc + val, 0)}</strong></div>
      </div>
    </div>
  );
};

export default EventChart;
