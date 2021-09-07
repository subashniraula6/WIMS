import React from "react";
import "./userProfile.css";
import {
	Email,
	Phone,
	Person,
	Work,
	Language,
	Assignment,
} from "@material-ui/icons";

export default function UserProfile() {
	return (
		<>
			<div className="page-content page-container" id="page-content">
				<div className="padding">
					<div className="row container d-flex justify-content-center">
						<div className="col-xl-8 col-md-16">
							<div className="card user-card-full">
								<div className="row m-l-0 m-r-0">
									<div className="col-sm-4 bg-c-lite-green user-profile">
										<div className="card-block text-center text-white">
											<div className="m-b-25">
												<img
													src="https://media.istockphoto.com/vectors/default-avatar-profile-icon-grey-photo-placeholder-vector-id1018999828?k=20&m=1018999828&s=170667a&w=0&h=tvLHB23bV5fQZBBgeDQX0LHKzTZIGfj5IOtYf3jVWzE="
													className="img-radius"
													alt="PP"
												/>
											</div>
											<h6 className="f-w-800">
												<Person />
												Subin Maharjan
											</h6>
											<p>
												<Work />
												Web Development Intern
											</p>{" "}
											<i className=" mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16"></i>
										</div>
									</div>
									<div className="col-sm-8">
										<div className="card-block">
											<h6 className="m-b-20 p-b-5 b-b-default f-w-600">
												Details
											</h6>
											<div className="row">
												<div className="col-sm-8">
													<p className="m-b-10 f-w-600">
														<Email />
														Email
													</p>
													<h6 className="text-muted f-w-400">
														subinmaharjan01@gmail.com
													</h6>
												</div>
												<div className="col-sm-6">
													<p className="m-b-10 f-w-600">
														<Phone />
														Phone
													</p>
													<h6 className="text-muted f-w-400">9808834258</h6>
												</div>
											</div>
											<h6 className="m-b-20 m-t-40 p-b-5 b-b-default f-w-600">
												Projects
											</h6>
											<div className="row">
												<div className="col-sm-8">
													<p className="m-b-10 f-w-600">
														<Assignment />
														Recent
													</p>
													<h6 className="text-muted f-w-400">
														Inventory Management System
													</h6>
												</div>
												<div className="col-sm-6">
													<p className="m-b-10 f-w-600">
														<Language />
														Languages
													</p>
													<h6 className="text-muted f-w-400">PHP/Javascript</h6>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
