import dayjs from "dayjs";
import { Card, Typography, Space } from "antd";
import { ArrowUpIcon, ArrowDownIcon } from "@chakra-ui/icons";
import { CalendarOutlined } from "@ant-design/icons";
import { Box, Flex } from "@chakra-ui/react";

import { string } from "prop-types";
import AreaChart from "../../atoms/AreaChart";

import { iconWp, cardWP } from "./styles";

const { Text, Title } = Typography;

const LineCard = ({ title, data = [], total, xField, yField, percentage }) => {
	console.log('asdsad', data)
	let showRange = '';
	if (data.length) {
		const getFirstMonth = dayjs(data[0].Date).month();
		const getLastMonth = dayjs(data[data.length - 1].Date).month();
		console.log("ksks", getFirstMonth, getLastMonth)
		showRange = getFirstMonth === getLastMonth ? dayjs(data[0].Date).format("MMM YYYY") : `${dayjs(data[0].Date).format("MMM")} - ${dayjs(data[data.length - 1].Date).format("MMM YYYY")}`
	}

	return (
		<Box css={cardWP}>
			<Card
				title={<div style={{ fontWeight: "bolder" }}>{title}</div>}
				loading={!data || !data.length}
			>
				<Box css={iconWp}>
					<Flex marginRight="8px">{showRange}</Flex>
					<CalendarOutlined />
				</Box>
				{data ? (
					<AreaChart
						style={{ padding: "8px" }}
						height={155}
						data={data}
						xField={xField}
						yField={yField}
					/>
				) : null}

				<Space
					direction="vertical"
					size={1}
					style={{ marginTop: "8px" }}
				>
					<Text
						style={{
							fontWeight: "bold",
							color: "#9C9C9C",
							fontSize: "12px",
						}}
					>
						Total Revenue
					</Text>
					<Title level={3} style={{ marginBottom: "0" }}>
						${total}
					</Title>
					{percentage ? (
						<Text
							style={{
								fontWeight: "bold",
								color: percentage < 0 ? "red" : "#5F9F2F",
								fontSize: "12px",
							}}
						>
							{percentage < 0 ? (
								<ArrowDownIcon
									w={3}
									h={3}
									color="red"
									display="inline-block"
									margin="0 2px 2px 0"
								/>
							) : (
								<ArrowUpIcon
									w={3}
									h={3}
									color="#5F9F2F"
									display="inline-block"
									margin="0 2px 2px 0"
								/>
							)}
							{percentage.toFixed(2)}%
						</Text>
					) : null}
				</Space>
			</Card>
		</Box>
	);
};

LineCard.propTypes = {
	title: string,
};

export default LineCard;
