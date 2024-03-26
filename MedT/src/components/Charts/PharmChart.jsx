import React from 'react'
import Chart from "react-apexcharts";
import { pharmData } from '../Data/PharmData';

function PharmChart({chartData}) {
  return (
    <div>
      <Chart
      type="bar"
      width={500}
      height={350}
      series={[
        {
          name: "Drug unit of pricing",
          data: pharmData.map(data => data.unitOfPricing),
          color: "#a480cf"
        },
        {
          name: "Drug price",
          data: pharmData.map(data => data.price),
          color: "#1282a2"
        }
      ]}
      options={{
        title: {
          text: "Distribution of medicines in a hospital pharmacy unit",
          style: {
            fontSize: "15",
            color: "#003049"
          }
        },
        chart: {
          stacked: true
        },
        plotOptions: {
          bar: {
            // horizontal: true,
            // columnWidth: "20%"
          }
        },
        stroke: {
          width: 5
        },
        xaxis: {
          title: {
            text: "Drug name",
            style: {
              fontSize: "13",
              color: "#4b2154",
            }
          },
          categories: pharmData.map(data => data.drugName)
        },
        yaxis: {
          title: {
            text: "Distribution",
            style: {
              fontSize: "13",
              color: "#4b2154"
            }
          }
        },
        legend: {
          position: "top"
        },
        dataLabels: {
          enabled: true
        },
        grid: {
          show: true,
          xaxis: {lines: {
            show: false
           }
          },
          yaxis: {
            lines: {
              show: false
            }
          }
        }
      }}
       />
    </div>
  )
}
  


export default PharmChart;