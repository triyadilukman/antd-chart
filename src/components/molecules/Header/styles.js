import { css } from "@emotion/react";
import logoPng from "./assets/logo.png";

export const logo = css`
	background: url(${logoPng});
	width: 135px;
	height: 30px;
	background-size: 80%;
	background-repeat: no-repeat;
	@media (max-width: 768px) {
		background-size: 50%;
	}
`;

export const user = css`
	cursor: pointer;
	@media (max-width: 768px) {
		display: none;
	}
`

export const userMobile = css`
	display: none;

	@media (max-width: 768px) {
		display: block;
		margin-left: 16px;
	}
`

export const icon = css`
	font-size: 22px;
	cursor: pointer;
`