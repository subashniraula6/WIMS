import React from "react";
import "./addUser.css";
import {
	PersonAdd,
	Person,
	Email,
	VisibilityOff,
	Work,
	EmojiPeople,
	Event,
} from "@material-ui/icons";

export default function AddUser() {
	return (
		<>
			<div className="main container bg-light border border-light">
				<div className="card-header bg-warning text-white text-center mx-2 my-2">
					<PersonAdd /> Add New User
				</div>
				<form>
					<div className="container mx-2 my-2">
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
						<div className="form-group mt-2">
							<label>
								<VisibilityOff />
								Password
							</label>
							<input
								type="password"
								className="form-control"
								placeholder="Enter password"
							/>
						</div>

						<div class="input-group my-2">
							<div class="input-group-prepend">
								<label class="input-group-text" for="inputGroupSelect01">
									<Work /> Designation
								</label>
							</div>
							<select class="custom-select" id="inputGroupSelect01">
								<option selected>Choose...</option>
								<option value="1">CEO</option>
								<option value="2">CTO</option>
								<option value="3">HR</option>
								<option value="4">Engineer</option>
								<option value="5">Intern</option>
							</select>
						</div>

						<div class="input-group mt-2">
							<div class="input-group-prepend">
								<label class="input-group-text" for="inputGroupSelect01">
									<EmojiPeople /> Role
								</label>
							</div>
							<select class="custom-select" id="inputGroupSelect01">
								<option selected>Choose...</option>
								<option value="1">Admin</option>
								<option value="2">User</option>
							</select>
						</div>
						<div class="form-group my-2">
							<label>
								<Event />
								Joined At
							</label>
							<input
								type="date"
								class="form-control"
								placeholder="Date"
							></input>
						</div>

						<div class="form-group my-2">
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
