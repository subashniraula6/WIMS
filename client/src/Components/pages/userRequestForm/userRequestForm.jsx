import React from "react";
import "./userRequestForm";
import { Person, Email, Note, Create } from "@material-ui/icons";

export default function UserRequestForm() {
	return (
		<>
			<div className="main container border border-primary bg-light">
				<div className="card-header bg-warning text-white text-center mx-2 my-2 border border-primary">
					<Create />
					Request Form
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
								placeholder="Full Name"
							></input>
						</div>
						<div class="form-group my-2">
							<label>
								<Email />
								Email address
							</label>
							<input
								type="email"
								class="form-control"
								placeholder="name@example.com"
							></input>
						</div>
						<div class="form-group my-3">
							<label>
								<Note />
								Request Description
							</label>
							<textarea class="form-control" rows="3"></textarea>
							<button type="submit" class="btn btn-outline-success mt-3">
								Submit
							</button>
						</div>
					</div>
				</form>
			</div>
		</>
	);
}
