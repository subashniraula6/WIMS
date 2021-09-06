import React from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import "./footer.css";

const Footer = () => {
	return (
		<MDBFooter color="orange" className="font-small pt-3 mt-4 background text ">
			<MDBContainer fluid className="text-center text-md-left container-fluid">
				<MDBRow>
					<MDBCol md="6">
						<h5 className="title">About Us</h5>
						<h2>Wolfmatrix</h2>
						<p>Sanepa, Lalitpur, Nepal</p>
						<p>Inventory Management @ Wolfmatrix</p>
					</MDBCol>
					<MDBCol md="6">
						<h5 className="title">Follow Us on:</h5>
						<ul>
							<li className="list-unstyled">
								<a href="#!">Facebook</a>
							</li>
							<li className="list-unstyled">
								<a href="#!">Instagram</a>
							</li>
							<li className="list-unstyled">
								<a href="#!">Twitter</a>
							</li>
							<li className="list-unstyled">
								<a href="#!">LinkedIn</a>
							</li>
						</ul>
					</MDBCol>
				</MDBRow>
			</MDBContainer>
			<div className="footer-copyright text-center py-3 bg-dark text">
				<MDBContainer fluid>
					&copy; {new Date().getFullYear()} Copyright:{" "}
					<a href=" https://www.wolfmatrix.com/" className="link">
						{" "}
						Wolfmatrix{" "}
					</a>
				</MDBContainer>
			</div>
		</MDBFooter>
	);
};

export default Footer;
