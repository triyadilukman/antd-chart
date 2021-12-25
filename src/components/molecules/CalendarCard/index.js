import { useState } from "react";
import { DateRange } from "react-date-range";
import dayjs from "dayjs";

import { Card } from "antd";
import { Stack, Button } from "@chakra-ui/react";

import { useRDData } from "../../../context/fetch-context";

const CalendarCard = () => {
	const { filterByDateData, resetFilterDate } = useRDData();
	const defaultObj = {
		startDate: new Date(),
		endDate: null,
		key: "selection",
	}

	const [state, setState] = useState([defaultObj]);

	const handleChange = (item) => {
		setState([item.selection]);
	};

	const handleFilter = () => {
		if (state[0].endDate) {
			const startTime = new Date(dayjs(state[0].startDate).format()).getTime();
			const endTime = new Date (dayjs(state[0].endDate).format()).getTime();
			filterByDateData(startTime, endTime)
		}
	}

	const handleCancel = ()  => {
		setState([defaultObj]);
		resetFilterDate();
	}

	return (
		<Card>
			<DateRange
				// editableDateInputs={true}
				onChange={handleChange}
				moveRangeOnFirstSelection={false}
				ranges={state}
				showDateDisplay={false}
				rangeColors={["#E0DBEB"]}
				color="#3d91ff"
			/>
			<Stack
				direction="row"
				spacing={4}
				align="center"
				justifyContent="center"
			>
				<Button
					colorScheme="teal"
					variant="outline"
					size="sm"
					color="#333333"
					borderColor="#333333"
					width="96px"
					onClick={handleCancel}
				>
					Cancel
				</Button>
				<Button
					colorScheme="teal"
					variant="solid"
					size="sm"
					bgColor="#82C341"
					width="96px"
					onClick={handleFilter}
				>
					Filter
				</Button>
			</Stack>
		</Card>
	);
};

export default CalendarCard;
