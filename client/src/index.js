import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap"
import store from './Components/Redux/store'
import {Provider} from 'react-redux'

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
		<App />
		</BrowserRouter>
	</Provider>,
	document.getElementById("root")
);
