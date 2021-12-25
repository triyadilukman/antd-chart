import { css } from "@emotion/react";
import logoPng from "./assets/logo.png";

export const logo = css`
	background: url(${logoPng});
	width: 135px;
	height: 30px;
	background-size: 60%;
	background-repeat: no-repeat;
`;

export const user = css`
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

export const searchBar = css`
`