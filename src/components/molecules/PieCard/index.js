import { Card } from "antd";
import { string } from "prop-types";
import { MoreOutlined } from "@ant-design/icons";
import { Box } from "@chakra-ui/react";

import PieChart from "../../atoms/PieChart";

import { cardMore, cardTitle, cardWP } from "./styles";

const PieCard = ({ title, data, lineWidth }) => {
	return (
		<Box css={cardWP}>
			<Card title={<Box css={cardTitle}>{title}</Box>} loading={!data}>
				<Box css={cardMore}>
					<MoreOutlined />
				</Box>
				<PieChart height={256} data={data} lineWidth={lineWidth} />
			</Card>
		</Box>
	);
};

PieCard.propTypes = {
	title: string,
};

export default PieCard;
