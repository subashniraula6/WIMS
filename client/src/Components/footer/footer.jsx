import React from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import "./footer.css";

const Footer = () => {
	return (
		<div className="footer-copyright text-center py-3 bg-dark text fixed-bottom text-muted">
				<MDBContainer fluid>
					&copy; {new Date().getFullYear()} Copyright:{" "}
					<a href=" https://www.wolfmatrix.com/" className="link">
						{" "}
						Wolfmatrix{" "}
					</a>
				</MDBContainer>
			</div>
	);
};

export default Footer;
