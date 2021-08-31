import React from "react";
import { inventories } from "../../dummy";
import Inventory from "../Inventory/Inventory";

const Dashboard = () => {
	return (
		<>
			<h2>Your inventories</h2>
			{inventories.map((inventory) => (
				<Inventory key={inventory.name} details={{ ...inventory }} />
			))}
		</>
	);
};

export default Dashboard;
