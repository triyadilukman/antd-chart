import dayjs from "dayjs";
import { Col, Row } from "antd";
import { Flex } from "@chakra-ui/react";

import PieCard from "./components/molecules/PieCard";
import AreaCard from "./components/molecules/AreaCard";
import CalendarCard from "./components/molecules/CalendarCard";
import TableCard from "./components/molecules/TableCard";
import Header from "./components/molecules/Header";

import { useRDData } from "./context/fetch-context";

import { colStyle } from "./styles";

const View = () => {
	const { state: rDStates, dispatch: rdDispatch } = useRDData();
	const {
		user_category,
		conversion_items,
		orders,
		revenue,
		total_revenue,
		percentage,
	} = rDStates;

	return (
		<>
			<Header />
			<Flex
				height="56px"
				backgroundColor="#F5F5F5"
				justifyContent="flex-end"
				justifyItems="center"
				alignItems="center"
				paddingRight={4}
				fontWeight="bold"
			>
				{dayjs().format("D MMMM YYYY")}
			</Flex>
			<Row gutter={18} style={{ padding: "16px" }}>
				<Col md={4} sm={12} xs={24}>
					<PieCard title="Conversion" data={conversion_items} />
				</Col>
				<Col md={4} sm={12} xs={24}>
					<PieCard
						title="Users"
						data={user_category}
						lineWidth={20}
					/>
				</Col>
				<Col md={16} sm={24} xs={24}>
					<AreaCard
						title="Revenue"
						data={revenue || []}
						total={total_revenue}
						xField="Day"
						yField="Revenue"
						percentage={percentage}
					/>
				</Col>
			</Row>
			<Row gutter={18} style={{ padding: "16px" }}>
				<Col md={6} xs={24}>
					<CalendarCard dispatch={rdDispatch} />
				</Col>
				<Col md={18} xs={24}>
					<TableCard title="Orders" data={orders || []} />
				</Col>
			</Row>
		</>
	);
};

export default View;
