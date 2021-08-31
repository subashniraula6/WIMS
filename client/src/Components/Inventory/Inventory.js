import React from "react";

const Inventory = ({ details }) => {
	console.log(details);
	return (
		<>
			<div className="card">
				<div className="card-body">
					<img src={details.img_url} />
				</div>
			</div>
		</>
	);
};

export default Inventory;
