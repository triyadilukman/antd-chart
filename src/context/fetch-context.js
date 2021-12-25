import React from "react";
import dayjs from "dayjs";
import groupBy from "lodash/groupBy";
import sumBy from "lodash/sumBy";

const RDDataContext = React.createContext();

function RDDataReducer(state, { type, payload }) {
	switch (type) {
		case "set_user_category": {
			return { ...state, user_category: payload.user_category };
		}
		case "set_conversion_items": {
			return { ...state, conversion_items: payload.conversion_items };
		}
		case "set_orders": {
			return { ...state, orders: payload.orders };
		}
		case "set_orders_default": {
			return { ...state, orders_default: payload.orders_default };
		}
		case "set_revenue": {
			return { ...state, revenue: payload.revenue };
		}
		case "set_total_revenue": {
			return { ...state, total_revenue: payload.total_revenue };
		}
		case "set_percentage": {
			return { ...state, percentage: payload.percentage };
		}
		case "filter_orders": {
			return { ...state, total_revenue: payload.total_revenue };
		}
		default: {
			throw new Error(`Unhandled action type: ${type}`);
		}
	}
}

function RDDataProvider({ children }) {
	const [state, dispatch] = React.useReducer(RDDataReducer, {
		user_category: null,
		conversion_items: null,
		orders: null,
		revenue: null,
		total_revenue: 0,
		percentage: 0,
	});

	const normalizeData = (input) => {
		return input
			.filter((f) => f.status === "completed")
			.map((item) => ({
				...item,
				conversion_revenue: parseInt(item.conversion_revenue, 10),
			}));
	};

	const getConversionList = (input) => {
		// Get Conversion
		const conversionItemsGrouped = groupBy(input, "conversion_item");
		return Object.entries(conversionItemsGrouped).map(([k, v]) => ({
			type: k,
			value: sumBy(v, "conversion_revenue"),
		}));
	};

	const getRevenueList = (input) => {
		// transform start_date get date only
		const listReformStartDate = input.map((item) => ({
			...item,
			start_date: item.start_date.split(" ")[0],
		}));

		// grouping by start_date
		const startDateGrouped = groupBy(listReformStartDate, "start_date");

		// Transform Revenue Data
		const finalRevenue = Object.entries(startDateGrouped).map(([k, v]) => ({
			Day: `${dayjs(k).format("ddd")}, ${dayjs(k).format("D MMM")}`,
			Revenue: sumBy(v, "conversion_revenue"),
		}));

		// Calculate Percentage
		const lastRevenue = finalRevenue[finalRevenue.length - 1].Revenue;
		const firstRevenue = finalRevenue[0].Revenue;
		const percentageFinal =
			((lastRevenue - firstRevenue) / lastRevenue) * 100;

		return {
			revenueList: finalRevenue,
			total_revenue: sumBy(finalRevenue, "Revenue"),
			total_percentage: percentageFinal,
		};
	};

	const dispatchBatch = ({
		conversions,
		orders,
		revenue,
		total_revenue,
		percentage,
	}) => {
		dispatch({
			type: "set_conversion_items",
			payload: {
				conversion_items: conversions,
			},
		});

		dispatch({
			type: "set_orders",
			payload: {
				orders,
			},
		});

		dispatch({
			type: "set_revenue",
			payload: {
				revenue,
			},
		});

		dispatch({
			type: "set_total_revenue",
			payload: {
				total_revenue,
			},
		});

		dispatch({
			type: "set_percentage",
			payload: {
				percentage,
			},
		});
	};

	React.useEffect(() => {
		const fetchingData = async () => {
			await fetch(
				"https://ae1cdb19-2532-46fa-9b8f-cce01702bb1e.mock.pstmn.io/takehometest/web/dashboard"
			)
				.then((response) => {
					return response.json();
				})
				.then((responseData) => {
					const ordersData = responseData.data.orders;
					const normalizedData = normalizeData(ordersData);

					// Generate Conversion
					const finalConversions = getConversionList(normalizedData);

					// Generate Revenue Things
					const { revenueList, total_revenue, total_percentage } =
						getRevenueList(normalizedData);

					dispatch({
						type: "set_user_category",
						payload: {
							user_category: Object.entries(
								responseData.data.user_category
							).map(([k, v]) => ({
								type: k,
								value: v,
							})),
						},
					});

					dispatch({
						type: "set_orders_default",
						payload: {
							orders_default: ordersData,
						},
					});

					dispatchBatch({
						conversions: finalConversions,
						orders: ordersData,
						revenue: revenueList,
						total_revenue,
						percentage: total_percentage,
					});
				})
				.catch((e) => {
					console.log("error", e);
				});
		};

		fetchingData();
	}, []);

	const filterByDateData = (startTime, endTime) => {
		const filteredOrders = state.orders.filter((f) => {
			const time = new Date(dayjs(f.start_date).format()).getTime();
			return time >= startTime && time <= endTime;
		});

		// normalized data
		const normalizedData = normalizeData(filteredOrders);

		// Generate Conversion
		const finalConversions = getConversionList(normalizedData);

		// Generate Revenue Things
		const { revenueList, total_revenue, total_percentage } =
			getRevenueList(normalizedData);

		dispatchBatch({
			conversions: finalConversions,
			orders: filteredOrders,
			revenue: revenueList,
			total_revenue,
			percentage: total_percentage,
		});
	};

	const resetFilterDate = () => {
		// normalized data
		const normalizedData = normalizeData(state.orders_default);

		// Generate Conversion
		const finalConversions = getConversionList(normalizedData);

		// Generate Revenue Things
		const { revenueList, total_revenue, total_percentage } =
			getRevenueList(normalizedData);

		dispatchBatch({
			conversions: finalConversions,
			orders: state.orders_default,
			revenue: revenueList,
			total_revenue,
			percentage: total_percentage,
		});
	};

	const value = { state, dispatch, filterByDateData, resetFilterDate };

	return (
		<RDDataContext.Provider value={value}>
			{children}
		</RDDataContext.Provider>
	);
}

function useRDData() {
	const context = React.useContext(RDDataContext);
	if (context === undefined) {
		throw new Error("useRDData must be used within a RDDataProvider");
	}
	return context;
}

export { RDDataProvider, useRDData };
