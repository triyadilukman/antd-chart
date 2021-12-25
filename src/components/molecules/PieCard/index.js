import { Card } from "antd";
import { string } from "prop-types";
import PieChart from "../../atoms/PieChart";

const PieCard = ({ title, data, lineWidth }) => {
	return (
		<Card
			title={<div style={{ fontWeight: "bolder" }}>{title}</div>}
			loading={!data}
		>
			<PieChart height={256} data={data} lineWidth={lineWidth} />
		</Card>
	);
};

PieCard.propTypes = {
	title: string,
};

export default PieCard;
