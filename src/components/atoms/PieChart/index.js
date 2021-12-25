import React from "react";
import { object, number } from "prop-types";
import { Pie } from "@ant-design/charts";

const PieChart = ({ style, height, data = [], lineWidth }) => {

	const dataMapping = data.map((item) => ({
		type: item.type,
		value: parseInt(item.value, 10),
	}));

	const config = {
		height,
		appendPadding: 0,
		data: dataMapping,
		angleField: "value",
		colorField: "type",
		color: ['#EBA45E', '#E4EAEB', '#725E9C', '#5C8F94', '#EBA45E'],
		radius: 0,
		tooltip: {
			follow: true,
		},
		label: false,
		legend: {
			layout: "horizontal",
			position: "bottom",
			slideable: false,
		},
		interactions: [
			{
				type: "pie-legend-active",
			},
			{
				type: "element-active",
			},
		],
		pieStyle: {
			stroke: "",
		}
	};

	return <Pie {...config} style={style} />;
};

PieChart.propTypes = {
	style: object,
	height: number.isRequired,
};

PieChart.defaultProps = {
	style: {},
};

export default PieChart;
