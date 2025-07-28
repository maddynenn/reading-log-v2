import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { getAllBookEntries } from "./api";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "../pages/Home";
import { Landing } from "../pages/Landing";
import { LogBook } from "../pages/LogBook";
import { MyBooks } from "../pages/MyBooks";
import { Profile } from "../pages/Profile";
import { FullLog } from "../pages/FullLog";
import { Layout } from "./components/Layout";
import axios from "axios";

function App() {
	useEffect(() => {
		let token = sessionStorage.getItem("User");
		if (token) {
			axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
		}
	}, []);

	return (
		<Router>
			<Routes>
				<Route path="/" element={<Landing />} />
				<Route element={<Layout></Layout>}>
					<Route path="/home" element={<Home />} />
					<Route path="/logbook" element={<LogBook />} />
					<Route path="/log/:id" element={<FullLog />} />
					<Route path="/profile" element={<Profile />} />
					<Route path="/mybooks" element={<MyBooks />} />
				</Route>
			</Routes>
		</Router>
	);
}

export default App;
