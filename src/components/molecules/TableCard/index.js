import { Card, Table, Tag } from "antd";
import { string } from "prop-types";

const TableCard = ({ title, data = [] }) => {
	const columns = [
		{
			title: "Order Number",
			dataIndex: "order_id",
			key: "order_id",
			render: (_, record) => {
				return <div>{record.order_id.split("-")[0]}</div>;
			},
		},
		{
			title: "Status",
			dataIndex: "status",
			key: "status",
			render: (_, record) => {
				let color = "";
				if (record.status === "completed") {
					color = "#789764";
				} else if (record.status === "pending") {
					color = "#E69849";
				} else {
					color = "#D66D4B";
				}

				return (
					<Tag
						color={color}
						style={{
							textTransform: "capitalize",
							width: "95px",
							textAlign: "center",
						}}
					>
						{record.status}
					</Tag>
				);
			},
		},
		{
			title: "Operator",
			dataIndex: "full_name",
			key: "full_name",
		},
		{
			title: "Location",
			dataIndex: "location",
			key: "location",
		},
		{
			title: "Start Date",
			dataIndex: "start_date",
			key: "start_date",
			render: (_, record) => {
				const splitSpace = record.start_date.split(" ");

				const splitDate = splitSpace[0].split("-");
				const splitTime = splitSpace[1].split(":");

				const date = `${splitDate[2]}/${
					splitDate[1]
				}/${splitDate[0].slice(2, 4)}`;
				const time = `${splitTime[0]}:${splitTime[1]}`;

				return (
					<div>
						{date} {time}
					</div>
				);
			},
		},
		{
			title: "Due Date",
			dataIndex: "due_date",
			key: "due_date",
			render: (_, record) => {
				const splitSpace = record.due_date.split(" ");

				const splitDate = splitSpace[0].split("-");
				const splitTime = splitSpace[1].split(":");

				const date = `${splitDate[2]}/${
					splitDate[1]
				}/${splitDate[0].slice(2, 4)}`;
				const time = `${splitTime[0]}:${splitTime[1]}`;

				return (
					<div>
						{date} {time}
					</div>
				);
			},
		},
	];

	const dataMapping = data.map((item, idx) => ({
		key: idx,
		order_id: item.order_id,
		status: item.status,
		location: item.location,
		full_name: item.full_name,
		start_date: item.start_date,
		due_date: item.due_date,
	})) || [];

	return (
		<Card
			title={<div style={{ fontWeight: "bolder" }}>{title}</div>}
			bordered={false}
		>
			<Table
				columns={columns}
				dataSource={dataMapping}
				size="small"
				pageSize={5}
			/>
		</Card>
	);
};

TableCard.propTypes = {
	title: string,
};

TableCard.defaultProps = {
	title: "",
};

export default TableCard;
