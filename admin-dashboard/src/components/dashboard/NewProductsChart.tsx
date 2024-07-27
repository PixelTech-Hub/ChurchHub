import { FC } from "react";
import Chart from "react-apexcharts";

const NewProductsChart: FC = function () {
	const options: ApexCharts.ApexOptions = {
	  colors: ["#1A56DB", "#FDBA8C"],
	  chart: {
		fontFamily: "Inter, sans-serif",
		foreColor: "#4B5563",
		toolbar: {
		  show: false,
		},
	  },
	  plotOptions: {
		bar: {
		  columnWidth: "50%",
		  borderRadius: 3,
		},
	  },
	  tooltip: {
		shared: true,
		intersect: false,
		style: {
		  fontSize: "14px",
		  fontFamily: "Inter, sans-serif",
		},
	  },
	  states: {
		hover: {
		  filter: {
			type: "darken",
			value: 1,
		  },
		},
	  },
	  stroke: {
		show: true,
		width: 5,
		colors: ["transparent"],
	  },
	  grid: {
		show: false,
	  },
	  dataLabels: {
		enabled: false,
	  },
	  legend: {
		show: false,
	  },
	  xaxis: {
		floating: true,
		labels: {
		  show: false,
		},
		axisBorder: {
		  show: false,
		},
		axisTicks: {
		  show: false,
		},
	  },
	  yaxis: {
		show: false,
	  },
	  fill: {
		opacity: 1,
	  },
	};
	const series = [
	  {
		name: "Digital",
		color: "#1A56DB",
		data: [
		  { x: "01 Feb", y: 170 },
		  { x: "02 Feb", y: 180 },
		  { x: "03 Feb", y: 164 },
		  { x: "04 Feb", y: 145 },
		  { x: "05 Feb", y: 174 },
		  { x: "06 Feb", y: 170 },
		  { x: "07 Feb", y: 155 },
		],
	  },
	  {
		name: "Goods",
		color: "#FDBA8C",
		data: [
		  { x: "01 Feb", y: 120 },
		  { x: "02 Feb", y: 134 },
		  { x: "03 Feb", y: 167 },
		  { x: "04 Feb", y: 179 },
		  { x: "05 Feb", y: 145 },
		  { x: "06 Feb", y: 182 },
		  { x: "07 Feb", y: 143 },
		],
	  },
	];
  
	return <Chart height={305} options={options} series={series} type="bar" />;
  };

  export default NewProductsChart;