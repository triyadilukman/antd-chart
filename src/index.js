import React from "react";
import ReactDOM from "react-dom";
import { ChakraProvider } from "@chakra-ui/react";
import App from "./App";

import { RDDataProvider } from "./context/fetch-context";

ReactDOM.render(
	<React.StrictMode>
		<RDDataProvider>
			<ChakraProvider>
				<App />
			</ChakraProvider>
		</RDDataProvider>
	</React.StrictMode>,
	document.getElementById("root")
);