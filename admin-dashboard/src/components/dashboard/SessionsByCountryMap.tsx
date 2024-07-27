import { FC, useEffect } from "react";
import { useTheme } from "flowbite-react";
import svgMap from "svgmap";
import "svgmap/dist/svgMap.min.css";

const SessionsByCountryMap: FC = function () {
	const { mode } = useTheme();
  
	const isDarkTheme = mode === "dark";
  
	useEffect(() => {
	  const previousMap =
		document.getElementsByClassName("svgMap-map-wrapper")[0];
	  previousMap?.parentElement?.removeChild(previousMap);
  
	  new svgMap({
		targetElementID: "map",
		colorMin: "#A4CAFE",
		colorMax: "#1A56DB",
		colorNoData: isDarkTheme ? "#4B5563" : "#D1D5DB",
		flagType: "image",
		flagURL: "https://flowbite.com/application-ui/demo/images/flags/{0}.svg",
		data: {
		  data: {
			visitors: {
			  name: "Visitors:",
			  format: "{0}",
			  thousandSeparator: ",",
			  thresholdMax: 500000,
			  thresholdMin: 0,
			},
			change: {
			  name: "Change:",
			  format: "{0} %",
			},
		  },
		  applyData: "visitors",
		  values: {
			US: { visitors: 272109, change: 4.73 },
			CA: { visitors: 160064, change: 11.09 },
			DE: { visitors: 120048, change: -2.3 },
			GB: { visitors: 110048, change: 3.3 },
			FR: { visitors: 100048, change: 1.3 },
			ES: { visitors: 90048, change: 1.5 },
			JP: { visitors: 56022, change: 3.5 },
			IT: { visitors: 48019, change: 1 },
			NL: { visitors: 40016, change: 2 },
			RU: { visitors: 30016, change: 3.4 },
			CN: { visitors: 50016, change: 6 },
			IN: { visitors: 140016, change: 2 },
			BR: { visitors: 40016, change: 5 },
		  },
		},
	  });
	}, [isDarkTheme]);
  
	return <div id="map" className="my-6" />;
  };
  
  

  export default SessionsByCountryMap