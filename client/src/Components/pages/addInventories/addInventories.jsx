import React from "react";
import "./addInventories.css";
import {
	Store,
	Person,
	BusinessCenter,
	CropOriginal,
	DoubleArrow,
	Filter,
	Filter9Plus,
	People,
	Note,
} from "@material-ui/icons";

export default function AddInventories() {
	return (
		<>
			<div className="main container border border-primary bg-light">
				<div className="card-header bg-warning text-white text-center mx-2 my-2 border border-primary">
					<Store /> Add New Inventories
				</div>
				<form>
					<div className="container border border-danger mx-2 my-2">
						<div class="form-group my-2">
							<label>
								<Person />
								Name
							</label>
							<input
								type="text"
								class="form-control"
								placeholder="Inventory Name"
							></input>
						</div>
						<div class="form-group my-2">
							<label>
								<BusinessCenter />
								Brand
							</label>
							<input
								type="text"
								class="form-control"
								placeholder="Brand Name"
							></input>
						</div>
						<div class="form-group my-2">
							<label>
								<CropOriginal />
								Model
							</label>
							<input
								type="text"
								class="form-control"
								placeholder="Model Name"
							></input>
						</div>
						<div class="input-group my-2">
							<div class="input-group-prepend">
								<label class="input-group-text" for="inputGroupSelect01">
									<DoubleArrow />
									Type
								</label>
							</div>
							<select class="custom-select" id="inputGroupSelect01">
								<option selected>Choose...</option>
								<option value="1">Devices</option>
								<option value="2">Furniture</option>
							</select>
						</div>
						<div class="form-group my-2">
							<label>
								<Filter />
								Category
							</label>
							<input
								type="text"
								class="form-control"
								placeholder="Category"
							></input>
						</div>
						<div class="form-group my-2">
							<label>
								<Filter9Plus />
								Serial Number
							</label>
							<input
								type="text"
								class="form-control"
								placeholder="Serial Number"
							></input>
						</div>
						<div class="input-group my-2">
							<div class="input-group-prepend">
								<label class="input-group-text" for="inputGroupSelect01">
									<People />
									Allocate To:
								</label>
							</div>
							<select class="custom-select" id="inputGroupSelect01">
								<option selected>Choose...</option>
								<option value="1">Name 1</option>
								<option value="2">Name 2</option>
							</select>
						</div>
						<div class="form-group my-3">
							<label>
								<Note />
								Description
							</label>
							<textarea class="form-control" rows="3"></textarea>
							<button type="submit" class="btn btn-outline-success mt-3">
								Add
							</button>
						</div>
					</div>
				</form>
			</div>
		</>
	);
}
