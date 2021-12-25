import React from "react";
import { object, number } from "prop-types";
import { Area } from "@ant-design/charts";

const AreaChart = ({ style, height, data, xField, yField }) => {
	const config = {
		data,
		padding: "auto",
		xField,
		yField,
		color: "#789764",
		smooth: true,
		height,
	};

	return (
		<>
			<Area {...config} style={style} />
		</>
	);
};

AreaChart.propTypes = {
	style: object,
	height: number.isRequired,
};

AreaChart.defaultProps = {
	style: {},
};

export default AreaChart;
