import { useTheme } from "flowbite-react";
import { FC } from "react";
import Chart from "react-apexcharts";

const AcquisitionChart: FC = function () {
	const { mode } = useTheme();
	const isDarkTheme = mode === "dark";
  
	const options: ApexCharts.ApexOptions = {
	  labels: ["Organic", "Referral", "Direct", "Social", "Other", "Email"],
	  colors: ["#16BDCA", "#FDBA8C", "#1A56DB", "#D61F69", "#9061F9", "#6875F5"],
	  chart: {
		fontFamily: "Inter, sans-serif",
		toolbar: {
		  show: false,
		},
	  },
	  stroke: {
		colors: [isDarkTheme ? "#111827" : "#fff"],
	  },
	  plotOptions: {
		pie: {
		  donut: {
			size: "5%",
		  },
		},
	  },
	  states: {
		hover: {
		  filter: {
			type: "darken",
			value: 0.9,
		  },
		},
	  },
	  tooltip: {
		shared: true,
		followCursor: false,
		fillSeriesColor: false,
		inverseOrder: true,
		style: {
		  fontSize: "14px",
		  fontFamily: "Inter, sans-serif",
		},
		x: {
		  show: true,
		  formatter: function (_, { seriesIndex, w }) {
			const label = w.config.labels[seriesIndex];
			return label;
		  },
		},
		y: {
		  formatter: function (value) {
			return value + "%";
		  },
		},
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
	};
	const series = [30, 24, 18, 12, 9, 7];
  
	return <Chart height={305} options={options} series={series} type="donut" />;
  };

  export default AcquisitionChart;